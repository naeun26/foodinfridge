(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  var STORAGE_KEY = 'fridge_meal_bookmarks';
  var CUSTOM_RECIPES_KEY = 'fridge_meal_custom_recipes';
  var RECENT_COOKED_KEY = 'fridge_meal_recent_cooked';
  var MAX_RECENT_COOKED = 3;

  function sanitizeCustomRecipe(raw) {
    if (!raw || typeof raw !== 'object') return null;
    if (typeof raw.id !== 'string' || !raw.id.trim()) return null;
    if (typeof raw.title !== 'string' || !raw.title.trim()) return null;

    var cookTime = Number(raw.cookTime);
    if (!Number.isFinite(cookTime) || cookTime < 1) cookTime = 15;
    cookTime = Math.min(180, Math.round(cookTime));

    var mainIngredients = Array.isArray(raw.mainIngredients)
      ? raw.mainIngredients
          .map(function (s) {
            return typeof s === 'string' ? s.trim() : '';
          })
          .filter(Boolean)
      : [];
    if (mainIngredients.length === 0) return null;

    var basicSeasonings = Array.isArray(raw.basicSeasonings)
      ? raw.basicSeasonings
          .map(function (s) {
            return typeof s === 'string' ? s.trim() : '';
          })
          .filter(Boolean)
      : [];

    var steps = Array.isArray(raw.steps)
      ? raw.steps
          .map(function (st, idx) {
            if (!st || typeof st.instruction !== 'string' || !st.instruction.trim()) return null;
            var sec = Number(st.timerSec);
            if (!Number.isFinite(sec) || sec < 0) sec = 0;
            return {
              stepNo: idx + 1,
              instruction: st.instruction.trim(),
              timerSec: Math.min(7200, Math.round(sec))
            };
          })
          .filter(Boolean)
      : [];
    if (steps.length === 0) return null;

    return {
      id: raw.id.trim(),
      title: raw.title.trim(),
      cookTime: cookTime,
      mainIngredients: mainIngredients,
      basicSeasonings: basicSeasonings.length > 0 ? basicSeasonings : ['기본 양념 적당량'],
      steps: steps,
      isCustom: true
    };
  }

  function readCustomRecipes() {
    try {
      var raw = global.localStorage.getItem(CUSTOM_RECIPES_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      var result = [];
      for (var i = 0; i < parsed.length; i++) {
        var clean = sanitizeCustomRecipe(parsed[i]);
        if (clean) result.push(clean);
      }
      return result;
    } catch (err) {
      return [];
    }
  }

  function writeCustomRecipes(list) {
    try {
      global.localStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(list));
      return true;
    } catch (err) {
      return false;
    }
  }

  function saveCustomRecipe(recipeInput) {
    var existing = readCustomRecipes();
    var id =
      recipeInput.id && recipeInput.id.indexOf('custom_') === 0
        ? recipeInput.id
        : 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);

    var clean = sanitizeCustomRecipe({
      id: id,
      title: recipeInput.title,
      cookTime: recipeInput.cookTime,
      mainIngredients: recipeInput.mainIngredients,
      basicSeasonings: recipeInput.basicSeasonings,
      steps: recipeInput.steps
    });

    if (!clean) return null;

    var replaced = false;
    for (var i = 0; i < existing.length; i++) {
      if (existing[i].id === clean.id) {
        existing[i] = clean;
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      existing.unshift(clean);
    }

    writeCustomRecipes(existing);
    return clean;
  }

  function deleteCustomRecipe(recipeId) {
    var existing = readCustomRecipes();
    var next = existing.filter(function (r) {
      return r.id !== recipeId;
    });
    writeCustomRecipes(next);

    // 삭제된 나만의 레시피가 보관함이나 최근 만든 기록에도 있었다면 함께 정리
    var bookmarks = readBookmarks();
    if (bookmarks.indexOf(recipeId) !== -1) {
      writeBookmarks(
        bookmarks.filter(function (id) {
          return id !== recipeId;
        })
      );
    }
    var recent = readRecentCooked();
    var filteredRecent = recent.filter(function (entry) {
      return entry.recipeId !== recipeId;
    });
    if (filteredRecent.length !== recent.length) {
      writeRecentCooked(filteredRecent);
    }
    return next;
  }

  function getAllRecipes() {
    return readCustomRecipes().concat(FridgeMeal.RECIPES || []);
  }

  function getValidRecipeIds() {
    var recipes = getAllRecipes();
    var set = new Set();
    for (var i = 0; i < recipes.length; i++) {
      set.add(recipes[i].id);
    }
    return set;
  }

  function readBookmarks() {
    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      var validIds = getValidRecipeIds();
      var unique = [];
      for (var i = 0; i < parsed.length; i++) {
        var id = parsed[i];
        if (typeof id === 'string' && validIds.has(id) && unique.indexOf(id) === -1) {
          unique.push(id);
        }
      }
      return unique;
    } catch (err) {
      return [];
    }
  }

  function writeBookmarks(ids) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      return true;
    } catch (err) {
      return false;
    }
  }

  function toggleBookmark(recipeId) {
    var current = readBookmarks();
    var idx = current.indexOf(recipeId);
    var isSaved;

    if (idx >= 0) {
      current.splice(idx, 1);
      isSaved = false;
    } else {
      current.unshift(recipeId);
      isSaved = true;
    }

    writeBookmarks(current);
    return { bookmarks: current, isSaved: isSaved };
  }

  function readRecentCooked() {
    try {
      var raw = global.localStorage.getItem(RECENT_COOKED_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      var validIds = getValidRecipeIds();
      var seen = new Set();
      var result = [];
      for (var i = 0; i < parsed.length; i++) {
        var item = parsed[i];
        var id = typeof item === 'string' ? item : item && item.recipeId;
        var cookedAt =
          item && typeof item.cookedAt === 'number' && Number.isFinite(item.cookedAt)
            ? item.cookedAt
            : Date.now();
        if (typeof id === 'string' && validIds.has(id) && !seen.has(id)) {
          seen.add(id);
          result.push({ recipeId: id, cookedAt: cookedAt });
          if (result.length >= MAX_RECENT_COOKED) break;
        }
      }
      return result;
    } catch (err) {
      return [];
    }
  }

  function writeRecentCooked(list) {
    try {
      global.localStorage.setItem(RECENT_COOKED_KEY, JSON.stringify(list));
      return true;
    } catch (err) {
      return false;
    }
  }

  function recordCookedRecipe(recipeId) {
    if (!recipeId || !getValidRecipeIds().has(recipeId)) {
      return readRecentCooked();
    }
    var current = readRecentCooked().filter(function (entry) {
      return entry.recipeId !== recipeId;
    });
    current.unshift({ recipeId: recipeId, cookedAt: Date.now() });
    var trimmed = current.slice(0, MAX_RECENT_COOKED);
    writeRecentCooked(trimmed);
    return trimmed;
  }

  FridgeMeal.storage = {
    STORAGE_KEY: STORAGE_KEY,
    CUSTOM_RECIPES_KEY: CUSTOM_RECIPES_KEY,
    RECENT_COOKED_KEY: RECENT_COOKED_KEY,
    MAX_RECENT_COOKED: MAX_RECENT_COOKED,
    readBookmarks: readBookmarks,
    writeBookmarks: writeBookmarks,
    toggleBookmark: toggleBookmark,
    readCustomRecipes: readCustomRecipes,
    saveCustomRecipe: saveCustomRecipe,
    deleteCustomRecipe: deleteCustomRecipe,
    readRecentCooked: readRecentCooked,
    recordCookedRecipe: recordCookedRecipe,
    getAllRecipes: getAllRecipes
  };
})(window);
