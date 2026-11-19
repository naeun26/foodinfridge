(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  // 총 24종 초간단 자취 레시피 (PRD 기본 8종 + 확충 16종)
  // 기본 양념 4종(소금·설탕·간장·식용유) 전제, 우동사리 제외 / 라면사리 포함
  FridgeMeal.RECIPES = [
    {
      id: 'rcp_001',
      title: '양배추 계란 덮밥',
      cookTime: 15,
      mainIngredients: ['계란', '양배추', '대파', '찬밥'],
      basicSeasonings: ['간장 2T', '설탕 1T', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '양배추 한 줌은 채 썰고 대파는 송송 썰어주세요. 계란 2개는 미리 풀어둡니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1T를 두르고 중불에서 대파와 양배추가 숨이 죽을 때까지 볶아주세요.',
          timerSec: 180
        },
        {
          stepNo: 3,
          instruction: '간장 2T, 설탕 1T, 물 3T를 넣고 끓으면 푼 계란을 둘러 뚜껑을 덮고 익힌 뒤 밥 위에 올립니다.',
          timerSec: 150
        }
      ]
    },
    {
      id: 'rcp_002',
      title: '간장 기름 라면사리 볶음면',
      cookTime: 10,
      mainIngredients: ['라면사리', '대파', '계란'],
      basicSeasonings: ['간장 2T', '설탕 1T', '식용유 2T'],
      steps: [
        {
          stepNo: 1,
          instruction: '끓는 물에 라면사리를 넣고 꼬들꼬들하게 삶은 뒤 체에 밭쳐 물기를 뺍니다.',
          timerSec: 180
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 2T와 송송 썬 대파를 넣고 파기름을 낸 뒤 한쪽으로 밀어 계란을 스크램블합니다.',
          timerSec: 120
        },
        {
          stepNo: 3,
          instruction: '삶은 라면사리와 간장 2T, 설탕 1T를 넣고 센 불에서 빠르게 볶아 마무리합니다.',
          timerSec: 90
        }
      ]
    },
    {
      id: 'rcp_003',
      title: '김치 참치 라면사리 볶음',
      cookTime: 15,
      mainIngredients: ['라면사리', '김치', '참치캔', '대파'],
      basicSeasonings: ['설탕 0.5T', '간장 1T', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '라면사리를 끓는 물에 2분 30초간 먼저 삶아 건져둡니다.',
          timerSec: 150
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유를 두르고 잘게 썬 김치와 설탕 0.5T, 참치캔을 넣어 신맛이 날아가게 볶습니다.',
          timerSec: 180
        },
        {
          stepNo: 3,
          instruction: '삶은 라면사리와 간장 1T, 물 3T, 대파를 넣고 양념이 배어들 때까지 볶아줍니다.',
          timerSec: 120
        }
      ]
    },
    {
      id: 'rcp_004',
      title: '스팸 김치 볶음밥',
      cookTime: 15,
      mainIngredients: ['스팸/햄', '김치', '찬밥', '계란'],
      basicSeasonings: ['설탕 0.5T', '간장 1T', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '스팸과 김치는 잘게 깍둑썰기하고, 팬에 계란 프라이를 먼저 부쳐 접시에 덜어둡니다.',
          timerSec: 120
        },
        {
          stepNo: 2,
          instruction: '팬에 스팸과 김치, 설탕 0.5T를 넣고 노릇해질 때까지 중불에서 볶아주세요.',
          timerSec: 180
        },
        {
          stepNo: 3,
          instruction: '찬밥을 넣고 가장자리에 간장 1T를 둘러 불향을 낸 뒤 잘 섞어 볶아 계란을 올립니다.',
          timerSec: 150
        }
      ]
    },
    {
      id: 'rcp_005',
      title: '초간단 두부 간장 조림',
      cookTime: 15,
      mainIngredients: ['두부', '대파', '양파'],
      basicSeasonings: ['간장 3T', '설탕 1T', '식용유 2T'],
      steps: [
        {
          stepNo: 1,
          instruction: '두부는 1cm 두께로 썰어 키친타월로 물기를 닦고, 대파와 양파는 잘게 썹니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '식용유 2T를 두른 팬에 두부를 올리고 앞뒤로 노릇노릇하게 구워줍니다.',
          timerSec: 240
        },
        {
          stepNo: 3,
          instruction: '간장 3T, 설탕 1T, 물 4T, 썬 채소를 붓고 국물이 자작해질 때까지 졸입니다.',
          timerSec: 180
        }
      ]
    },
    {
      id: 'rcp_006',
      title: '어묵 떡국떡 간장 떡볶이',
      cookTime: 15,
      mainIngredients: ['떡국떡', '어묵', '대파', '양배추'],
      basicSeasonings: ['간장 2.5T', '설탕 1.5T', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '떡국떡은 물에 헹궈두고, 어묵과 양배추는 한입 크기로 썹니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 물 1컵, 간장 2.5T, 설탕 1.5T, 떡국떡을 넣고 떡이 말랑해질 때까지 끓입니다.',
          timerSec: 240
        },
        {
          stepNo: 3,
          instruction: '어묵, 양배추, 대파, 식용유 1T를 넣고 국물이 걸쭉해질 때까지 볶아줍니다.',
          timerSec: 180
        }
      ]
    },
    {
      id: 'rcp_007',
      title: '베이컨 양배추 토스트',
      cookTime: 10,
      mainIngredients: ['식빵', '베이컨', '계란', '양배추'],
      basicSeasonings: ['설탕 0.5T', '소금 한 꼬집', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '채 썬 양배추에 계란 1개와 소금 한 꼬집을 넣고 골고루 섞어줍니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유를 두르고 베이컨과 양배추 계란 반죽을 식빵 크기로 부치고, 옆에서 식빵도 굽습니다.',
          timerSec: 180
        },
        {
          stepNo: 3,
          instruction: '구운 식빵 위에 계란 패티와 베이컨을 올리고 설탕 0.5T를 솔솔 뿌려 덮어줍니다.',
          timerSec: 0
        }
      ]
    },
    {
      id: 'rcp_008',
      title: '버섯 대파 계란국',
      cookTime: 10,
      mainIngredients: ['계란', '버섯', '대파'],
      basicSeasonings: ['간장 1.5T', '소금 0.5t'],
      steps: [
        {
          stepNo: 1,
          instruction: '냄비에 물 400ml와 먹기 좋게 찢은 버섯, 간장 1.5T를 넣고 강불에서 끓입니다.',
          timerSec: 180
        },
        {
          stepNo: 2,
          instruction: '물이 팔팔 끓으면 소금으로 간을 맞추고 푼 계란 2개를 빙 둘러 붓습니다.',
          timerSec: 60
        },
        {
          stepNo: 3,
          instruction: '송송 썬 대파를 올리고 한소끔 더 끓여 불을 끕니다.',
          timerSec: 30
        }
      ]
    },
    {
      id: 'rcp_009',
      title: '파기름 간장 계란밥',
      cookTime: 5,
      mainIngredients: ['찬밥', '계란', '대파'],
      basicSeasonings: ['간장 1.5T', '설탕 0.5t', '식용유 1.5T'],
      steps: [
        {
          stepNo: 1,
          instruction: '대파 반 대를 잘게 썰고 찬밥은 전자레인지에 1분 30초 데워 그릇에 담습니다.',
          timerSec: 90
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1.5T와 대파를 볶아 향을 낸 뒤 계란을 깨뜨려 반숙 프라이로 익힙니다.',
          timerSec: 120
        },
        {
          stepNo: 3,
          instruction: '따뜻한 밥 위에 파기름 계란 프라이를 올리고 간장 1.5T와 설탕 0.5t를 둘러 비벼 먹습니다.',
          timerSec: 0
        }
      ]
    },
    {
      id: 'rcp_010',
      title: '참치 양파 간장 덮밥',
      cookTime: 10,
      mainIngredients: ['참치캔', '양파', '계란', '찬밥'],
      basicSeasonings: ['간장 2T', '설탕 1T', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '양파 반 개는 얇게 채 썰고, 참치캔은 기름을 살짝 따라냅니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1T와 양파를 넣고 투명해질 때까지 중불에서 볶아주세요.',
          timerSec: 120
        },
        {
          stepNo: 3,
          instruction: '참치, 간장 2T, 설탕 1T, 물 3T를 넣고 끓으면 푼 계란을 부어 1분 30초 익힌 뒤 밥 위에 얹습니다.',
          timerSec: 90
        }
      ]
    },
    {
      id: 'rcp_011',
      title: '스팸 치즈 식빵 토스트',
      cookTime: 10,
      mainIngredients: ['식빵', '스팸/햄', '치즈', '계란'],
      basicSeasonings: ['설탕 0.5T', '소금 한 꼬집', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '스팸은 0.5cm 두께로 썰고, 계란 1개에 소금 한 꼬집을 넣어 풀어둡니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유를 살짝 두르고 스팸과 식빵을 앞뒤로 노릇하게 굽습니다.',
          timerSec: 150
        },
        {
          stepNo: 3,
          instruction: '같은 팬에 푼 계란을 부쳐 식빵 위에 스팸, 계란, 치즈 순으로 올리고 설탕을 살짝 뿌려 덮습니다.',
          timerSec: 90
        }
      ]
    },
    {
      id: 'rcp_012',
      title: '콩나물 어묵 간장 볶음',
      cookTime: 10,
      mainIngredients: ['콩나물', '어묵', '대파'],
      basicSeasonings: ['간장 2T', '설탕 0.5T', '식용유 1.5T'],
      steps: [
        {
          stepNo: 1,
          instruction: '콩나물은 깨끗이 씻어 물기를 빼고 어묵은 길쭉하게 썹니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1.5T를 두르고 어묵과 대파를 먼저 중강불에서 노릇하게 볶습니다.',
          timerSec: 120
        },
        {
          stepNo: 3,
          instruction: '콩나물과 간장 2T, 설탕 0.5T를 넣고 콩나물이 아삭하게 숨이 죽을 때까지 빠르게 볶아냅니다.',
          timerSec: 150
        }
      ]
    },
    {
      id: 'rcp_013',
      title: '애호박 대파 간장 볶음밥',
      cookTime: 15,
      mainIngredients: ['애호박', '대파', '계란', '찬밥'],
      basicSeasonings: ['간장 2T', '소금 한 꼬집', '식용유 2T'],
      steps: [
        {
          stepNo: 1,
          instruction: '애호박 1/3개는 잘게 다지듯 썰고 대파는 송송 썰어둡니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 2T와 대파, 애호박, 소금 한 꼬집을 넣고 노릇해질 때까지 볶습니다.',
          timerSec: 180
        },
        {
          stepNo: 3,
          instruction: '한쪽에서 계란을 스크램블한 뒤 찬밥과 간장 2T를 넣고 센 불에서 고슬고슬하게 볶아줍니다.',
          timerSec: 150
        }
      ]
    },
    {
      id: 'rcp_014',
      title: '베이컨 감자채 볶음',
      cookTime: 15,
      mainIngredients: ['감자', '양파', '베이컨'],
      basicSeasonings: ['소금 0.5t', '식용유 1.5T'],
      steps: [
        {
          stepNo: 1,
          instruction: '감자 1개와 양파 반 개는 가늘게 채 썰고, 감자는 찬물에 헹궈 전분기를 뺀 뒤 물기를 제거합니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1.5T와 잘게 썬 베이컨을 넣고 기름이 나오도록 볶아줍니다.',
          timerSec: 120
        },
        {
          stepNo: 3,
          instruction: '감자채와 양파, 소금 0.5t를 넣고 감자가 투명하고 포슬포슬 익을 때까지 중불에서 볶습니다.',
          timerSec: 240
        }
      ]
    },
    {
      id: 'rcp_015',
      title: '콩나물 대파 계란국밥',
      cookTime: 15,
      mainIngredients: ['콩나물', '대파', '찬밥', '계란'],
      basicSeasonings: ['간장 1.5T', '소금 0.5t'],
      steps: [
        {
          stepNo: 1,
          instruction: '냄비에 물 500ml와 씻은 콩나물 한 줌을 넣고 뚜껑을 덮어 끓입니다.',
          timerSec: 240
        },
        {
          stepNo: 2,
          instruction: '콩나물이 익으면 간장 1.5T와 소금 0.5t로 간을 맞추고 대파와 찬밥을 넣어 함께 끓입니다.',
          timerSec: 120
        },
        {
          stepNo: 3,
          instruction: '마지막에 계란 1개를 깨뜨려 넣고 흰자가 익을 때까지 약불에서 1분간 뜸 들입니다.',
          timerSec: 60
        }
      ]
    },
    {
      id: 'rcp_016',
      title: '닭가슴살 양배추 간장 볶음',
      cookTime: 15,
      mainIngredients: ['닭가슴살', '양배추', '양파', '대파'],
      basicSeasonings: ['간장 2.5T', '설탕 1T', '식용유 1.5T'],
      steps: [
        {
          stepNo: 1,
          instruction: '닭가슴살과 양배추, 양파는 한입 크기로 썰고 대파는 어슷 썹니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '식용유 1.5T를 두른 팬에 닭가슴살과 대파를 넣고 겉면이 노릇해질 때까지 익힙니다.',
          timerSec: 180
        },
        {
          stepNo: 3,
          instruction: '양배추, 양파, 간장 2.5T, 설탕 1T를 넣고 채소가 아삭하게 익을 때까지 센 불에서 볶아냅니다.',
          timerSec: 180
        }
      ]
    },
    {
      id: 'rcp_017',
      title: '베이컨 버섯 치즈 라면사리',
      cookTime: 15,
      mainIngredients: ['라면사리', '베이컨', '버섯', '치즈', '양파'],
      basicSeasonings: ['간장 1.5T', '소금 한 꼬집', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '끓는 물에 라면사리를 2분 30초간 삶아 건져두고, 면수 반 컵을 따로 남겨둡니다.',
          timerSec: 150
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1T를 두르고 베이컨, 채 썬 양파, 버섯을 소금 한 꼬집과 함께 볶습니다.',
          timerSec: 180
        },
        {
          stepNo: 3,
          instruction: '면수 반 컵, 간장 1.5T, 삶은 라면사리를 넣고 치즈 2장을 녹여 꾸덕하게 버무립니다.',
          timerSec: 90
        }
      ]
    },
    {
      id: 'rcp_018',
      title: '김치 두부 스팸 볶음',
      cookTime: 15,
      mainIngredients: ['김치', '두부', '스팸/햄', '대파'],
      basicSeasonings: ['설탕 1T', '식용유 1.5T'],
      steps: [
        {
          stepNo: 1,
          instruction: '두부는 먹기 좋게 썰어 물기를 닦고, 스팸과 김치는 한입 크기로 자릅니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1.5T를 두르고 두부를 먼저 앞뒤로 노릇하게 부쳐 접시 가장자리에 옮겨둡니다.',
          timerSec: 210
        },
        {
          stepNo: 3,
          instruction: '같은 팬에 스팸, 김치, 설탕 1T, 대파를 넣고 볶아 구운 두부와 함께 담아냅니다.',
          timerSec: 180
        }
      ]
    },
    {
      id: 'rcp_019',
      title: '참치 김치 간장 볶음밥',
      cookTime: 10,
      mainIngredients: ['참치캔', '김치', '찬밥', '치즈'],
      basicSeasonings: ['설탕 0.5T', '간장 1T', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '김치는 가위로 잘게 자르고, 팬에 식용유 1T와 김치, 설탕 0.5T를 넣어 볶습니다.',
          timerSec: 150
        },
        {
          stepNo: 2,
          instruction: '참치캔과 찬밥, 간장 1T를 넣고 고루 볶아 불맛을 냅니다.',
          timerSec: 150
        },
        {
          stepNo: 3,
          instruction: '불을 약하게 줄인 뒤 치즈를 올려 뚜껑을 덮고 녹을 때까지 기다립니다.',
          timerSec: 60
        }
      ]
    },
    {
      id: 'rcp_020',
      title: '두부 애호박 계란 찌개',
      cookTime: 20,
      mainIngredients: ['두부', '애호박', '양파', '대파', '계란'],
      basicSeasonings: ['간장 2.5T', '소금 0.5t', '식용유 1T'],
      steps: [
        {
          stepNo: 1,
          instruction: '애호박과 양파, 두부는 먹기 좋게 깍둑 썰고 대파는 송송 썹니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '냄비에 식용유 1T를 두르고 양파와 애호박을 가볍게 볶은 뒤 물 450ml와 간장 2.5T를 부어 끓입니다.',
          timerSec: 300
        },
        {
          stepNo: 3,
          instruction: '두부와 소금 0.5t를 넣고 3분 더 끓인 뒤 대파와 푼 계란을 둘러 한소끔 끓여 마무리합니다.',
          timerSec: 180
        }
      ]
    },
    {
      id: 'rcp_021',
      title: '바삭 베이컨 치즈 감자전',
      cookTime: 20,
      mainIngredients: ['감자', '치즈', '베이컨'],
      basicSeasonings: ['소금 0.5t', '식용유 2T'],
      steps: [
        {
          stepNo: 1,
          instruction: '감자 2개는 최대한 가늘게 채 썰고(물에 헹구지 않기), 잘게 썬 베이컨과 소금 0.5t를 섞습니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 2T를 넉넉히 두르고 감자 반죽을 얇고 동그랗게 펼쳐 중약불에서 바삭하게 굽습니다.',
          timerSec: 300
        },
        {
          stepNo: 3,
          instruction: '뒤집은 뒤 치즈를 얹어 뚜껑을 덮고 아랫면이 노릇해지고 치즈가 녹을 때까지 익힙니다.',
          timerSec: 240
        }
      ]
    },
    {
      id: 'rcp_022',
      title: '어묵 떡국떡 간장 떡국',
      cookTime: 20,
      mainIngredients: ['떡국떡', '어묵', '계란', '대파'],
      basicSeasonings: ['간장 2T', '소금 0.5t'],
      steps: [
        {
          stepNo: 1,
          instruction: '떡국떡은 찬물에 5분간 불려두고 어묵은 한입 크기로 썹니다.',
          timerSec: 300
        },
        {
          stepNo: 2,
          instruction: '냄비에 물 550ml와 간장 2T, 어묵을 넣고 끓기 시작하면 떡국떡을 넣어 4분간 끓입니다.',
          timerSec: 240
        },
        {
          stepNo: 3,
          instruction: '떡이 동동 떠오르면 소금으로 간을 맞추고 푼 계란과 대파를 넣어 1분 더 끓여 완성합니다.',
          timerSec: 60
        }
      ]
    },
    {
      id: 'rcp_023',
      title: '애호박 버섯 두부 덮밥',
      cookTime: 20,
      mainIngredients: ['애호박', '버섯', '두부', '찬밥'],
      basicSeasonings: ['간장 2.5T', '설탕 1T', '식용유 1.5T'],
      steps: [
        {
          stepNo: 1,
          instruction: '애호박은 반달썰기, 버섯은 먹기 좋게 찢고 두부는 깍둑 썹니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1.5T를 두르고 두부와 애호박, 버섯을 중불에서 노릇하게 볶습니다.',
          timerSec: 240
        },
        {
          stepNo: 3,
          instruction: '간장 2.5T, 설탕 1T, 물 5T를 붓고 국물이 자작해질 때까지 졸인 뒤 따뜻한 밥 위에 올립니다.',
          timerSec: 180
        }
      ]
    },
    {
      id: 'rcp_024',
      title: '닭가슴살 감자 간장 조림',
      cookTime: 25,
      mainIngredients: ['닭가슴살', '감자', '양파', '대파'],
      basicSeasonings: ['간장 3.5T', '설탕 1.5T', '식용유 1.5T'],
      steps: [
        {
          stepNo: 1,
          instruction: '감자 1개와 닭가슴살, 양파는 한입 크기로 큼직하게 깍둑 썹니다.',
          timerSec: 0
        },
        {
          stepNo: 2,
          instruction: '팬에 식용유 1.5T를 두르고 닭가슴살과 감자를 중불에서 겉면이 노릇해질 때까지 볶아줍니다.',
          timerSec: 240
        },
        {
          stepNo: 3,
          instruction: '물 1컵, 간장 3.5T, 설탕 1.5T, 양파를 넣고 뚜껑을 덮어 감자가 포슬하게 익을 때까지 조립니다.',
          timerSec: 600
        },
        {
          stepNo: 4,
          instruction: '뚜껑을 열고 대파를 넣은 뒤 국물이 윤기 나게 졸아들 때까지 센 불에서 마무리합니다.',
          timerSec: 120
        }
      ]
    }
  ];
})(window);
