(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  FridgeMeal.CATEGORIES = [
    { id: 'all', label: '전체' },
    { id: 'vegetable', label: '채소류' },
    { id: 'protein', label: '단백질/가공' },
    { id: 'carb', label: '탄수화물/면' }
  ];

  // PRD 4.2 기준 20종 재료 (라면사리 포함, 우동사리 제외)
  FridgeMeal.INGREDIENTS = [
    // 채소류 (8)
    { id: 'cabbage', name: '양배추', category: 'vegetable', categoryLabel: '채소류', emoji: '🥬' },
    { id: 'green_onion', name: '대파', category: 'vegetable', categoryLabel: '채소류', emoji: '🧅' },
    { id: 'onion', name: '양파', category: 'vegetable', categoryLabel: '채소류', emoji: '🧄' },
    { id: 'potato', name: '감자', category: 'vegetable', categoryLabel: '채소류', emoji: '🥔' },
    { id: 'zucchini', name: '애호박', category: 'vegetable', categoryLabel: '채소류', emoji: '🥒' },
    { id: 'bean_sprouts', name: '콩나물', category: 'vegetable', categoryLabel: '채소류', emoji: '🌱' },
    { id: 'mushroom', name: '버섯', category: 'vegetable', categoryLabel: '채소류', emoji: '🍄' },
    { id: 'kimchi', name: '김치', category: 'vegetable', categoryLabel: '채소류', emoji: '🌶️' },

    // 단백질/가공 (7)
    { id: 'egg', name: '계란', category: 'protein', categoryLabel: '단백질/가공', emoji: '🥚' },
    { id: 'tofu', name: '두부', category: 'protein', categoryLabel: '단백질/가공', emoji: '🧈' },
    { id: 'tuna', name: '참치캔', category: 'protein', categoryLabel: '단백질/가공', emoji: '🥫' },
    { id: 'spam', name: '스팸/햄', category: 'protein', categoryLabel: '단백질/가공', emoji: '🍖' },
    { id: 'bacon', name: '베이컨', category: 'protein', categoryLabel: '단백질/가공', emoji: '🥓' },
    { id: 'chicken_breast', name: '닭가슴살', category: 'protein', categoryLabel: '단백질/가공', emoji: '🍗' },
    { id: 'fish_cake', name: '어묵', category: 'protein', categoryLabel: '단백질/가공', emoji: '🍢' },

    // 탄수화물/면 (5) — 라면사리 포함, 우동사리 제외
    { id: 'rice', name: '찬밥', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍚' },
    { id: 'bread', name: '식빵', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍞' },
    { id: 'ramen_noodle', name: '라면사리', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍜' },
    { id: 'rice_cake', name: '떡국떡', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🍡' },
    { id: 'cheese', name: '치즈', category: 'carb', categoryLabel: '탄수화물/면', emoji: '🧀' }
  ];

  FridgeMeal.COOK_TIME_OPTIONS = [
    { value: 10, label: '10분 이내', sub: '초스피드 한 끼' },
    { value: 20, label: '20분 이내', sub: '보편적인 시간' },
    { value: 30, label: '30분 이내', sub: '여유 있게 든든히' }
  ];
})(window);
