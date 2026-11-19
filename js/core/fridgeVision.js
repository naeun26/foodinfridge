(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  function getCatalogNames() {
    return (FridgeMeal.INGREDIENTS || []).map(function (item) {
      return item.name;
    });
  }

  function buildVisionPrompt() {
    var names = getCatalogNames();
    return [
      '당신은 한국 자취생의 냉장고/식재료 사진을 보고 식재료를 정확하게 판별하는 도우미입니다.',
      '사진에서 실제로 보이는 식재료만 판별하고, 보이지 않는 재료는 절대 추측하지 마세요.',
      '',
      '아래 [허용 재료 목록] 중 사진에서 확인되는 재료는 정확히 목록에 적힌 이름 그대로 matchedIngredients 배열에 넣으세요:',
      JSON.stringify(names),
      '',
      '참고 매핑 규칙:',
      '- 달걀/계란판/삶은계란 -> "계란"',
      '- 캔햄/스팸/리챔/슬라이스햄/소시지 -> "스팸/햄"',
      '- 슬라이스치즈/모짜렐라/체다치즈 -> "치즈"',
      '- 팽이버섯/새송이/표고/느타리 등 모든 버섯 -> "버섯"',
      '- 배추김치/썰은김치/김치통 속 김치 -> "김치"',
      '- 즉석밥(햇반)/남은 밥/밥공기 -> "찬밥"',
      '- 라면/라면사리/봉지라면 면 -> "라면사리"',
      '',
      '목록 외에 추가로 명확히 보이는 식재료가 있다면 한국어 짧은 이름으로 otherIngredients 배열(최대 6개)에 넣으세요.',
      'summary에는 한 문장(한국어)으로 사진 분석 결과를 요약하세요.',
      '반드시 아래 JSON 형식으로만 응답하세요:',
      '{"matchedIngredients":["계란"],"otherIngredients":["우유"],"summary":"계란과 우유가 보입니다."}'
    ].join('\n');
  }

  // 모바일 고해상도 사진을 1024px JPEG로 압축해 빠른 업로드와 Vercel 용량 제한 대응
  function compressImageFile(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !file.type || file.type.indexOf('image/') !== 0) {
        reject(new Error('이미지 파일만 분석할 수 있어요.'));
        return;
      }

      var reader = new FileReader();
      reader.onerror = function () {
        reject(new Error('사진 파일을 읽지 못했습니다.'));
      };
      reader.onload = function (e) {
        var dataUrl = e.target.result;
        var img = new Image();
        img.onerror = function () {
          reject(new Error('이미지를 불러올 수 없습니다. JPG나 PNG 사진으로 시도해 주세요.'));
        };
        img.onload = function () {
          var maxDim = 1024;
          var w = img.width;
          var h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w >= h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          var compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78);
          var base64 = compressedDataUrl.split(',')[1] || '';
          resolve({
            previewUrl: compressedDataUrl,
            imageBase64: base64,
            mimeType: 'image/jpeg'
          });
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  function sanitizeResult(parsed, source) {
    var allowedSet = new Set(getCatalogNames());
    var matched = Array.isArray(parsed && parsed.matchedIngredients)
      ? Array.from(
          new Set(
            parsed.matchedIngredients.filter(function (n) {
              return typeof n === 'string' && allowedSet.has(n);
            })
          )
        )
      : [];

    var others = Array.isArray(parsed && parsed.otherIngredients)
      ? Array.from(
          new Set(
            parsed.otherIngredients
              .filter(function (n) {
                return typeof n === 'string' && n.trim() && !allowedSet.has(n.trim());
              })
              .map(function (n) {
                return n.trim();
              })
          )
        ).slice(0, 6)
      : [];

    var summary =
      parsed && typeof parsed.summary === 'string' && parsed.summary.trim()
        ? parsed.summary.trim()
        : matched.length > 0
          ? matched.join(', ') + ' 재료가 확인되었어요.'
          : '사진에서 20종 기본 식재료를 찾지 못했어요.';

    return {
      matchedIngredients: matched,
      otherIngredients: others,
      summary: summary,
      source: source
    };
  }

  function callServerApi(payload) {
    return fetch('/api/analyze-fridge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: payload.imageBase64,
        mimeType: payload.mimeType
      })
    }).then(function (res) {
      return res
        .json()
        .catch(function () {
          return {};
        })
        .then(function (data) {
          if (res.ok) {
            return sanitizeResult(data, 'server');
          }
          var err = new Error(data.error || '서버 분석에 실패했습니다.');
          err.code = data.code || (res.status === 404 ? 'NO_SERVER_ROUTE' : 'SERVER_ERROR');
          err.status = res.status;
          throw err;
        });
    });
  }

  function callDirectGeminiApi(payload, apiKey) {
    var endpoint =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' +
      encodeURIComponent(apiKey);

    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: buildVisionPrompt() },
              {
                inlineData: {
                  mimeType: payload.mimeType,
                  data: payload.imageBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      })
    }).then(function (res) {
      return res
        .json()
        .catch(function () {
          return {};
        })
        .then(function (data) {
          if (!res.ok) {
            var msg =
              (data && data.error && data.error.message) ||
              'Gemini API 키가 유효하지 않거나 호출 한도를 초과했습니다.';
            var err = new Error(msg);
            err.code = 'GEMINI_CLIENT_ERROR';
            throw err;
          }
          var rawText =
            data &&
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts[0] &&
            data.candidates[0].content.parts[0].text;
          if (!rawText) {
            throw new Error('AI 응답을 해석할 수 없었습니다.');
          }
          var cleaned = String(rawText)
            .trim()
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/```$/i, '')
            .trim();
          return sanitizeResult(JSON.parse(cleaned), 'browser');
        });
    });
  }

  // 듀얼 모드: HTTP/HTTPS(Vercel)에서는 /api/analyze-fridge 우선, 로컬(file://)이나 서버 키 미설정 시 로컬 Gemini 키로 폴백
  function analyzeFridgePhoto(file) {
    return compressImageFile(file).then(function (compressed) {
      var localKey = FridgeMeal.storage.readGeminiApiKey();
      var isHttp = global.location && /^https?:$/i.test(global.location.protocol);

      if (!isHttp) {
        if (!localKey) {
          var keyErr = new Error(
            '로컬 파일(file://)에서는 아래 "API 키 설정"에 Gemini API 키를 입력하면 바로 사진 분석을 사용할 수 있어요.'
          );
          keyErr.code = 'NEED_API_KEY';
          keyErr.previewUrl = compressed.previewUrl;
          throw keyErr;
        }
        return callDirectGeminiApi(compressed, localKey).then(function (result) {
          result.previewUrl = compressed.previewUrl;
          return result;
        });
      }

      return callServerApi(compressed)
        .then(function (result) {
          result.previewUrl = compressed.previewUrl;
          return result;
        })
        .catch(function (err) {
          var canFallback =
            err &&
            (err.code === 'MISSING_SERVER_KEY' ||
              err.code === 'NO_SERVER_ROUTE' ||
              err.status === 404 ||
              err.status === 503);

          if (canFallback && localKey) {
            return callDirectGeminiApi(compressed, localKey).then(function (result) {
              result.previewUrl = compressed.previewUrl;
              return result;
            });
          }

          if (canFallback && !localKey) {
            var needKeyErr = new Error(
              'Vercel 환경변수(GEMINI_API_KEY)가 아직 설정되지 않았습니다. Vercel 설정에 키를 추가하거나 아래 "API 키 설정"에 개인 Gemini 키를 입력해 바로 사용해 보세요.'
            );
            needKeyErr.code = 'NEED_API_KEY';
            needKeyErr.previewUrl = compressed.previewUrl;
            throw needKeyErr;
          }

          err.previewUrl = compressed.previewUrl;
          throw err;
        });
    });
  }

  FridgeMeal.fridgeVision = {
    compressImageFile: compressImageFile,
    analyzeFridgePhoto: analyzeFridgePhoto
  };
})(window);
