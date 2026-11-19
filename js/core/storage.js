(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  var STORAGE_KEY = 'fridge_meal_bookmarks';

  function getValidRecipeIds() {
    var recipes = FridgeMeal.RECIPES || [];
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

  FridgeMeal.storage = {
    STORAGE_KEY: STORAGE_KEY,
    readBookmarks: readBookmarks,
    writeBookmarks: writeBookmarks,
    toggleBookmark: toggleBookmark
  };
})(window);
