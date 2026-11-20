(function (global) {
  'use strict';

  var FridgeMeal = global.FridgeMeal;

  // =========================================================================
  // Inline SVG Icons
  // =========================================================================
  var ICONS = {
    brandLogo:
      '<svg class="brand-mark__glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<rect x="5" y="2.5" width="14" height="19" rx="3" stroke="currentColor" stroke-width="1.9"/>' +
      '<path d="M5 10H19" stroke="currentColor" stroke-width="1.8"/>' +
      '<path d="M8.5 5.8V7.6M8.5 13V16.2" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="15.5" cy="6.4" r="1.1" fill="var(--color-primary)"/>' +
      '</svg>',
    starOutline:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
      '</svg>',
    starFilled:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
      '</svg>',
    check:
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<polyline points="20 6 9 17 4 12"/>' +
      '</svg>',
    clock:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' +
      '</svg>',
    arrowLeft:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>' +
      '</svg>',
    arrowRight:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>' +
      '</svg>',
    play:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<polygon points="6 3 20 12 6 21 6 3"/>' +
      '</svg>',
    pause:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>' +
      '</svg>',
    reset:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>' +
      '</svg>',
    info:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' +
      '</svg>',
    plus:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" aria-hidden="true">' +
      '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' +
      '</svg>',
    addIngredient:
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M11 8.8C11 5.4 13.6 3.5 17 3.8C17.2 6.8 14.8 9 11 8.8Z" fill="var(--color-success)" stroke="var(--color-ink)" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<circle cx="15.2" cy="14.2" r="4.5" fill="var(--color-accent-amber)" stroke="var(--color-ink)" stroke-width="1.6"/>' +
      '<circle cx="9.4" cy="14.8" r="5" fill="var(--color-primary)" stroke="var(--color-ink)" stroke-width="1.6"/>' +
      '<path d="M7.6 10.1L9.4 8.6L11.2 10.1" stroke="var(--color-success)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>',
    edit:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>' +
      '</svg>',
    trash:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>' +
      '</svg>'
  };

  function createEmptyDraft() {
    return {
      id: null,
      title: '',
      cookTime: 15,
      mainIngredients: [],
      extraIngredientInput: '',
      extraIngredientEmoji: '🥦',
      seasoningsText: '',
      steps: [
        { instruction: '', mins: 0, secs: 0 },
        { instruction: '', mins: 3, secs: 0 }
      ],
      error: ''
    };
  }

  // =========================================================================
  // Application State
  // =========================================================================
  var state = {
    view: 'home', // 'home' | 'results' | 'detail' | 'bookmarks' | 'create'
    previousView: 'home',
    selectedIngredients: new Set(),
    activeCategory: 'all',
    maxCookTime: 20, // PRD 기본값: 20분 이내
    currentRecipeId: null,
    bookmarks: [],
    customRecipes: [],
    customIngredients: [],
    recentCooked: [],
    cookedThisVisit: false,
    addIngForm: {
      open: false,
      editingOriginalName: null,
      name: '',
      category: 'vegetable',
      emoji: '🥦',
      error: ''
    },
    wakeLock: {
      active: false,
      supported: FridgeMeal.kitchenApi.isWakeLockSupported()
    },
    timers: new Map(),
    tickerId: null,
    alarmStepNo: null,
    draft: createEmptyDraft()
  };

  var expectedHash = null;

  var dom = {};

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTime(totalSeconds) {
    var clamped = Math.max(0, Math.ceil(totalSeconds));
    var mins = Math.floor(clamped / 60);
    var secs = clamped % 60;
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  function announce(message) {
    if (!dom.liveRegion) return;
    dom.liveRegion.textContent = '';
    global.setTimeout(function () {
      if (dom.liveRegion) dom.liveRegion.textContent = message;
    }, 30);
  }

  function getAllRecipes() {
    return state.customRecipes.concat(FridgeMeal.RECIPES);
  }

  function getRecipeById(id) {
    var recipes = getAllRecipes();
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].id === id) return recipes[i];
    }
    return null;
  }

  function isBookmarked(recipeId) {
    return state.bookmarks.indexOf(recipeId) !== -1;
  }

  // =========================================================================
  // Timer Management (Drift-free Date.now() delta + Repeating Alarm)
  // =========================================================================
  function hasRunningTimer() {
    var running = false;
    state.timers.forEach(function (t) {
      if (t.status === 'running') running = true;
    });
    return running;
  }

  function renderAlarmBannerInPlace() {
    var slot = document.querySelector('[data-alarm-banner-slot]');
    if (!slot) return;
    if (state.alarmStepNo === null) {
      slot.innerHTML = '';
      return;
    }
    var label = 'STEP ' + String(state.alarmStepNo).padStart(2, '0');
    slot.innerHTML =
      '<div class="timer-alarm-banner" role="alert">' +
      '  <p class="timer-alarm-banner__text">🔔 ' +
      label +
      ' 타이머가 완료되었습니다! 불을 확인해 주세요.</p>' +
      '  <button type="button" class="timer-alarm-banner__btn" data-action="stop-alarm">알림 끄기</button>' +
      '</div>';
  }

  function stopActiveAlarm() {
    FridgeMeal.kitchenApi.stopTimerAlarm();
    if (state.alarmStepNo !== null) {
      state.alarmStepNo = null;
      renderAlarmBannerInPlace();
    }
  }

  function clearAllTimers() {
    stopActiveAlarm();
    if (state.tickerId !== null) {
      global.clearInterval(state.tickerId);
      state.tickerId = null;
    }
    state.timers.clear();
  }

  function initTimersForRecipe(recipe) {
    clearAllTimers();
    if (!recipe) return;
    for (var i = 0; i < recipe.steps.length; i++) {
      var step = recipe.steps[i];
      if (step.timerSec > 0) {
        state.timers.set(step.stepNo, {
          totalSec: step.timerSec,
          remainingMs: step.timerSec * 1000,
          status: 'idle',
          endsAt: null
        });
      }
    }
  }

  function ensureTicker() {
    if (state.tickerId !== null) return;
    state.tickerId = global.setInterval(tickTimers, 200);
  }

  function stopTickerIfIdle() {
    var anyRunning = false;
    state.timers.forEach(function (t) {
      if (t.status === 'running') anyRunning = true;
    });
    if (!anyRunning && state.tickerId !== null) {
      global.clearInterval(state.tickerId);
      state.tickerId = null;
    }
  }

  function tickTimers() {
    var now = Date.now();
    var completedSteps = [];

    state.timers.forEach(function (timer, stepNo) {
      if (timer.status !== 'running' || timer.endsAt === null) return;
      var rem = timer.endsAt - now;
      if (rem <= 0) {
        timer.remainingMs = 0;
        timer.status = 'done';
        timer.endsAt = null;
        completedSteps.push(stepNo);
      } else {
        timer.remainingMs = rem;
        updateTimerDigitsInPlace(stepNo, timer);
      }
    });

    if (completedSteps.length > 0) {
      state.alarmStepNo = completedSteps[completedSteps.length - 1];
      renderAlarmBannerInPlace();
      FridgeMeal.kitchenApi.startTimerAlarm(function () {
        state.alarmStepNo = null;
        renderAlarmBannerInPlace();
      });
      for (var i = 0; i < completedSteps.length; i++) {
        var stepNo = completedSteps[i];
        rerenderStepCard(stepNo);
        announce('STEP ' + String(stepNo).padStart(2, '0') + ' 타이머가 완료되었습니다.');
      }
      stopTickerIfIdle();
    }
  }

  function updateTimerDigitsInPlace(stepNo, timer) {
    var card = document.querySelector('[data-step-card="' + stepNo + '"]');
    if (!card) return;

    var digitsEl = card.querySelector('[data-timer-digits]');
    if (digitsEl) {
      var formatted = formatTime(timer.remainingMs / 1000);
      if (digitsEl.textContent !== formatted) {
        digitsEl.textContent = formatted;
      }
    }

    var fillEl = card.querySelector('[data-timer-progress]');
    if (fillEl && timer.totalSec > 0) {
      var elapsedRatio = 1 - timer.remainingMs / (timer.totalSec * 1000);
      var pct = Math.min(100, Math.max(0, elapsedRatio * 100));
      fillEl.style.width = pct.toFixed(1) + '%';
    }
  }

  function handleTimerAction(stepNo, action) {
    var timer = state.timers.get(stepNo);
    if (!timer) return;

    if (state.alarmStepNo === stepNo) {
      stopActiveAlarm();
    }

    if (action === 'start' || action === 'resume') {
      FridgeMeal.kitchenApi.unlockAudio();
      if (timer.status === 'done' || timer.remainingMs <= 0) {
        timer.remainingMs = timer.totalSec * 1000;
      }
      timer.status = 'running';
      timer.endsAt = Date.now() + timer.remainingMs;
      ensureTicker();
      rerenderStepCard(stepNo);
    } else if (action === 'pause') {
      if (timer.status === 'running' && timer.endsAt !== null) {
        timer.remainingMs = Math.max(0, timer.endsAt - Date.now());
      }
      timer.status = 'paused';
      timer.endsAt = null;
      stopTickerIfIdle();
      rerenderStepCard(stepNo);
    } else if (action === 'reset') {
      timer.remainingMs = timer.totalSec * 1000;
      timer.status = 'idle';
      timer.endsAt = null;
      stopTickerIfIdle();
      rerenderStepCard(stepNo);
    }
  }

  // =========================================================================
  // Navigation, URL Hash Routing & Lifecycle
  // =========================================================================
  function getHashForRoute(view, recipeId) {
    if (view === 'results') return '#results';
    if (view === 'detail' && recipeId) return '#recipe/' + encodeURIComponent(recipeId);
    if (view === 'bookmarks') return '#bookmarks';
    if (view === 'create') return '#create';
    return '#home';
  }

  function parseHash() {
    var raw = String(global.location.hash || '').replace(/^#/, '');
    if (!raw || raw === 'home') return { view: 'home', recipeId: null };
    if (raw === 'results') return { view: 'results', recipeId: null };
    if (raw === 'bookmarks') return { view: 'bookmarks', recipeId: null };
    if (raw === 'create') return { view: 'create', recipeId: null };
    if (raw.indexOf('recipe/') === 0) {
      return { view: 'detail', recipeId: decodeURIComponent(raw.slice(7)) };
    }
    return { view: 'home', recipeId: null };
  }

  function syncHash(view, recipeId) {
    var target = getHashForRoute(view, recipeId);
    if (view === 'home' && !global.location.hash) return;
    if (global.location.hash !== target) {
      expectedHash = target;
      global.location.hash = target;
    }
  }

  function confirmLeaveRunningTimer() {
    if (state.view === 'detail' && hasRunningTimer()) {
      return global.confirm(
        '실행 중인 조리 타이머가 있습니다. 화면을 나가면 타이머가 초기화됩니다. 이동할까요?'
      );
    }
    return true;
  }

  function navigateTo(view, options) {
    options = options || {};
    var leavingDetail =
      state.view === 'detail' &&
      (view !== 'detail' || (options.recipeId && options.recipeId !== state.currentRecipeId));
    var enteringDetail = view === 'detail';

    if (leavingDetail && !options.forceLeave) {
      if (!confirmLeaveRunningTimer()) {
        return false;
      }
    }

    if (leavingDetail) {
      clearAllTimers();
      FridgeMeal.kitchenApi.releaseWakeLock();
    }

    if (view === 'results' && state.selectedIngredients.size === 0) {
      view = 'home';
    }

    if (view === 'detail') {
      var recipe = getRecipeById(options.recipeId);
      if (!recipe) {
        return navigateTo('home', { fromHash: options.fromHash, forceLeave: true });
      }
      state.previousView = options.from || (state.view === 'detail' ? state.previousView : state.view);
      state.currentRecipeId = recipe.id;
      state.cookedThisVisit = false;
      initTimersForRecipe(recipe);
    } else {
      state.currentRecipeId = null;
      state.cookedThisVisit = false;
    }

    if (view === 'create') {
      if (options.editRecipe) {
        var er = options.editRecipe;
        state.draft = {
          id: er.id,
          title: er.title,
          cookTime: er.cookTime,
          mainIngredients: er.mainIngredients.slice(),
          extraIngredientInput: '',
          extraIngredientEmoji: '🥦',
          seasoningsText: er.basicSeasonings.join(', '),
          steps: er.steps.map(function (st) {
            return {
              instruction: st.instruction,
              mins: Math.floor((st.timerSec || 0) / 60),
              secs: (st.timerSec || 0) % 60
            };
          }),
          error: ''
        };
      } else {
        state.draft = createEmptyDraft();
      }
    }

    state.view = view;
    if (!options.fromHash) {
      syncHash(view, state.currentRecipeId);
    }
    render();
    global.scrollTo(0, 0);

    if (enteringDetail) {
      FridgeMeal.kitchenApi.requestWakeLock();
    }
    return true;
  }

  function handleHashChange() {
    var currentHash = global.location.hash || '#home';
    if (expectedHash && currentHash === expectedHash) {
      expectedHash = null;
      return;
    }
    expectedHash = null;

    var parsed = parseHash();
    if (
      parsed.view === state.view &&
      (parsed.view !== 'detail' || parsed.recipeId === state.currentRecipeId)
    ) {
      return;
    }

    var leavingDetail =
      state.view === 'detail' &&
      (parsed.view !== 'detail' || parsed.recipeId !== state.currentRecipeId);

    if (leavingDetail && !confirmLeaveRunningTimer()) {
      syncHash('detail', state.currentRecipeId);
      return;
    }

    navigateTo(parsed.view, {
      recipeId: parsed.recipeId,
      fromHash: true,
      forceLeave: true
    });
  }

  // =========================================================================
  // Rendering: Top Nav & Footer
  // =========================================================================
  function renderTopNav() {
    var count = state.bookmarks.length;
    var isBookmarksActive = state.view === 'bookmarks';
    var isCreateActive = state.view === 'create';

    dom.topNav.innerHTML =
      '<div class="container top-nav__inner">' +
      '  <button type="button" class="brand-mark" data-action="go-home" aria-label="냉장고 털이 한 끼 홈으로 이동">' +
      ICONS.brandLogo +
      '    <span class="brand-mark__wordmark">냉장고 털이 한 끼</span>' +
      '    <span class="brand-mark__sub">초간단 자취 레시피</span>' +
      '  </button>' +
      '  <div class="top-nav__actions">' +
      '    <button type="button" class="nav-add-btn ' +
      (isCreateActive ? 'nav-add-btn--active' : '') +
      '" data-action="open-create" aria-label="나만의 레시피 추가">' +
      ICONS.plus +
      '      <span class="nav-add-btn__label-short">추가</span>' +
      '      <span class="nav-add-btn__label-long">레시피 추가</span>' +
      '    </button>' +
      '    <button type="button" class="nav-bookmark-btn ' +
      (isBookmarksActive ? 'nav-bookmark-btn--active' : '') +
      '" data-action="open-bookmarks" aria-label="내 레시피 보관함 (' +
      count +
      '개)">' +
      '      <span class="nav-bookmark-btn__star">' +
      ICONS.starFilled +
      '</span>' +
      '      <span>보관함</span>' +
      '      <span class="nav-bookmark-btn__count" data-bookmark-count>' +
      count +
      '</span>' +
      '    </button>' +
      '  </div>' +
      '</div>';
  }

  function updateFooterSpacing() {
    var hasSticky = state.view === 'home';
    var isDetail = state.view === 'detail';
    dom.main.classList.toggle('app-main--no-sticky', !hasSticky && !isDetail);
    dom.main.classList.toggle('app-main--flush', isDetail);
    dom.footer.classList.toggle('site-footer--with-sticky', hasSticky);
  }

  // =========================================================================
  // Rendering: Screen 1 — Home (Ingredients + Cook Time)
  // =========================================================================
  var CUSTOM_EMOJI_OPTIONS = [
    '🥦', '🥕', '🍅', '🌽', '🫑', '🍆', '🥒', '🥑',
    '🍎', '🍋', '🍓', '🍌',
    '🥩', '🍗', '🍤', '🐟', '🌭', '🥓',
    '🥟', '🍝', '🥖', '🥛', '🧈', '🌶️', '🧂', '🍽️'
  ];

  function getAllIngredients() {
    var base = FridgeMeal.INGREDIENTS.concat(state.customIngredients);
    var knownSet = new Set(
      base.map(function (item) {
        return item.name;
      })
    );
    var merged = base.slice();
    for (var i = 0; i < state.customRecipes.length; i++) {
      var list = state.customRecipes[i].mainIngredients || [];
      for (var j = 0; j < list.length; j++) {
        var name = list[j];
        if (name && !knownSet.has(name)) {
          knownSet.add(name);
          merged.push({
            id: 'recipe_ing_' + name,
            name: name,
            category: 'other',
            categoryLabel: '기타',
            emoji: '🍽️',
            isFromRecipe: true
          });
        }
      }
    }
    return merged;
  }

  function renderIngredientIcon(item, sizeClass) {
    if (item && item.iconSvg) {
      return '<span class="ing-svg-icon ' + sizeClass + '" aria-hidden="true">' + item.iconSvg + '</span>';
    }
    if (item && item.emojiClass) {
      return '<span class="' + item.emojiClass + '" aria-hidden="true">' + item.emoji + '</span>';
    }
    return item ? item.emoji : '';
  }

  function getCategorySelectedCount(categoryId) {
    if (categoryId === 'all') return state.selectedIngredients.size;
    var count = 0;
    var list = getAllIngredients();
    for (var i = 0; i < list.length; i++) {
      if (list[i].category === categoryId && state.selectedIngredients.has(list[i].name)) {
        count++;
      }
    }
    return count;
  }

  function renderAddIngredientPanel() {
    var f = state.addIngForm;
    if (!f.open) return '';

    var catPills = FridgeMeal.CATEGORIES.filter(function (c) {
      return c.id !== 'all';
    })
      .map(function (c) {
        var active = f.category === c.id;
        return (
          '<button type="button" class="chip-toggle ' +
          (active ? 'chip-toggle--active' : '') +
          '" data-action="add-ing-set-cat" data-category="' +
          c.id +
          '" aria-pressed="' +
          active +
          '">' +
          escapeHtml(c.label) +
          '</button>'
        );
      })
      .join('');

    var emojiButtons = CUSTOM_EMOJI_OPTIONS.map(function (em) {
      var active = f.emoji === em;
      return (
        '<button type="button" class="emoji-btn ' +
        (active ? 'emoji-btn--active' : '') +
        '" data-action="add-ing-set-emoji" data-emoji="' +
        em +
        '" aria-label="아이콘 ' +
        em +
        '" aria-pressed="' +
        active +
        '">' +
        em +
        '</button>'
      );
    }).join('');

    var L = FridgeMeal.storage.LIMITS;
    var isEditing = Boolean(f.editingOriginalName);

    return (
      '<form class="add-ing-panel" id="add-ingredient-form" novalidate>' +
      '  <div class="add-ing-panel__head">' +
      '    <h3 class="add-ing-panel__title">' +
      ICONS.addIngredient +
      '<span>' +
      (isEditing ? '추가한 재료 수정' : '내 냉장고 재료 추가') +
      '</span></h3>' +
      '    <button type="button" class="btn-text" data-action="close-add-ing-panel">닫기</button>' +
      '  </div>' +
      (f.error ? '<p class="form-error-msg" role="alert">' + escapeHtml(f.error) + '</p>' : '') +
      '  <div class="form-field">' +
      '    <div class="form-label-row">' +
      '      <label class="form-label" for="add-ing-name">재료 이름 *</label>' +
      '      <span class="form-char-count" data-count-for="add-ing-name">' +
      f.name.length +
      ' / ' +
      L.INGREDIENT_NAME +
      '자</span>' +
      '    </div>' +
      '    <input type="text" id="add-ing-name" class="form-input" data-add-ing-name maxlength="' +
      L.INGREDIENT_NAME +
      '" placeholder="예: 대패삼겹살, 당근, 브로콜리 (최대 ' +
      L.INGREDIENT_NAME +
      '자)" value="' +
      escapeHtml(f.name) +
      '" autocomplete="off" />' +
      '  </div>' +
      '  <div class="form-field">' +
      '    <span class="form-label">카테고리</span>' +
      '    <div class="chip-picker">' +
      catPills +
      '</div>' +
      '  </div>' +
      '  <div class="form-field">' +
      '    <span class="form-label">아이콘 선택</span>' +
      '    <div class="emoji-picker">' +
      emojiButtons +
      '</div>' +
      '  </div>' +
      '  <div class="form-actions">' +
      (isEditing
        ? '<button type="button" class="btn-danger-ghost" data-action="delete-custom-ing" data-ingredient="' +
        escapeHtml(f.editingOriginalName) +
        '">삭제</button>'
        : '') +
      '    <button type="button" class="btn-secondary" data-action="close-add-ing-panel">취소</button>' +
      '    <button type="submit" class="btn-primary">' +
      (isEditing ? '수정 저장' : '추가하고 바로 선택') +
      '</button>' +
      '  </div>' +
      '</form>'
    );
  }

  function renderHomeView() {
    var selectedCount = state.selectedIngredients.size;
    var visibleIngredients = getAllIngredients().filter(function (item) {
      return state.activeCategory === 'all' || item.category === state.activeCategory;
    });

    var tabsHtml = FridgeMeal.CATEGORIES.map(function (cat) {
      var active = state.activeCategory === cat.id;
      var catSelected = getCategorySelectedCount(cat.id);
      return (
        '<button type="button" class="category-tab ' +
        (active ? 'category-tab--active' : '') +
        '" data-action="select-category" data-category="' +
        cat.id +
        '" aria-pressed="' +
        active +
        '">' +
        escapeHtml(cat.label) +
        (catSelected > 0 ? '<span class="category-tab__count">' + catSelected + '</span>' : '') +
        '</button>'
      );
    }).join('');

    var cardsHtml = visibleIngredients
      .map(function (item) {
        var selected = state.selectedIngredients.has(item.name);
        var isEditableCustom = Boolean(item.isCustom || item.isFromRecipe);
        var customBtnsHtml = isEditableCustom
          ? '<span role="button" tabindex="0" class="ingredient-card__mini-btn" data-action="edit-custom-ing" data-ingredient="' +
          escapeHtml(item.name) +
          '" aria-label="' +
          escapeHtml(item.name) +
          ' 이름·아이콘 수정" title="이름·아이콘 수정">✎</span>' +
          (item.isCustom
            ? '<span role="button" tabindex="0" class="ingredient-card__remove" data-action="delete-custom-ing" data-ingredient="' +
            escapeHtml(item.name) +
            '" aria-label="' +
            escapeHtml(item.name) +
            ' 삭제" title="삭제">×</span>'
            : '')
          : '';
        return (
          '<button type="button" class="ingredient-card ' +
          (selected ? 'ingredient-card--selected' : '') +
          '" data-action="toggle-ingredient" data-ingredient="' +
          escapeHtml(item.name) +
          '" data-category="' +
          item.category +
          '" aria-pressed="' +
          selected +
          '">' +
          '  <div class="ingredient-card__top">' +
          '    <span class="ingredient-card__emoji" aria-hidden="true">' +
          renderIngredientIcon(item, 'ing-svg-icon--card') +
          '</span>' +
          '    <span class="ingredient-card__top-right">' +
          customBtnsHtml +
          '      <span class="ingredient-card__check" aria-hidden="true">' +
          ICONS.check +
          '</span>' +
          '    </span>' +
          '  </div>' +
          '  <div class="ingredient-card__bottom">' +
          '    <span class="ingredient-card__name">' +
          escapeHtml(item.name) +
          '</span>' +
          '    <span class="ingredient-card__cat">' +
          '      <span class="ingredient-card__cat-dot" aria-hidden="true"></span>' +
          escapeHtml(item.categoryLabel) +
          (item.isCustom ? ' · 직접 추가' : item.isFromRecipe ? ' · 내 레시피' : '') +
          '    </span>' +
          '  </div>' +
          '</button>'
        );
      })
      .join('');

    cardsHtml +=
      '<button type="button" class="ingredient-card ingredient-card--add ' +
      (state.addIngForm.open ? 'ingredient-card--add-open' : '') +
      '" data-action="toggle-add-ing-panel" aria-expanded="' +
      state.addIngForm.open +
      '">' +
      '  <div class="ingredient-card__top">' +
      '    <span class="ingredient-card__add-icon" aria-hidden="true">' +
      ICONS.addIngredient +
      '</span>' +
      '    <span class="ingredient-card__add-badge" aria-hidden="true">' +
      ICONS.plus +
      '</span>' +
      '  </div>' +
      '  <div class="ingredient-card__bottom">' +
      '    <span class="ingredient-card__name">재료 추가</span>' +
      '    <span class="ingredient-card__cat">직접 입력하기</span>' +
      '  </div>' +
      '</button>';

    var timeHtml = FridgeMeal.COOK_TIME_OPTIONS.map(function (opt) {
      var active = state.maxCookTime === opt.value;
      return (
        '<button type="button" class="time-pill ' +
        (active ? 'time-pill--active' : '') +
        '" data-action="select-time" data-time="' +
        opt.value +
        '" aria-pressed="' +
        active +
        '">' +
        '  <span class="time-pill__label">' +
        escapeHtml(opt.label) +
        '</span>' +
        '  <span class="time-pill__sub">' +
        escapeHtml(opt.sub) +
        '</span>' +
        '</button>'
      );
    }).join('');

    var ctaText =
      selectedCount > 0
        ? '선택한 ' + selectedCount + '개 재료로 레시피 찾기'
        : '재료를 1개 이상 선택해 주세요';

    var summaryText =
      selectedCount > 0
        ? Array.from(state.selectedIngredients).slice(0, 5).join(', ') +
        (selectedCount > 5 ? ' 외 ' + (selectedCount - 5) + '개' : '')
        : '냉장고 속 자투리 재료를 개수 제한 없이 눌러보세요';

    dom.main.innerHTML =
      '<div class="container">' +
      '  <section class="hero-section">' +
      '    <div class="hero-top">' +
      '      <div class="hero-copy">' +
      '        <div class="hero-eyebrow caption-uppercase">' +
      '          <span class="hero-eyebrow__dot" aria-hidden="true"></span>' +
      '          <span>로그인 없이 바로 시작하는 1인 가구 한 끼</span>' +
      '        </div>' +
      '        <h1 class="display-lg">냉장고 속 남은 재료로,<br/>오늘의 한 끼를 바로 꺼내세요.</h1>' +
      '        <p class="body-md hero-subtitle">가진 재료를 개수 제한 없이 누르고 조리 시간만 고르면, 재료를 가장 많이 소진할 수 있는 초간단 레시피와 단계별 타이머를 바로 열어드립니다.</p>' +
      '      </div>' +
      '      <div class="hero-visual">' +
      '        <img class="hero-visual__img" src="./assets/images/hero-logo.png" alt="냉장고 털이 한 끼 일러스트 로고" width="248" height="248" decoding="async" />' +
      '      </div>' +
      '    </div>' +
      '    <div class="seasoning-notice" role="note">' +
      '      <span class="seasoning-notice__icon" aria-hidden="true">✓</span>' +
      '      <p class="seasoning-notice__text"><strong>소금·설탕·간장·식용유</strong>는 집에 있는 것으로 가정해요. 별도 양념 체크 없이 주재료만 골라주세요.</p>' +
      '    </div>' +
      '  </section>' +
      '  <section class="section-block" aria-labelledby="ingredients-heading">' +
      '    <div class="section-header">' +
      '      <div>' +
      '        <h2 id="ingredients-heading" class="display-sm">1. 냉장고에 있는 재료 선택</h2>' +
      '        <p class="body-sm">최소 1개 이상, 최대 개수 제한 없이 모두 선택할 수 있어요.</p>' +
      '      </div>' +
      '      <div class="section-header__meta">' +
      '        <span class="badge-pill mono">' +
      selectedCount +
      '개 선택됨</span>' +
      '        <button type="button" class="btn-text" data-action="select-all-ingredients">모두 선택</button>' +
      (selectedCount > 0
        ? '<button type="button" class="btn-text" data-action="clear-ingredients">선택 초기화</button>'
        : '') +
      '      </div>' +
      '    </div>' +
      '    <div class="category-tabs" role="tablist" aria-label="재료 카테고리 필터">' +
      tabsHtml +
      '    </div>' +
      '    <div class="ingredient-grid">' +
      cardsHtml +
      '    </div>' +
      renderAddIngredientPanel() +
      '  </section>' +
      '  <section class="section-block" aria-labelledby="cooktime-heading">' +
      '    <div class="section-header">' +
      '      <div>' +
      '        <h2 id="cooktime-heading" class="display-sm">2. 조리 가능 시간 선택</h2>' +
      '        <p class="body-sm">선택한 시간 안에 완성할 수 있는 레시피를 우선 추천해 드려요.</p>' +
      '      </div>' +
      '      <span class="badge-pill mono">' +
      state.maxCookTime +
      '분 이내</span>' +
      '    </div>' +
      '    <div class="time-selector" role="radiogroup" aria-label="조리 가능 시간">' +
      timeHtml +
      '    </div>' +
      '  </section>' +
      '</div>' +
      '<div class="sticky-cta">' +
      '  <div class="sticky-cta__inner">' +
      '    <div class="sticky-cta__summary">' +
      '      <div class="sticky-cta__summary-text">' +
      '        <span class="caption" style="color: var(--color-ink);">선택 재료 ' +
      selectedCount +
      '개 · ' +
      state.maxCookTime +
      '분 이내</span>' +
      '        <span class="body-sm sticky-cta__items">' +
      escapeHtml(summaryText) +
      '</span>' +
      '      </div>' +
      (selectedCount > 0
        ? '<button type="button" class="sticky-cta__clear" data-action="clear-ingredients">초기화</button>'
        : '') +
      '    </div>' +
      '    <button type="button" class="btn-primary sticky-cta__btn" data-action="find-recipes" ' +
      (selectedCount === 0 ? 'disabled' : '') +
      '>' +
      escapeHtml(ctaText) +
      '    </button>' +
      '  </div>' +
      '</div>';
  }

  // =========================================================================
  // Rendering: Screen 2 — Recommended Recipe List
  // =========================================================================
  function renderRecipeCard(entry, index, fromView) {
    var recipe = entry.recipe;
    var saved = isBookmarked(recipe.id);
    var isFeatured = fromView === 'results' && index === 0;
    var customBadgeHtml = recipe.isCustom ? '<span class="badge-custom">내 레시피</span>' : '';

    var matchBadgeHtml = '';
    if (fromView === 'results') {
      matchBadgeHtml =
        '<span class="badge-coral">내 재료 ' +
        entry.matchCount +
        '개 일치</span>' +
        (entry.missingCount === 0 ? '<span class="badge-success">추가 재료 없음</span>' : '') +
        customBadgeHtml;
    } else if (entry.recentLabel) {
      matchBadgeHtml =
        '<span class="badge-coral">' +
        escapeHtml(entry.recentLabel) +
        '</span>' +
        customBadgeHtml;
    } else {
      matchBadgeHtml =
        (recipe.isCustom ? customBadgeHtml : '<span class="badge-pill">저장된 레시피</span>');
    }

    var ownedChipsHtml =
      fromView === 'results'
        ? entry.matchedIngredients
          .map(function (ing) {
            return '<span class="ing-chip ing-chip--owned">' + escapeHtml(ing) + '</span>';
          })
          .join('')
        : recipe.mainIngredients
          .map(function (ing) {
            return '<span class="ing-chip ing-chip--neutral">' + escapeHtml(ing) + '</span>';
          })
          .join('');

    var missingRowHtml = '';
    if (fromView === 'results' && entry.missingIngredients.length > 0) {
      var missingChips = entry.missingIngredients
        .map(function (ing) {
          return '<span class="ing-chip ing-chip--missing">+' + escapeHtml(ing) + ' 필요</span>';
        })
        .join('');
      missingRowHtml =
        '<div class="recipe-meta-row">' +
        '  <span class="recipe-meta-row__label">추가 필요</span>' +
        missingChips +
        '</div>';
    }

    return (
      '<article class="recipe-card ' +
      (isFeatured ? 'recipe-card--featured' : '') +
      '" role="button" tabindex="0" data-action="open-recipe" data-recipe-id="' +
      recipe.id +
      '" data-from="' +
      fromView +
      '">' +
      '  <div>' +
      '    <div class="recipe-card__top">' +
      '      <div class="recipe-card__badges">' +
      matchBadgeHtml +
      '      </div>' +
      '      <div class="recipe-card__actions">' +
      '        <span class="recipe-card__time">' +
      ICONS.clock +
      '<span>' +
      recipe.cookTime +
      '분</span></span>' +
      '        <button type="button" class="bookmark-icon-btn ' +
      (saved ? 'bookmark-icon-btn--saved' : '') +
      '" data-action="toggle-bookmark" data-recipe-id="' +
      recipe.id +
      '" aria-label="' +
      escapeHtml(recipe.title) +
      (saved ? ' 보관함에서 삭제' : ' 보관함에 저장') +
      '" aria-pressed="' +
      saved +
      '">' +
      (saved ? ICONS.starFilled : ICONS.starOutline) +
      '        </button>' +
      '      </div>' +
      '    </div>' +
      '    <h3 class="recipe-card__title">' +
      escapeHtml(recipe.title) +
      '</h3>' +
      '    <div class="recipe-card__rows">' +
      '      <div class="recipe-meta-row">' +
      '        <span class="recipe-meta-row__label">' +
      (fromView === 'results' ? '내 재료' : '주재료') +
      '</span>' +
      ownedChipsHtml +
      '      </div>' +
      missingRowHtml +
      '      <div class="recipe-meta-row">' +
      '        <span class="recipe-meta-row__label">기본 양념</span>' +
      '        <span class="recipe-card__seasonings">' +
      escapeHtml(recipe.basicSeasonings.join(' · ')) +
      '</span>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="recipe-card__footer">' +
      '    <span>조리 순서 ' +
      recipe.steps.length +
      '단계 · 타이머 바로가기</span>' +
      ICONS.arrowRight +
      '  </div>' +
      '</article>'
    );
  }

  function renderResultsView() {
    var selectedArr = Array.from(state.selectedIngredients);
    var result = FridgeMeal.matching.getRecommendedRecipes(
      getAllRecipes(),
      selectedArr,
      state.maxCookTime,
      state.bookmarks
    );

    var selectedChipsHtml = selectedArr
      .map(function (name) {
        return '<span class="badge-pill">' + escapeHtml(name) + '</span>';
      })
      .join('');

    var fallbackHtml = result.isTimeFallback
      ? '<div class="fallback-banner" role="status">' +
      '  <span class="fallback-banner__icon">' +
      ICONS.info +
      '</span>' +
      '  <div>' +
      '    <p class="fallback-banner__title">선택한 시간은 조금 넘지만, 가진 재료로 만들 수 있어요!</p>' +
      '    <p class="fallback-banner__desc">' +
      state.maxCookTime +
      '분 이내 조건에 맞는 레시피가 없어 시간 제한을 자동으로 해제하고 일치 재료 순으로 정렬했습니다.</p>' +
      '  </div>' +
      '</div>'
      : '';

    var listSectionHtml =
      result.items.length > 0
        ? '<section class="recipe-list" aria-label="추천 레시피 목록">' +
        result.items
          .map(function (entry, idx) {
            return renderRecipeCard(entry, idx, 'results');
          })
          .join('') +
        '</section>'
        : '<div class="empty-state-card">' +
        '  <div class="empty-state-card__icon" aria-hidden="true">' +
        ICONS.addIngredient +
        '</div>' +
        '  <h2 class="display-sm">아직 이 재료가 들어간 레시피가 없어요</h2>' +
        '  <p class="body-md empty-state-card__text">직접 추가하신 재료로 나만의 레시피를 만들어 두면 다음부터 바로 추천받을 수 있어요!</p>' +
        '  <div class="cook-complete-box__actions">' +
        '    <button type="button" class="btn-primary" data-action="create-with-selected">이 재료로 레시피 만들기</button>' +
        '    <button type="button" class="btn-secondary" data-action="go-home">재료 다시 고르기</button>' +
        '  </div>' +
        '</div>';

    dom.main.innerHTML =
      '<div class="container">' +
      '  <section class="page-header">' +
      '    <div class="page-header__back-row">' +
      '      <button type="button" class="btn-secondary" data-action="go-home">' +
      ICONS.arrowLeft +
      '<span>재료 다시 고르기</span></button>' +
      '      <span class="badge-pill mono">총 ' +
      result.items.length +
      '개 추천</span>' +
      '    </div>' +
      '    <h1 class="display-md">가진 재료를 가장 많이 털어낼 레시피</h1>' +
      '    <p class="body-sm" style="margin-top: 6px;">보유 재료 일치 개수 → 추가 재료 적은 순 → 보관함 저장 우선 → 조리 시간 빠른 순으로 정리했어요.</p>' +
      '    <div class="selected-summary-bar">' +
      '      <span class="selected-summary-bar__label">선택 조건</span>' +
      '      <span class="badge-coral">' +
      state.maxCookTime +
      '분 이내</span>' +
      selectedChipsHtml +
      '    </div>' +
      '  </section>' +
      fallbackHtml +
      listSectionHtml +
      '</div>';
  }

  // =========================================================================
  // Rendering: Screen 3 — Recipe Detail & Dark Kitchen Step Timers
  // =========================================================================
  function renderStepCardInner(step) {
    var timer = state.timers.get(step.stepNo);
    var stepLabel = 'STEP ' + String(step.stepNo).padStart(2, '0');
    var statusTagHtml = '';
    var timerBoxHtml = '';

    if (timer) {
      if (timer.status === 'running') {
        statusTagHtml =
          '<span class="step-card__status-tag step-card__status-tag--running">⏳ 타이머 작동 중</span>';
      } else if (timer.status === 'paused') {
        statusTagHtml =
          '<span class="step-card__status-tag step-card__status-tag--paused">⏸ 일시정지</span>';
      } else if (timer.status === 'done') {
        statusTagHtml =
          '<span class="step-card__status-tag step-card__status-tag--done">✓ 완료!</span>';
      }

      var digits = formatTime(timer.remainingMs / 1000);
      var pct =
        timer.totalSec > 0
          ? Math.min(100, Math.max(0, (1 - timer.remainingMs / (timer.totalSec * 1000)) * 100))
          : 0;

      var controlsHtml = '';
      if (timer.status === 'idle') {
        controlsHtml =
          '<button type="button" class="timer-btn timer-btn--start" data-action="timer-start" data-step="' +
          step.stepNo +
          '">' +
          ICONS.play +
          '<span>' +
          digits +
          ' 타이머 시작</span>' +
          '</button>';
      } else if (timer.status === 'running') {
        controlsHtml =
          '<button type="button" class="timer-btn timer-btn--secondary" data-action="timer-pause" data-step="' +
          step.stepNo +
          '">' +
          ICONS.pause +
          '<span>일시정지</span>' +
          '</button>' +
          '<button type="button" class="timer-btn timer-btn--secondary" data-action="timer-reset" data-step="' +
          step.stepNo +
          '">' +
          ICONS.reset +
          '<span>초기화</span>' +
          '</button>';
      } else if (timer.status === 'paused') {
        controlsHtml =
          '<button type="button" class="timer-btn timer-btn--start" data-action="timer-resume" data-step="' +
          step.stepNo +
          '">' +
          ICONS.play +
          '<span>계속하기</span>' +
          '</button>' +
          '<button type="button" class="timer-btn timer-btn--secondary" data-action="timer-reset" data-step="' +
          step.stepNo +
          '">' +
          ICONS.reset +
          '<span>초기화</span>' +
          '</button>';
      } else if (timer.status === 'done') {
        controlsHtml =
          '<button type="button" class="timer-btn timer-btn--done" data-action="timer-start" data-step="' +
          step.stepNo +
          '">' +
          ICONS.play +
          '<span>완료! 다시 시작</span>' +
          '</button>' +
          '<button type="button" class="timer-btn timer-btn--secondary" data-action="timer-reset" data-step="' +
          step.stepNo +
          '">' +
          ICONS.reset +
          '<span>초기화</span>' +
          '</button>';
      }

      var timerLabel =
        timer.status === 'done'
          ? '조리 단계가 완료되었어요!'
          : '권장 조리 시간 ' + formatTime(timer.totalSec);

      timerBoxHtml =
        '<div class="timer-box">' +
        '  <div class="timer-box__top">' +
        '    <span class="timer-box__digits" data-timer-digits>' +
        digits +
        '</span>' +
        '    <span class="timer-box__label">' +
        timerLabel +
        '</span>' +
        '  </div>' +
        '  <div class="timer-progress" aria-hidden="true">' +
        '    <div class="timer-progress__fill" data-timer-progress style="width: ' +
        pct.toFixed(1) +
        '%"></div>' +
        '  </div>' +
        '  <div class="timer-controls">' +
        controlsHtml +
        '  </div>' +
        '</div>';
    }

    return (
      '<div class="step-card__header">' +
      '  <span class="step-card__badge">' +
      stepLabel +
      '</span>' +
      statusTagHtml +
      '</div>' +
      '<p class="step-card__instruction">' +
      escapeHtml(step.instruction) +
      '</p>' +
      timerBoxHtml
    );
  }

  function getStepCardClass(stepNo) {
    var timer = state.timers.get(stepNo);
    if (!timer) return 'step-card';
    if (timer.status === 'running') return 'step-card step-card--running';
    if (timer.status === 'done') return 'step-card step-card--done';
    return 'step-card';
  }

  function rerenderStepCard(stepNo) {
    var recipe = getRecipeById(state.currentRecipeId);
    if (!recipe) return;
    var step = null;
    for (var i = 0; i < recipe.steps.length; i++) {
      if (recipe.steps[i].stepNo === stepNo) {
        step = recipe.steps[i];
        break;
      }
    }
    if (!step) return;
    var cardEl = document.querySelector('[data-step-card="' + stepNo + '"]');
    if (!cardEl) return;
    cardEl.className = getStepCardClass(stepNo);
    cardEl.innerHTML = renderStepCardInner(step);
  }

  function updateWakeLockBadgeInPlace() {
    var pill = document.querySelector('[data-wakelock-pill]');
    if (!pill) return;
    var textEl = pill.querySelector('[data-wakelock-text]');
    pill.classList.toggle('wakelock-pill--active', state.wakeLock.active);
    if (textEl) {
      if (state.wakeLock.active) {
        textEl.textContent = '조리 중 화면 꺼짐 방지 켜짐';
      } else if (state.wakeLock.supported) {
        textEl.textContent = '화면 꺼짐 방지 대기 중';
      } else {
        textEl.textContent = '이 브라우저는 화면 유지 미지원';
      }
    }
  }

  function renderDetailView() {
    var recipe = getRecipeById(state.currentRecipeId);
    if (!recipe) {
      navigateTo('home');
      return;
    }

    var saved = isBookmarked(recipe.id);
    var backLabel = state.previousView === 'bookmarks' ? '보관함으로 돌아가기' : '추천 목록으로 돌아가기';
    var hasSelectionContext = state.selectedIngredients.size > 0;

    var mainIngHtml = recipe.mainIngredients
      .map(function (ing) {
        if (hasSelectionContext) {
          var owned = state.selectedIngredients.has(ing);
          return (
            '<span class="ing-chip ' +
            (owned ? 'ing-chip--owned' : 'ing-chip--missing') +
            '">' +
            (owned ? '✓ ' : '+') +
            escapeHtml(ing) +
            '</span>'
          );
        }
        return '<span class="ing-chip ing-chip--neutral">' + escapeHtml(ing) + '</span>';
      })
      .join('');

    var seasoningsHtml = recipe.basicSeasonings
      .map(function (s) {
        return '<span class="ing-chip ing-chip--neutral">' + escapeHtml(s) + '</span>';
      })
      .join('');

    var stepsHtml = recipe.steps
      .map(function (step) {
        return (
          '<article class="' +
          getStepCardClass(step.stepNo) +
          '" data-step-card="' +
          step.stepNo +
          '">' +
          renderStepCardInner(step) +
          '</article>'
        );
      })
      .join('');

    var wakeLockText = state.wakeLock.active
      ? '조리 중 화면 꺼짐 방지 켜짐'
      : state.wakeLock.supported
        ? '화면 꺼짐 방지 대기 중'
        : '이 브라우저는 화면 유지 미지원';

    var customControlsHtml = recipe.isCustom
      ? '<button type="button" class="btn-secondary" data-action="edit-custom-recipe" data-recipe-id="' +
      recipe.id +
      '">' +
      ICONS.edit +
      '<span>수정</span></button>' +
      '<button type="button" class="btn-danger-ghost" data-action="delete-custom-recipe" data-recipe-id="' +
      recipe.id +
      '">' +
      ICONS.trash +
      '<span>삭제</span></button>'
      : '';

    dom.main.innerHTML =
      '<div class="container container--narrow">' +
      '  <section class="detail-header">' +
      '    <div class="detail-header__controls">' +
      '      <button type="button" class="btn-secondary" data-action="go-back">' +
      ICONS.arrowLeft +
      '<span>' +
      backLabel +
      '</span></button>' +
      '      <div class="detail-header__right">' +
      customControlsHtml +
      '        <button type="button" class="bookmark-toggle-btn ' +
      (saved ? 'bookmark-toggle-btn--saved' : '') +
      '" data-action="toggle-bookmark" data-recipe-id="' +
      recipe.id +
      '" aria-pressed="' +
      saved +
      '">' +
      '          <span class="bookmark-toggle-btn__star">' +
      (saved ? ICONS.starFilled : ICONS.starOutline) +
      '</span>' +
      '          <span>' +
      (saved ? '보관함에 저장됨' : '보관함에 저장') +
      '</span>' +
      '        </button>' +
      '      </div>' +
      '    </div>' +
      '    <h1 class="display-md">' +
      escapeHtml(recipe.title) +
      '</h1>' +
      '    <div class="detail-meta-strip">' +
      '      <span class="badge-coral">' +
      ICONS.clock +
      ' 총 ' +
      recipe.cookTime +
      '분</span>' +
      (recipe.isCustom ? '<span class="badge-custom">내가 만든 레시피</span>' : '') +
      '      <span class="badge-pill mono">총 ' +
      recipe.steps.length +
      '단계</span>' +
      '      <span class="wakelock-pill ' +
      (state.wakeLock.active ? 'wakelock-pill--active' : '') +
      '" data-wakelock-pill>' +
      '        <span class="wakelock-pill__dot" aria-hidden="true"></span>' +
      '        <span data-wakelock-text>' +
      wakeLockText +
      '</span>' +
      '      </span>' +
      '    </div>' +
      '  </section>' +
      '  <section class="ingredients-summary-card" aria-label="필요 재료 및 기본 양념">' +
      '    <div>' +
      '      <h2 class="ingredients-summary-card__group-title">주재료' +
      (hasSelectionContext ? ' (✓ 보유 / + 추가)' : '') +
      '</h2>' +
      '      <div class="ingredients-chip-list">' +
      mainIngHtml +
      '</div>' +
      '    </div>' +
      '    <div>' +
      '      <h2 class="ingredients-summary-card__group-title">기본 양념 계량</h2>' +
      '      <div class="ingredients-chip-list">' +
      seasoningsHtml +
      '</div>' +
      '    </div>' +
      '    <div class="measure-guide">' +
      '      <strong>쉬운 계량 기준:</strong> 밥숟가락 1스푼 = 어른 숟가락 가득(약 15ml) · 티스푼 1스푼 = 커피 스푼(약 5ml) · 종이컵 1컵 = 약 180ml' +
      '    </div>' +
      '  </section>' +
      '</div>' +
      '<section class="cooking-band" aria-labelledby="cooking-steps-heading">' +
      '  <div class="container container--narrow">' +
      '    <div class="cooking-band__header">' +
      '      <div>' +
      '        <h2 id="cooking-steps-heading" class="cooking-band__title">단계별 조리 가이드 &amp; 타이머</h2>' +
      '        <p class="cooking-band__hint">재료 손질 크기와 불 세기까지 자세히 적었어요. 타이머 종료 시 3회 알림음이 울립니다.</p>' +
      '      </div>' +
      '    </div>' +
      '    <div data-alarm-banner-slot></div>' +
      '    <div class="steps-stack">' +
      stepsHtml +
      '    </div>' +
      '    <div class="cook-complete-box ' +
      (state.cookedThisVisit ? 'cook-complete-box--done' : '') +
      '">' +
      (state.cookedThisVisit
        ? '      <p class="cook-complete-box__title">🎉 요리를 완료했어요!</p>' +
        '      <p class="cook-complete-box__desc">보관함의 <strong>최근 만든 레시피</strong>(최대 3개)에 기록되었습니다.</p>' +
        '      <div class="cook-complete-box__actions">' +
        '        <button type="button" class="btn-primary" data-action="open-bookmarks">보관함에서 확인하기</button>' +
        '        <button type="button" class="btn-secondary" data-action="go-home">다른 재료로 찾기</button>' +
        '      </div>'
        : '      <p class="cook-complete-box__title">맛있게 완성하셨나요?</p>' +
        '      <p class="cook-complete-box__desc">완료 버튼을 누르면 보관함의 최근 만든 레시피(최대 3개)에 기록돼요.</p>' +
        '      <div class="cook-complete-box__actions">' +
        '        <button type="button" class="btn-primary cook-complete-btn" data-action="complete-cooking" data-recipe-id="' +
        recipe.id +
        '">' +
        ICONS.check +
        '<span>요리 완료</span></button>' +
        '      </div>') +
      '    </div>' +
      '  </div>' +
      '</section>';

    renderAlarmBannerInPlace();
  }

  // =========================================================================
  // Rendering: Screen 4 — Bookmarks, Recent Cooked & My Custom Recipes View
  // =========================================================================
  function formatCookedLabel(timestamp) {
    var diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSec < 60) return '방금 완료';
    if (diffSec < 3600) return Math.floor(diffSec / 60) + '분 전 완료';
    var d = new Date(timestamp);
    var now = new Date();
    var hh = String(d.getHours()).padStart(2, '0');
    var mm = String(d.getMinutes()).padStart(2, '0');
    if (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    ) {
      return '오늘 ' + hh + ':' + mm + ' 완료';
    }
    return d.getMonth() + 1 + '/' + d.getDate() + ' 완료';
  }

  function renderBookmarksView() {
    var recentEntries = [];
    for (var k = 0; k < state.recentCooked.length; k++) {
      var recEntry = state.recentCooked[k];
      var recentRecipe = getRecipeById(recEntry.recipeId);
      if (recentRecipe) {
        recentEntries.push({
          recipe: recentRecipe,
          matchedIngredients: [],
          missingIngredients: [],
          matchCount: 0,
          missingCount: 0,
          recentLabel: formatCookedLabel(recEntry.cookedAt)
        });
      }
    }

    var recentSectionHtml =
      '<section class="bookmarks-section">' +
      '  <div class="bookmarks-section__head">' +
      '    <h2 class="display-sm">최근 만든 레시피 <span class="badge-pill mono" style="vertical-align: middle;">' +
      recentEntries.length +
      ' / 3</span></h2>' +
      '  </div>' +
      (recentEntries.length > 0
        ? '<div class="recipe-list">' +
        recentEntries
          .map(function (entry, idx) {
            return renderRecipeCard(entry, idx, 'bookmarks');
          })
          .join('') +
        '</div>'
        : '<p class="body-sm">레시피 맨 아래의 [요리 완료] 버튼을 누르면 최근 만든 요리 최대 3개가 여기에 기록돼요.</p>') +
      '</section>';

    var savedRecipes = [];
    for (var i = 0; i < state.bookmarks.length; i++) {
      var r = getRecipeById(state.bookmarks[i]);
      if (r) {
        savedRecipes.push({
          recipe: r,
          matchedIngredients: [],
          missingIngredients: [],
          matchCount: 0,
          missingCount: 0
        });
      }
    }

    var customEntries = state.customRecipes.map(function (r) {
      return {
        recipe: r,
        matchedIngredients: [],
        missingIngredients: [],
        matchCount: 0,
        missingCount: 0
      };
    });

    var customSectionHtml =
      '<section class="bookmarks-section">' +
      '  <div class="bookmarks-section__head">' +
      '    <h2 class="display-sm">내가 등록한 레시피 <span class="badge-pill mono" style="vertical-align: middle;">' +
      customEntries.length +
      '개</span></h2>' +
      '    <button type="button" class="btn-primary" data-action="open-create">' +
      ICONS.plus +
      '<span>나만의 레시피 추가</span></button>' +
      '  </div>' +
      (customEntries.length > 0
        ? '<div class="recipe-list">' +
        customEntries
          .map(function (entry, idx) {
            return renderRecipeCard(entry, idx, 'bookmarks');
          })
          .join('') +
        '</div>'
        : '<p class="body-sm">직접 만든 레시피를 등록하면 재료 추천 리스트와 타이머에도 바로 연동돼요.</p>') +
      '</section>';

    var bookmarksBodyHtml = '';
    if (savedRecipes.length === 0) {
      bookmarksBodyHtml =
        '<div class="empty-state-card">' +
        '  <div class="empty-state-card__icon" aria-hidden="true">' +
        ICONS.starOutline +
        '</div>' +
        '  <h2 class="display-sm">아직 보관한 레시피가 없어요</h2>' +
        '  <p class="body-md empty-state-card__text">아직 보관한 레시피가 없어요. 마음에 드는 레시피의 별표를 눌러 저장해 보세요!</p>' +
        '  <button type="button" class="btn-primary" data-action="go-home">재료 고르러 가기</button>' +
        '</div>';
    } else {
      bookmarksBodyHtml =
        '<div class="recipe-list" aria-label="보관한 레시피 목록">' +
        savedRecipes
          .map(function (entry, idx) {
            return renderRecipeCard(entry, idx, 'bookmarks');
          })
          .join('') +
        '</div>';
    }

    dom.main.innerHTML =
      '<div class="container">' +
      '  <section class="page-header">' +
      '    <div class="page-header__back-row">' +
      '      <button type="button" class="btn-secondary" data-action="go-home">' +
      ICONS.arrowLeft +
      '<span>재료 고르러 가기</span></button>' +
      '      <span class="badge-pill mono">즐겨찾기 ' +
      savedRecipes.length +
      '개</span>' +
      '    </div>' +
      '    <h1 class="display-md">내 레시피 보관함</h1>' +
      '    <p class="body-sm" style="margin-top: 6px;">최근 만든 레시피(최대 3개), 직접 등록한 레시피, 즐겨찾기한 레시피가 브라우저에 자동 저장됩니다.</p>' +
      '  </section>' +
      recentSectionHtml +
      customSectionHtml +
      '  <section class="bookmarks-section">' +
      '    <div class="bookmarks-section__head">' +
      '      <h2 class="display-sm">즐겨찾기한 레시피</h2>' +
      '    </div>' +
      bookmarksBodyHtml +
      '  </section>' +
      '</div>';
  }

  // =========================================================================
  // Rendering: Screen 5 — Custom Recipe Creator / Editor
  // =========================================================================
  function renderCreateView() {
    var d = state.draft;
    var isEditing = Boolean(d.id);
    var allIngredients = getAllIngredients();
    var catalogNames = allIngredients.map(function (item) {
      return item.name;
    });

    var presetChipsHtml = allIngredients.map(function (item) {
      var active = d.mainIngredients.indexOf(item.name) !== -1;
      return (
        '<button type="button" class="chip-toggle ' +
        (active ? 'chip-toggle--active' : '') +
        '" data-action="draft-toggle-ing" data-ingredient="' +
        escapeHtml(item.name) +
        '" aria-pressed="' +
        active +
        '">' +
        renderIngredientIcon(item, 'ing-svg-icon--chip') +
        ' ' +
        escapeHtml(item.name) +
        '</button>'
      );
    }).join('');

    var extraSelectedChipsHtml = d.mainIngredients
      .filter(function (name) {
        return catalogNames.indexOf(name) === -1;
      })
      .map(function (name) {
        return (
          '<button type="button" class="chip-toggle chip-toggle--active" data-action="draft-toggle-ing" data-ingredient="' +
          escapeHtml(name) +
          '">' +
          escapeHtml(name) +
          ' ×</button>'
        );
      })
      .join('');

    var L = FridgeMeal.storage.LIMITS;

    var stepsEditorHtml = d.steps
      .map(function (st, idx) {
        return (
          '<div class="step-editor-item">' +
          '  <div class="step-editor-item__head">' +
          '    <span class="caption mono" style="color: var(--color-primary);">STEP ' +
          String(idx + 1).padStart(2, '0') +
          '</span>' +
          '    <span class="form-char-count" data-count-for="step-' +
          idx +
          '">' +
          String(st.instruction || '').length +
          ' / ' +
          L.STEP_INSTRUCTION +
          '자</span>' +
          (d.steps.length > 1
            ? '<button type="button" class="btn-text" data-action="draft-remove-step" data-step-idx="' +
            idx +
            '">삭제</button>'
            : '') +
          '  </div>' +
          '  <textarea class="form-textarea" maxlength="' +
          L.STEP_INSTRUCTION +
          '" data-draft-step-text="' +
          idx +
          '" placeholder="예: 양파 반 개를 0.5cm 두께로 채 썰고, 중불에서 투명해질 때까지 2분간 볶아주세요. (최대 ' +
          L.STEP_INSTRUCTION +
          '자)">' +
          escapeHtml(st.instruction) +
          '</textarea>' +
          '  <div class="step-timer-inputs">' +
          '    <span>단계 타이머 (선택):</span>' +
          '    <input type="number" class="form-input" min="0" max="120" data-draft-step-min="' +
          idx +
          '" value="' +
          st.mins +
          '" aria-label="STEP ' +
          (idx + 1) +
          ' 타이머 분" /> 분' +
          '    <input type="number" class="form-input" min="0" max="59" data-draft-step-sec="' +
          idx +
          '" value="' +
          st.secs +
          '" aria-label="STEP ' +
          (idx + 1) +
          ' 타이머 초" /> 초' +
          '  </div>' +
          '</div>'
        );
      })
      .join('');

    dom.main.innerHTML =
      '<div class="container container--narrow">' +
      '  <section class="page-header">' +
      '    <div class="page-header__back-row">' +
      '      <button type="button" class="btn-secondary" data-action="go-home">' +
      ICONS.arrowLeft +
      '<span>홈으로</span></button>' +
      '      <span class="badge-custom">브라우저 자동 저장</span>' +
      '    </div>' +
      '    <h1 class="display-md">' +
      (isEditing ? '나만의 레시피 수정' : '나만의 레시피 추가') +
      '</h1>' +
      '    <p class="body-sm" style="margin-top: 6px;">저장한 레시피는 냉장고 재료 추천 리스트와 단계별 타이머에서도 기본 레시피와 똑같이 작동해요.</p>' +
      '  </section>' +
      '  <form class="recipe-form" id="custom-recipe-form" novalidate>' +
      (d.error ? '<p class="form-error-msg" role="alert">' + escapeHtml(d.error) + '</p>' : '') +
      '    <div class="form-card">' +
      '      <div class="form-field">' +
      '        <div class="form-label-row">' +
      '          <label class="form-label" for="draft-title">레시피 이름 *</label>' +
      '          <span class="form-char-count" data-count-for="draft-title">' +
      String(d.title || '').length +
      ' / ' +
      L.RECIPE_TITLE +
      '자</span>' +
      '        </div>' +
      '        <input type="text" id="draft-title" class="form-input" data-draft-field="title" maxlength="' +
      L.RECIPE_TITLE +
      '" placeholder="예: 참치 마요 김치 덮밥 (최대 ' +
      L.RECIPE_TITLE +
      '자)" value="' +
      escapeHtml(d.title) +
      '" required />' +
      '      </div>' +
      '      <div class="form-field">' +
      '        <label class="form-label" for="draft-time">총 조리 시간 (분) *</label>' +
      '        <div class="chip-picker" style="margin-bottom: 4px;">' +
      [10, 15, 20, 30]
        .map(function (t) {
          return (
            '<button type="button" class="chip-toggle ' +
            (Number(d.cookTime) === t ? 'chip-toggle--active' : '') +
            '" data-action="draft-set-time" data-time="' +
            t +
            '">' +
            t +
            '분</button>'
          );
        })
        .join('') +
      '        </div>' +
      '        <input type="number" id="draft-time" class="form-input" data-draft-field="cookTime" min="1" max="180" value="' +
      escapeHtml(d.cookTime) +
      '" style="max-width: 140px;" />' +
      '      </div>' +
      '    </div>' +
      '    <div class="form-card">' +
      '      <div class="form-field">' +
      '        <span class="form-label">주재료 선택 * (' +
      d.mainIngredients.length +
      '개 선택됨)</span>' +
      '        <p class="form-hint">기본 21종 재료에서 고르면 냉장고 추천 필터에 자동으로 매칭됩니다.</p>' +
      '        <div class="chip-picker">' +
      presetChipsHtml +
      extraSelectedChipsHtml +
      '        </div>' +
      '      </div>' +
      '      <div class="form-field">' +
      '        <div class="form-label-row">' +
      '          <label class="form-label" for="draft-extra-ing">목록에 없는 재료 직접 추가 (선택)</label>' +
      '          <span class="form-char-count" data-count-for="draft-extra-ing">' +
      String(d.extraIngredientInput || '').length +
      ' / ' +
      L.INGREDIENT_NAME +
      '자</span>' +
      '        </div>' +
      '        <div class="extra-ing-row">' +
      '          <input type="text" id="draft-extra-ing" class="form-input" data-draft-field="extraIngredientInput" maxlength="' +
      L.INGREDIENT_NAME +
      '" placeholder="예: 대패삼겹살 (한 번에 1개, 최대 ' +
      L.INGREDIENT_NAME +
      '자)" value="' +
      escapeHtml(d.extraIngredientInput) +
      '" />' +
      '          <button type="button" class="btn-secondary" data-action="draft-add-extra-ing">추가</button>' +
      '        </div>' +
      '        <div class="emoji-picker" style="margin-top: 6px;" aria-label="추가할 재료 아이콘 선택">' +
      CUSTOM_EMOJI_OPTIONS.map(function (em) {
        var active = (d.extraIngredientEmoji || '🥦') === em;
        return (
          '<button type="button" class="emoji-btn ' +
          (active ? 'emoji-btn--active' : '') +
          '" data-action="draft-set-extra-emoji" data-emoji="' +
          em +
          '" aria-label="아이콘 ' +
          em +
          '" aria-pressed="' +
          active +
          '">' +
          em +
          '</button>'
        );
      }).join('') +
      '        </div>' +
      '      </div>' +
      '      <div class="form-field">' +
      '        <div class="form-label-row">' +
      '          <label class="form-label" for="draft-seasonings">양념 계량 (쉼표로 구분)</label>' +
      '          <span class="form-char-count" data-count-for="draft-seasonings">' +
      String(d.seasoningsText || '').length +
      ' / ' +
      L.SEASONINGS_TEXT +
      '자</span>' +
      '        </div>' +
      '        <input type="text" id="draft-seasonings" class="form-input" data-draft-field="seasoningsText" maxlength="' +
      L.SEASONINGS_TEXT +
      '" placeholder="예: 간장 밥숟가락 2스푼, 설탕 밥숟가락 1스푼 (최대 ' +
      L.SEASONINGS_TEXT +
      '자)" value="' +
      escapeHtml(d.seasoningsText) +
      '" />' +
      '      </div>' +
      '    </div>' +
      '    <div class="form-card">' +
      '      <div class="section-header" style="margin-bottom: 0;">' +
      '        <div>' +
      '          <span class="form-label">단계별 조리 순서 &amp; 타이머 *</span>' +
      '          <p class="form-hint">재료 손질 크기(cm)나 불 세기를 적어두면 나중에 따라 하기 쉬워요.</p>' +
      '        </div>' +
      '        <button type="button" class="btn-secondary" data-action="draft-add-step">' +
      ICONS.plus +
      '<span>단계 추가</span></button>' +
      '      </div>' +
      '      <div class="step-editor-list">' +
      stepsEditorHtml +
      '      </div>' +
      '    </div>' +
      '    <div class="form-actions">' +
      '      <button type="button" class="btn-secondary" data-action="go-home">취소</button>' +
      '      <button type="submit" class="btn-primary">' +
      (isEditing ? '수정 완료' : '레시피 저장하고 바로 보기') +
      '</button>' +
      '    </div>' +
      '  </form>' +
      '</div>';
  }

  // =========================================================================
  // Master Render
  // =========================================================================
  function render() {
    renderTopNav();
    updateFooterSpacing();

    if (state.view === 'home') {
      renderHomeView();
    } else if (state.view === 'results') {
      renderResultsView();
    } else if (state.view === 'detail') {
      renderDetailView();
    } else if (state.view === 'bookmarks') {
      renderBookmarksView();
    } else if (state.view === 'create') {
      renderCreateView();
    }
  }

  // =========================================================================
  // Custom Recipe Submit Handler
  // =========================================================================
  function handleCustomRecipeSubmit(event) {
    event.preventDefault();
    var d = state.draft;
    var L = FridgeMeal.storage.LIMITS;

    if (!d.title.trim()) {
      d.error = '레시피 이름을 입력해 주세요.';
      renderCreateView();
      return;
    }
    if (d.title.trim().length > L.RECIPE_TITLE) {
      d.error = '레시피 이름은 최대 ' + L.RECIPE_TITLE + '자까지 입력할 수 있어요.';
      renderCreateView();
      return;
    }
    if (d.mainIngredients.length === 0) {
      d.error = '주재료를 최소 1개 이상 선택하거나 추가해 주세요.';
      renderCreateView();
      return;
    }

    var cleanSteps = d.steps
      .map(function (st) {
        var mins = Math.max(0, Number(st.mins) || 0);
        var secs = Math.max(0, Number(st.secs) || 0);
        return {
          instruction: String(st.instruction || '').trim(),
          timerSec: mins * 60 + secs
        };
      })
      .filter(function (st) {
        return st.instruction.length > 0;
      });

    if (cleanSteps.length === 0) {
      d.error = '조리 단계를 최소 1개 이상 작성해 주세요.';
      renderCreateView();
      return;
    }

    var seasonings = String(d.seasoningsText || '')
      .split(/[,\n]/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);

    var saved = FridgeMeal.storage.saveCustomRecipe({
      id: d.id,
      title: d.title.trim(),
      cookTime: Number(d.cookTime) || 15,
      mainIngredients: d.mainIngredients.slice(),
      basicSeasonings: seasonings,
      steps: cleanSteps
    });

    if (!saved) {
      d.error = '레시피를 저장하지 못했습니다. 입력 내용을 다시 확인해 주세요.';
      renderCreateView();
      return;
    }

    state.customRecipes = FridgeMeal.storage.readCustomRecipes();
    // 새로 직접 입력한 주재료가 있다면 기타 카테고리 재료 목록에도 함께 등록
    for (var mIdx = 0; mIdx < saved.mainIngredients.length; mIdx++) {
      FridgeMeal.storage.saveCustomIngredient({
        name: saved.mainIngredients[mIdx],
        category: 'other',
        emoji: '🍽️'
      });
    }
    state.customIngredients = FridgeMeal.storage.readCustomIngredients();
    announce('나만의 레시피를 저장했습니다.');
    navigateTo('detail', { recipeId: saved.id, from: 'bookmarks' });
  }

  // =========================================================================
  // Event Delegation
  // =========================================================================
  function handleClick(event) {
    var target = event.target.closest('[data-action]');
    if (!target) return;

    var action = target.getAttribute('data-action');

    if (action === 'toggle-bookmark') {
      event.stopPropagation();
      var rId = target.getAttribute('data-recipe-id');
      if (!rId) return;
      var updated = FridgeMeal.storage.toggleBookmark(rId);
      state.bookmarks = updated.bookmarks;
      renderTopNav();

      if (state.view === 'bookmarks') {
        renderBookmarksView();
      } else if (state.view === 'detail') {
        target.classList.toggle('bookmark-toggle-btn--saved', updated.isSaved);
        target.setAttribute('aria-pressed', String(updated.isSaved));
        target.innerHTML =
          '<span class="bookmark-toggle-btn__star">' +
          (updated.isSaved ? ICONS.starFilled : ICONS.starOutline) +
          '</span><span>' +
          (updated.isSaved ? '보관함에 저장됨' : '보관함에 저장') +
          '</span>';
      } else {
        target.classList.toggle('bookmark-icon-btn--saved', updated.isSaved);
        target.setAttribute('aria-pressed', String(updated.isSaved));
        target.innerHTML = updated.isSaved ? ICONS.starFilled : ICONS.starOutline;
      }

      announce(updated.isSaved ? '보관함에 레시피를 저장했습니다.' : '보관함에서 레시피를 삭제했습니다.');
      return;
    }

    if (action === 'go-home') {
      navigateTo('home');
      return;
    }

    if (action === 'open-bookmarks') {
      navigateTo('bookmarks');
      return;
    }

    if (action === 'open-create') {
      navigateTo('create');
      return;
    }

    if (action === 'edit-custom-recipe') {
      var editId = target.getAttribute('data-recipe-id');
      var rec = getRecipeById(editId);
      if (rec && rec.isCustom) {
        navigateTo('create', { editRecipe: rec });
      }
      return;
    }

    if (action === 'delete-custom-recipe') {
      var delId = target.getAttribute('data-recipe-id');
      if (!delId) return;
      if (!global.confirm('이 나만의 레시피를 삭제할까요?')) return;
      state.customRecipes = FridgeMeal.storage.deleteCustomRecipe(delId);
      state.bookmarks = FridgeMeal.storage.readBookmarks();
      state.recentCooked = FridgeMeal.storage.readRecentCooked();
      announce('나만의 레시피를 삭제했습니다.');
      navigateTo('bookmarks');
      return;
    }

    if (action === 'complete-cooking') {
      var doneId = target.getAttribute('data-recipe-id');
      if (!doneId) return;
      clearAllTimers();
      state.recentCooked = FridgeMeal.storage.recordCookedRecipe(doneId);
      state.cookedThisVisit = true;
      renderDetailView();
      announce('요리 완료! 최근 만든 레시피에 기록했습니다.');
      return;
    }

    if (action === 'go-back') {
      if (state.previousView === 'bookmarks') {
        navigateTo('bookmarks');
      } else if (state.selectedIngredients.size > 0) {
        navigateTo('results');
      } else {
        navigateTo('home');
      }
      return;
    }

    if (action === 'toggle-add-ing-panel') {
      var wasOpenForAdd = state.addIngForm.open && !state.addIngForm.editingOriginalName;
      state.addIngForm.editingOriginalName = null;
      state.addIngForm.name = '';
      state.addIngForm.error = '';
      state.addIngForm.open = !wasOpenForAdd;
      if (state.addIngForm.open) {
        if (state.activeCategory !== 'all') {
          state.addIngForm.category = state.activeCategory;
        }
        renderHomeView();
        var nameEl = document.getElementById('add-ing-name');
        if (nameEl) nameEl.focus();
      } else {
        renderHomeView();
      }
      return;
    }

    if (action === 'edit-custom-ing') {
      event.stopPropagation();
      var targetName = target.getAttribute('data-ingredient');
      if (!targetName) return;
      var allIngs = getAllIngredients();
      var found = null;
      for (var fi = 0; fi < allIngs.length; fi++) {
        if (allIngs[fi].name === targetName) {
          found = allIngs[fi];
          break;
        }
      }
      if (!found) return;
      state.addIngForm.open = true;
      state.addIngForm.editingOriginalName = found.name;
      state.addIngForm.name = found.name;
      state.addIngForm.category = found.category || 'other';
      state.addIngForm.emoji = found.emoji || '🍽️';
      state.addIngForm.error = '';
      renderHomeView();
      var editPanel = document.getElementById('add-ingredient-form');
      if (editPanel && typeof editPanel.scrollIntoView === 'function') {
        editPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      var editInput = document.getElementById('add-ing-name');
      if (editInput) editInput.focus();
      return;
    }

    if (action === 'close-add-ing-panel') {
      state.addIngForm.open = false;
      state.addIngForm.editingOriginalName = null;
      state.addIngForm.name = '';
      state.addIngForm.error = '';
      renderHomeView();
      return;
    }

    if (action === 'add-ing-set-cat') {
      var nextCat = target.getAttribute('data-category');
      if (nextCat) {
        state.addIngForm.category = nextCat;
        state.addIngForm.error = '';
        renderHomeView();
      }
      return;
    }

    if (action === 'add-ing-set-emoji') {
      var nextEmoji = target.getAttribute('data-emoji');
      if (nextEmoji) {
        state.addIngForm.emoji = nextEmoji;
        renderHomeView();
      }
      return;
    }

    if (action === 'delete-custom-ing') {
      event.stopPropagation();
      var delIng = target.getAttribute('data-ingredient');
      if (!delIng) return;
      state.customIngredients = FridgeMeal.storage.deleteCustomIngredient(delIng);
      state.selectedIngredients.delete(delIng);
      if (state.addIngForm.editingOriginalName === delIng) {
        state.addIngForm.open = false;
        state.addIngForm.editingOriginalName = null;
        state.addIngForm.name = '';
        state.addIngForm.error = '';
      }
      renderHomeView();
      announce(delIng + ' 재료를 목록에서 삭제했습니다.');
      return;
    }

    if (action === 'create-with-selected') {
      var prefill = Array.from(state.selectedIngredients);
      navigateTo('create');
      state.draft.mainIngredients = prefill;
      renderCreateView();
      return;
    }

    if (action === 'select-category') {
      var cat = target.getAttribute('data-category');
      if (cat && cat !== state.activeCategory) {
        state.activeCategory = cat;
        renderHomeView();
      }
      return;
    }

    if (action === 'toggle-ingredient') {
      var name = target.getAttribute('data-ingredient');
      if (!name) return;
      if (state.selectedIngredients.has(name)) {
        state.selectedIngredients.delete(name);
      } else {
        state.selectedIngredients.add(name);
      }
      renderHomeView();
      return;
    }

    if (action === 'select-all-ingredients') {
      var targets = getAllIngredients().filter(function (item) {
        return state.activeCategory === 'all' || item.category === state.activeCategory;
      });
      for (var tIdx = 0; tIdx < targets.length; tIdx++) {
        state.selectedIngredients.add(targets[tIdx].name);
      }
      renderHomeView();
      announce('현재 목록의 재료를 모두 선택했습니다.');
      return;
    }

    if (action === 'clear-ingredients') {
      state.selectedIngredients.clear();
      renderHomeView();
      announce('선택한 재료를 모두 초기화했습니다.');
      return;
    }

    if (action === 'select-time') {
      var timeVal = Number(target.getAttribute('data-time'));
      if (timeVal === 10 || timeVal === 20 || timeVal === 30) {
        state.maxCookTime = timeVal;
        renderHomeView();
      }
      return;
    }

    if (action === 'find-recipes') {
      if (state.selectedIngredients.size === 0) return;
      navigateTo('results');
      return;
    }

    if (action === 'open-recipe') {
      var recipeId = target.getAttribute('data-recipe-id');
      var from = target.getAttribute('data-from') || state.view;
      if (recipeId) {
        navigateTo('detail', { recipeId: recipeId, from: from });
      }
      return;
    }

    // Custom recipe draft discrete actions
    if (action === 'draft-set-time') {
      state.draft.cookTime = Number(target.getAttribute('data-time')) || 15;
      state.draft.error = '';
      renderCreateView();
      return;
    }

    if (action === 'draft-toggle-ing') {
      var ing = target.getAttribute('data-ingredient');
      if (!ing) return;
      var idx = state.draft.mainIngredients.indexOf(ing);
      if (idx >= 0) {
        state.draft.mainIngredients.splice(idx, 1);
      } else {
        state.draft.mainIngredients.push(ing);
      }
      state.draft.error = '';
      renderCreateView();
      return;
    }

    if (action === 'draft-set-extra-emoji') {
      var chosenEm = target.getAttribute('data-emoji');
      if (chosenEm) {
        state.draft.extraIngredientEmoji = chosenEm;
        renderCreateView();
      }
      return;
    }

    if (action === 'draft-add-extra-ing') {
      var L = FridgeMeal.storage.LIMITS;
      var chosenEmoji = state.draft.extraIngredientEmoji || '🍽️';
      var rawExtra = String(state.draft.extraIngredientInput || '')
        .split(',')
        .map(function (s) {
          return s.trim().slice(0, L.INGREDIENT_NAME);
        })
        .filter(Boolean);
      for (var i = 0; i < rawExtra.length; i++) {
        FridgeMeal.storage.saveCustomIngredient({
          name: rawExtra[i],
          category: 'other',
          emoji: chosenEmoji
        });
        if (state.draft.mainIngredients.indexOf(rawExtra[i]) === -1) {
          state.draft.mainIngredients.push(rawExtra[i]);
        }
      }
      state.customIngredients = FridgeMeal.storage.readCustomIngredients();
      state.draft.extraIngredientInput = '';
      state.draft.error = '';
      renderCreateView();
      return;
    }

    if (action === 'draft-add-step') {
      state.draft.steps.push({ instruction: '', mins: 0, secs: 0 });
      renderCreateView();
      return;
    }

    if (action === 'draft-remove-step') {
      var sIdx = Number(target.getAttribute('data-step-idx'));
      if (state.draft.steps.length > 1 && sIdx >= 0 && sIdx < state.draft.steps.length) {
        state.draft.steps.splice(sIdx, 1);
        renderCreateView();
      }
      return;
    }

    if (action === 'stop-alarm') {
      stopActiveAlarm();
      return;
    }

    if (
      action === 'timer-start' ||
      action === 'timer-pause' ||
      action === 'timer-resume' ||
      action === 'timer-reset'
    ) {
      var stepNo = Number(target.getAttribute('data-step'));
      var subAction = action.replace('timer-', '');
      handleTimerAction(stepNo, subAction);
    }
  }

  function updateCharCounter(key, len, max) {
    var el = document.querySelector('[data-count-for="' + key + '"]');
    if (el) {
      el.textContent = len + ' / ' + max + '자';
    }
  }

  function handleInput(event) {
    var el = event.target;
    if (!el) return;
    var L = FridgeMeal.storage.LIMITS;

    if (el.hasAttribute('data-add-ing-name')) {
      state.addIngForm.name = el.value;
      updateCharCounter('add-ing-name', el.value.length, L.INGREDIENT_NAME);
      return;
    }

    var field = el.getAttribute('data-draft-field');
    if (field) {
      state.draft[field] = el.value;
      if (field === 'title') updateCharCounter('draft-title', el.value.length, L.RECIPE_TITLE);
      if (field === 'extraIngredientInput') {
        updateCharCounter('draft-extra-ing', el.value.length, L.INGREDIENT_NAME);
      }
      if (field === 'seasoningsText') {
        updateCharCounter('draft-seasonings', el.value.length, L.SEASONINGS_TEXT);
      }
      return;
    }

    var stepTextIdx = el.getAttribute('data-draft-step-text');
    if (stepTextIdx !== null) {
      var i1 = Number(stepTextIdx);
      if (state.draft.steps[i1]) state.draft.steps[i1].instruction = el.value;
      updateCharCounter('step-' + i1, el.value.length, L.STEP_INSTRUCTION);
      return;
    }

    var stepMinIdx = el.getAttribute('data-draft-step-min');
    if (stepMinIdx !== null) {
      var i2 = Number(stepMinIdx);
      if (state.draft.steps[i2]) state.draft.steps[i2].mins = el.value;
      return;
    }

    var stepSecIdx = el.getAttribute('data-draft-step-sec');
    if (stepSecIdx !== null) {
      var i3 = Number(stepSecIdx);
      if (state.draft.steps[i3]) state.draft.steps[i3].secs = el.value;
    }
  }

  function handleSubmit(event) {
    if (event.target && event.target.id === 'custom-recipe-form') {
      handleCustomRecipeSubmit(event);
      return;
    }
    if (event.target && event.target.id === 'add-ingredient-form') {
      event.preventDefault();
      var originalName = state.addIngForm.editingOriginalName;
      var res = originalName
        ? FridgeMeal.storage.updateCustomIngredient(originalName, {
          name: state.addIngForm.name,
          category: state.addIngForm.category,
          emoji: state.addIngForm.emoji
        })
        : FridgeMeal.storage.saveCustomIngredient({
          name: state.addIngForm.name,
          category: state.addIngForm.category,
          emoji: state.addIngForm.emoji
        });
      if (res.error) {
        state.addIngForm.error = res.error;
        renderHomeView();
        return;
      }
      state.customIngredients = res.list;
      if (originalName) {
        state.customRecipes = FridgeMeal.storage.readCustomRecipes();
        if (state.selectedIngredients.has(originalName)) {
          state.selectedIngredients.delete(originalName);
          state.selectedIngredients.add(res.item.name);
        }
      } else {
        state.selectedIngredients.add(res.item.name);
      }
      state.addIngForm.open = false;
      state.addIngForm.editingOriginalName = null;
      state.addIngForm.name = '';
      state.addIngForm.error = '';
      renderHomeView();
      announce(
        originalName
          ? res.item.name + ' 재료 정보를 수정했습니다.'
          : res.item.name + ' 재료를 추가하고 선택했습니다.'
      );
    }
  }

  function handleKeyDown(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    var card = event.target.closest('article[data-action="open-recipe"]');
    if (!card) return;
    if (event.target.closest('button')) return;
    event.preventDefault();
    var recipeId = card.getAttribute('data-recipe-id');
    var from = card.getAttribute('data-from') || state.view;
    if (recipeId) {
      navigateTo('detail', { recipeId: recipeId, from: from });
    }
  }

  // =========================================================================
  // Bootstrap
  // =========================================================================
  function init() {
    dom.topNav = document.getElementById('top-nav');
    dom.main = document.getElementById('app-main');
    dom.footer = document.getElementById('site-footer');
    dom.liveRegion = document.getElementById('live-announcer');

    state.customRecipes = FridgeMeal.storage.readCustomRecipes();
    state.customIngredients = FridgeMeal.storage.readCustomIngredients();
    state.bookmarks = FridgeMeal.storage.readBookmarks();
    state.recentCooked = FridgeMeal.storage.readRecentCooked();

    FridgeMeal.kitchenApi.subscribeWakeLock(function (wlState) {
      state.wakeLock = wlState;
      if (state.view === 'detail') {
        updateWakeLockBadgeInPlace();
      }
    });

    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);
    document.addEventListener('submit', handleSubmit);
    document.addEventListener('keydown', handleKeyDown);
    global.addEventListener('hashchange', handleHashChange);
    global.addEventListener('beforeunload', function (event) {
      if (state.view === 'detail' && hasRunningTimer()) {
        event.preventDefault();
        event.returnValue = '';
      }
    });

    var initial = parseHash();
    if (initial.view === 'detail' && initial.recipeId && getRecipeById(initial.recipeId)) {
      navigateTo('detail', { recipeId: initial.recipeId, from: 'home', fromHash: true });
    } else if (initial.view === 'bookmarks' || initial.view === 'create') {
      navigateTo(initial.view, { fromHash: true });
    } else {
      render();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
