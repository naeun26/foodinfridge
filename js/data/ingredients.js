(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  FridgeMeal.CATEGORIES = [
    { id: 'all', label: '전체' },
    { id: 'vegetable', label: '채소류' },
    { id: 'protein', label: '단백질/가공' },
    { id: 'carb', label: '탄수화물/면' },
    { id: 'other', label: '기타' }
  ];

  // 기본 21종 재료 (마늘·라면 포함, 우동사리 제외)
  FridgeMeal.INGREDIENTS = [
    // 채소류 (9)
    { id: 'cabbage', name: '양배추', category: 'vegetable', categoryLabel: '채소류', emoji: '🥬' },
    {
      id: 'green_onion',
      name: '대파',
      category: 'vegetable',
      categoryLabel: '채소류',
      emoji: '🌿',
      iconSvg:
        '<svg viewBox="0 0 28 28" fill="none" aria-hidden="true">' +
        '<path d="M5.5 23.2L7.2 21.5M7 24.4L8.6 22.8M8.8 24.8L10 23.4" stroke="#8e8b82" stroke-width="1.3" stroke-linecap="round"/>' +
        '<path d="M7.2 21.6C6.4 20.8 6.8 19.2 8.2 17.8L13.5 12.5L16.3 15.3L11 20.6C9.6 22 8 22.4 7.2 21.6Z" fill="#ffffff" stroke="#141413" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<path d="M13 13L20.5 4.2C21.2 3.5 22.3 3.8 22.4 4.7L20.4 10.6L24.2 8.4C24.9 8.1 25.5 8.8 25.1 9.5L16 15.8L13 13Z" fill="#5db872" stroke="#141413" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<path d="M14.2 14.2L19.6 8.2" stroke="#2c6d3b" stroke-width="1.2" stroke-linecap="round"/>' +
        '</svg>'
    },
    { id: 'onion', name: '양파', category: 'vegetable', categoryLabel: '채소류', emoji: '🧅' },
    { id: 'garlic', name: '마늘', category: 'vegetable', categoryLabel: '채소류', emoji: '🧄' },
    { id: 'potato', name: '감자', category: 'vegetable', categoryLabel: '채소류', emoji: '🥔' },
    { id: 'zucchini', name: '애호박', category: 'vegetable', categoryLabel: '채소류', emoji: '🥒' },
    { id: 'bean_sprouts', name: '콩나물', category: 'vegetable', categoryLabel: '채소류', emoji: '🌱' },
    { id: 'mushroom', name: '버섯', category: 'vegetable', categoryLabel: '채소류', emoji: '🍄' },
    { id: 'kimchi', name: '김치', category: 'vegetable', categoryLabel: '채소류', emoji: '🥬', emojiClass: 'emoji-kimchi' },

    // 단백질/가공 (7)
    { id: 'egg', name: '계란', category: 'protein', categoryLabel: '단백질/가공', emoji: '🥚' },
    { id: 'tofu', name: '두부', category: 'protein', categoryLabel: '단백질/가공', emoji: '🧈' },
    { id: 'tuna', name: '참치캔', category: 'protein', categoryLabel: '단백질/가공', emoji: '🐟' },
    { id: 'spam', name: '스팸/햄', category: 'protein', categoryLabel: '단백질/가공', emoji: '🍖' },
    { id: 'bacon', name: '베이컨', category: 'protein', categoryLabel: '단백질/가공', emoji: '🥓' },
    { id: 'chicken_breast', name: '닭가슴살', category: 'protein', categoryLabel: '단백질/가공', emoji: '🍗' },
    { id: 'fish_cake', name: '어묵', category: 'protein', categoryLabel: '단백질/가공', emoji: '🍢' },

    // 탄수화물/면 (5) — 라면 포함, 우동사리 제외
    { id: 'rice', name: '찬밥', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍚' },
    { id: 'bread', name: '식빵', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍞' },
    { id: 'ramen_noodle', name: '라면', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍜' },
    { id: 'rice_cake', name: '떡국떡', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍡' },
    { id: 'cheese', name: '치즈', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🧀' }
  ];

  FridgeMeal.COOK_TIME_OPTIONS = [
    { value: 10, label: '10분 이내', sub: '초스피드 한 끼' },
    { value: 20, label: '20분 이내', sub: '보편적인 시간' },
    { value: 30, label: '30분 이내', sub: '여유 있게 든든히' }
  ];
})(window);
