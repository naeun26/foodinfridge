(function (global) {
  'use strict';

  var FridgeMeal = global.FridgeMeal;

  // =========================================================================
  // Inline SVG Icons (Crisp stroke-based icons + Editorial radial spike mark)
  // =========================================================================
  var ICONS = {
    spikeMark:
      '<svg class="brand-mark__glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M12 2.5V21.5M2.5 12H21.5M5.28 5.28L18.72 18.72M18.72 5.28L5.28 18.72" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
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
      '</svg>'
  };

  // =========================================================================
  // Application State
  // =========================================================================
  var state = {
    view: 'home', // 'home' | 'results' | 'detail' | 'bookmarks'
    previousView: 'home',
    selectedIngredients: new Set(),
    activeCategory: 'all',
    maxCookTime: 20, // PRD 기본값: 20분 이내
    currentRecipeId: null,
    bookmarks: [],
    wakeLock: {
      active: false,
      supported: FridgeMeal.kitchenApi.isWakeLockSupported()
    },
    timers: new Map(), // stepNo -> { totalSec, remainingMs, status, endsAt }
    tickerId: null
  };

  // DOM References
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

  function getRecipeById(id) {
    var recipes = FridgeMeal.RECIPES;
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].id === id) return recipes[i];
    }
    return null;
  }

  function isBookmarked(recipeId) {
    return state.bookmarks.indexOf(recipeId) !== -1;
  }

  // =========================================================================
  // Timer Management (Drift-free Date.now() delta)
  // =========================================================================
  function clearAllTimers() {
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
          status: 'idle', // 'idle' | 'running' | 'paused' | 'done'
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
      FridgeMeal.kitchenApi.playTimerCompleteSound();
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
  // Navigation & Lifecycle
  // =========================================================================
  function navigateTo(view, options) {
    options = options || {};
    var leavingDetail = state.view === 'detail' && view !== 'detail';
    var enteringDetail = view === 'detail';

    if (leavingDetail) {
      clearAllTimers();
      FridgeMeal.kitchenApi.releaseWakeLock();
    }

    if (view === 'detail') {
      var recipe = getRecipeById(options.recipeId);
      if (!recipe) {
        navigateTo('home');
        return;
      }
      state.previousView = options.from || (state.view === 'detail' ? state.previousView : state.view);
      state.currentRecipeId = recipe.id;
      initTimersForRecipe(recipe);
    } else {
      state.currentRecipeId = null;
    }

    state.view = view;
    render();
    global.scrollTo(0, 0);

    if (enteringDetail) {
      FridgeMeal.kitchenApi.requestWakeLock();
    }
  }

  // =========================================================================
  // Rendering: Top Nav & Footer
  // =========================================================================
  function renderTopNav() {
    var count = state.bookmarks.length;
    var isBookmarksActive = state.view === 'bookmarks';

    dom.topNav.innerHTML =
      '<div class="container top-nav__inner">' +
      '  <button type="button" class="brand-mark" data-action="go-home" aria-label="냉장고 털이 한 끼 홈으로 이동">' +
      ICONS.spikeMark +
      '    <span class="brand-mark__wordmark">냉장고 털이 한 끼</span>' +
      '    <span class="brand-mark__sub">초간단 자취 레시피</span>' +
      '  </button>' +
      '  <button type="button" class="nav-bookmark-btn ' +
      (isBookmarksActive ? 'nav-bookmark-btn--active' : '') +
      '" data-action="open-bookmarks" aria-label="내 레시피 보관함 (' +
      count +
      '개)">' +
      '    <span class="nav-bookmark-btn__star">' +
      ICONS.starFilled +
      '</span>' +
      '    <span>보관함</span>' +
      '    <span class="nav-bookmark-btn__count" data-bookmark-count>' +
      count +
      '</span>' +
      '  </button>' +
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
  // Rendering: Screen 1 — Ingredient & Cook Time Selection
  // =========================================================================
  function getCategorySelectedCount(categoryId) {
    if (categoryId === 'all') return state.selectedIngredients.size;
    var count = 0;
    var list = FridgeMeal.INGREDIENTS;
    for (var i = 0; i < list.length; i++) {
      if (list[i].category === categoryId && state.selectedIngredients.has(list[i].name)) {
        count++;
      }
    }
    return count;
  }

  function renderHomeView() {
    var selectedCount = state.selectedIngredients.size;
    var visibleIngredients = FridgeMeal.INGREDIENTS.filter(function (item) {
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
          item.emoji +
          '</span>' +
          '    <span class="ingredient-card__check" aria-hidden="true">' +
          ICONS.check +
          '</span>' +
          '  </div>' +
          '  <div class="ingredient-card__bottom">' +
          '    <span class="ingredient-card__name">' +
          escapeHtml(item.name) +
          '</span>' +
          '    <span class="ingredient-card__cat">' +
          '      <span class="ingredient-card__cat-dot" aria-hidden="true"></span>' +
          escapeHtml(item.categoryLabel) +
          '    </span>' +
          '  </div>' +
          '</button>'
        );
      })
      .join('');

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
      '    <div class="hero-eyebrow caption-uppercase">' +
      '      <span class="hero-eyebrow__dot" aria-hidden="true"></span>' +
      '      <span>로그인 없이 바로 시작하는 1인 가구 한 끼</span>' +
      '    </div>' +
      '    <h1 class="display-lg">냉장고 속 남은 재료로,<br/>오늘의 한 끼를 바로 꺼내세요.</h1>' +
      '    <p class="body-md hero-subtitle">가진 재료를 개수 제한 없이 누르고 조리 시간만 고르면, 재료를 가장 많이 소진할 수 있는 초간단 레시피와 단계별 타이머를 바로 열어드립니다.</p>' +
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
      ' / ' +
      FridgeMeal.INGREDIENTS.length +
      ' 선택됨</span>' +
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
      '      <span class="caption" style="color: var(--color-ink);">선택 재료 ' +
      selectedCount +
      '개 · ' +
      state.maxCookTime +
      '분 이내</span>' +
      '      <span class="body-sm">' +
      escapeHtml(summaryText) +
      '</span>' +
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

    var matchBadgeHtml = '';
    if (fromView === 'results') {
      matchBadgeHtml =
        '<span class="badge-coral">내 재료 ' +
        entry.matchCount +
        '개 일치</span>' +
        (entry.missingCount === 0 ? '<span class="badge-success">추가 재료 없음</span>' : '');
    } else {
      matchBadgeHtml = '<span class="badge-pill">저장된 레시피</span>';
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
      FridgeMeal.RECIPES,
      selectedArr,
      state.maxCookTime
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

    var listHtml = result.items
      .map(function (entry, idx) {
        return renderRecipeCard(entry, idx, 'results');
      })
      .join('');

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
      '    <p class="body-sm" style="margin-top: 6px;">보유 재료 일치 개수 → 추가 재료 적은 순 → 조리 시간 빠른 순으로 정리했어요.</p>' +
      '    <div class="selected-summary-bar">' +
      '      <span class="selected-summary-bar__label">선택 조건</span>' +
      '      <span class="badge-coral">' +
      state.maxCookTime +
      '분 이내</span>' +
      selectedChipsHtml +
      '    </div>' +
      '  </section>' +
      fallbackHtml +
      '  <section class="recipe-list" aria-label="추천 레시피 목록">' +
      listHtml +
      '  </section>' +
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

    dom.main.innerHTML =
      '<div class="container container--narrow">' +
      '  <section class="detail-header">' +
      '    <div class="detail-header__controls">' +
      '      <button type="button" class="btn-secondary" data-action="go-back">' +
      ICONS.arrowLeft +
      '<span>' +
      backLabel +
      '</span></button>' +
      '      <button type="button" class="bookmark-toggle-btn ' +
      (saved ? 'bookmark-toggle-btn--saved' : '') +
      '" data-action="toggle-bookmark" data-recipe-id="' +
      recipe.id +
      '" aria-pressed="' +
      saved +
      '">' +
      '        <span class="bookmark-toggle-btn__star">' +
      (saved ? ICONS.starFilled : ICONS.starOutline) +
      '</span>' +
      '        <span>' +
      (saved ? '보관함에 저장됨' : '보관함에 저장') +
      '</span>' +
      '      </button>' +
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
      '  </section>' +
      '</div>' +
      '<section class="cooking-band" aria-labelledby="cooking-steps-heading">' +
      '  <div class="container container--narrow">' +
      '    <div class="cooking-band__header">' +
      '      <div>' +
      '        <h2 id="cooking-steps-heading" class="cooking-band__title">단계별 조리 가이드 &amp; 타이머</h2>' +
      '        <p class="cooking-band__hint">주방에서 손이 젖어 있어도 쉽게 누를 수 있게 타이머 버튼을 크게 배치했어요. 종료 시 알림음이 울립니다.</p>' +
      '      </div>' +
      '    </div>' +
      '    <div class="steps-stack">' +
      stepsHtml +
      '    </div>' +
      '  </div>' +
      '</section>';
  }

  // =========================================================================
  // Rendering: Screen 4 — Bookmarks View
  // =========================================================================
  function renderBookmarksView() {
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

    var bodyHtml = '';
    if (savedRecipes.length === 0) {
      bodyHtml =
        '<div class="empty-state-card">' +
        '  <div class="empty-state-card__icon" aria-hidden="true">' +
        ICONS.starOutline +
        '</div>' +
        '  <h2 class="display-sm">아직 보관한 레시피가 없어요</h2>' +
        '  <p class="body-md empty-state-card__text">아직 보관한 레시피가 없어요. 마음에 드는 레시피의 별표를 눌러 저장해 보세요!</p>' +
        '  <button type="button" class="btn-primary" data-action="go-home">재료 고르러 가기</button>' +
        '</div>';
    } else {
      bodyHtml =
        '<section class="recipe-list" aria-label="보관한 레시피 목록">' +
        savedRecipes
          .map(function (entry, idx) {
            return renderRecipeCard(entry, idx, 'bookmarks');
          })
          .join('') +
        '</section>';
    }

    dom.main.innerHTML =
      '<div class="container">' +
      '  <section class="page-header">' +
      '    <div class="page-header__back-row">' +
      '      <button type="button" class="btn-secondary" data-action="go-home">' +
      ICONS.arrowLeft +
      '<span>재료 고르러 가기</span></button>' +
      '      <span class="badge-pill mono">저장됨 ' +
      savedRecipes.length +
      '개</span>' +
      '    </div>' +
      '    <h1 class="display-md">내 레시피 보관함</h1>' +
      '    <p class="body-sm" style="margin-top: 6px;">브라우저에 자동 저장되어 재방문 시에도 재료 선택 없이 바로 꺼내 조리할 수 있어요.</p>' +
      '  </section>' +
      bodyHtml +
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
    }
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

    state.bookmarks = FridgeMeal.storage.readBookmarks();

    FridgeMeal.kitchenApi.subscribeWakeLock(function (wlState) {
      state.wakeLock = wlState;
      if (state.view === 'detail') {
        updateWakeLockBadgeInPlace();
      }
    });

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
