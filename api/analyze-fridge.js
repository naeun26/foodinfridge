// Vercel Serverless Function — POST /api/analyze-fridge
// Zero external dependencies (uses Node 18+ built-in fetch + Vercel env GEMINI_API_KEY)

const ALLOWED_INGREDIENTS = [
  '양배추',
  '대파',
  '양파',
  '감자',
  '애호박',
  '콩나물',
  '버섯',
  '김치',
  '계란',
  '두부',
  '참치캔',
  '스팸/햄',
  '베이컨',
  '닭가슴살',
  '어묵',
  '찬밥',
  '식빵',
  '라면사리',
  '떡국떡',
  '치즈'
];

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BASE64_LENGTH = 5 * 1024 * 1024; // ~3.7MB raw image cap

function buildPrompt() {
  return [
    '당신은 한국 자취생의 냉장고/식재료 사진을 보고 식재료를 정확하게 판별하는 도우미입니다.',
    '사진에서 실제로 보이는 식재료만 판별하고, 보이지 않는 재료는 절대 추측하지 마세요.',
    '',
    '아래 [허용 재료 목록] 중 사진에서 확인되는 재료는 정확히 목록에 적힌 이름 그대로 matchedIngredients 배열에 넣으세요:',
    JSON.stringify(ALLOWED_INGREDIENTS),
    '',
    '참고 매핑 규칙:',
    '- 달걀/계란판/삶은계란 -> "계란"',
    '- 캔햄/스팸/리챔/슬라이스햄/비엔나소시지 -> "스팸/햄"',
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

function extractJson(text) {
  const cleaned = String(text || '')
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  return JSON.parse(cleaned);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST 요청만 지원합니다.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      code: 'MISSING_SERVER_KEY',
      error: '서버에 GEMINI_API_KEY 환경변수가 설정되지 않았습니다.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (err) {
      return res.status(400).json({ error: '잘못된 JSON 요청 형식입니다.' });
    }
  }

  const imageBase64 = body && typeof body.imageBase64 === 'string' ? body.imageBase64 : '';
  const mimeType = body && typeof body.mimeType === 'string' ? body.mimeType : 'image/jpeg';

  if (!imageBase64) {
    return res.status(400).json({ error: '분석할 이미지 데이터가 비어 있습니다.' });
  }
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return res.status(400).json({ error: '지원하지 않는 이미지 형식입니다. (JPG, PNG, WEBP 지원)' });
  }
  if (imageBase64.length > MAX_BASE64_LENGTH) {
    return res.status(413).json({ error: '이미지 용량이 너무 큽니다. 더 작은 사진으로 다시 시도해 주세요.' });
  }

  const endpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' +
    encodeURIComponent(apiKey);

  try {
    const geminiRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: buildPrompt() },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: imageBase64
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
    });

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      return res.status(502).json({
        error: 'Gemini AI 분석 요청에 실패했습니다.',
        detail: errBody.slice(0, 240)
      });
    }

    const data = await geminiRes.json();
    const rawText =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;

    if (!rawText) {
      return res.status(502).json({ error: 'AI 응답에서 분석 결과를 읽지 못했습니다.' });
    }

    const parsed = extractJson(rawText);
    const allowedSet = new Set(ALLOWED_INGREDIENTS);

    const matchedIngredients = Array.isArray(parsed.matchedIngredients)
      ? Array.from(
          new Set(
            parsed.matchedIngredients.filter(function (name) {
              return typeof name === 'string' && allowedSet.has(name);
            })
          )
        )
      : [];

    const otherIngredients = Array.isArray(parsed.otherIngredients)
      ? Array.from(
          new Set(
            parsed.otherIngredients
              .filter(function (name) {
                return typeof name === 'string' && name.trim().length > 0 && !allowedSet.has(name.trim());
              })
              .map(function (name) {
                return name.trim();
              })
          )
        ).slice(0, 6)
      : [];

    const summary =
      typeof parsed.summary === 'string' && parsed.summary.trim()
        ? parsed.summary.trim()
        : matchedIngredients.length > 0
          ? matchedIngredients.join(', ') + ' 재료가 인식되었습니다.'
          : '기본 목록에 해당하는 식재료를 찾지 못했습니다.';

    return res.status(200).json({
      matchedIngredients: matchedIngredients,
      otherIngredients: otherIngredients,
      summary: summary,
      source: 'server'
    });
  } catch (err) {
    return res.status(500).json({
      error: '이미지 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    });
  }
};
