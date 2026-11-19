(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  /**
   * 추천 정렬 로직 (Rule-Based Pipeline):
   * 1. 필터링: cookTime <= maxCookTime AND matchCount >= 1
   * 2. 0건 예외 처리: 시간 제한 자동 해제 후 matchCount >= 1 재정렬 (isTimeFallback = true)
   * 3. 정렬:
   *    1순위: matchCount 내림차순
   *    2순위: missingCount 오름차순
   *    3순위: 보관함(즐겨찾기) 저장 레시피 우선
   *    4순위: cookTime 오름차순
   *    5순위: id 오름차순 (결정론적 정렬)
   */
  function enrichRecipe(recipe, selectedSet, bookmarkSet) {
    var matchedIngredients = [];
    var missingIngredients = [];

    for (var i = 0; i < recipe.mainIngredients.length; i++) {
      var ing = recipe.mainIngredients[i];
      if (selectedSet.has(ing)) {
        matchedIngredients.push(ing);
      } else {
        missingIngredients.push(ing);
      }
    }

    return {
      recipe: recipe,
      matchedIngredients: matchedIngredients,
      missingIngredients: missingIngredients,
      matchCount: matchedIngredients.length,
      missingCount: missingIngredients.length,
      isBookmarked: Boolean(bookmarkSet && bookmarkSet.has(recipe.id))
    };
  }

  function compareMatches(a, b) {
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }
    if (a.missingCount !== b.missingCount) {
      return a.missingCount - b.missingCount;
    }
    if (a.isBookmarked !== b.isBookmarked) {
      return a.isBookmarked ? -1 : 1;
    }
    if (a.recipe.cookTime !== b.recipe.cookTime) {
      return a.recipe.cookTime - b.recipe.cookTime;
    }
    return a.recipe.id.localeCompare(b.recipe.id);
  }

  function getRecommendedRecipes(recipes, selectedIngredients, maxCookTime, bookmarkedIds) {
    var selectedSet = new Set(selectedIngredients || []);
    if (selectedSet.size === 0) {
      return { items: [], isTimeFallback: false };
    }
    var bookmarkSet = new Set(bookmarkedIds || []);

    var allMatching = [];
    for (var i = 0; i < recipes.length; i++) {
      var enriched = enrichRecipe(recipes[i], selectedSet, bookmarkSet);
      if (enriched.matchCount >= 1) {
        allMatching.push(enriched);
      }
    }

    var withinTime = allMatching.filter(function (entry) {
      return entry.recipe.cookTime <= maxCookTime;
    });

    if (withinTime.length > 0) {
      withinTime.sort(compareMatches);
      return { items: withinTime, isTimeFallback: false };
    }

    // 0건 결과 Fallback: 시간 제한 자동 해제
    allMatching.sort(compareMatches);
    return { items: allMatching, isTimeFallback: allMatching.length > 0 };
  }

  FridgeMeal.matching = {
    getRecommendedRecipes: getRecommendedRecipes,
    enrichRecipe: enrichRecipe
  };
})(window);
