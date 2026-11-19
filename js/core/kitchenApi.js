(function (global) {
  'use strict';

  var FridgeMeal = (global.FridgeMeal = global.FridgeMeal || {});

  var audioCtx = null;
  var wakeLockSentinel = null;
  var shouldHoldWakeLock = false;
  var wakeLockListeners = [];
  var alarmIntervalId = null;
  var alarmCycleCount = 0;
  var MAX_ALARM_CYCLES = 3;

  function notifyWakeLock(active, supported) {
    for (var i = 0; i < wakeLockListeners.length; i++) {
      try {
        wakeLockListeners[i]({ active: active, supported: supported });
      } catch (err) {
        // Ignore subscriber errors
      }
    }
  }

  function getAudioContext() {
    var Ctx = global.AudioContext || global.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) {
      try {
        audioCtx = new Ctx();
      } catch (err) {
        return null;
      }
    }
    return audioCtx;
  }

  // 모바일 브라우저 정책 대응: 사용자 타이머 시작 터치 시 AudioContext 사전 활성화
  function unlockAudio() {
    var ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(function () {});
    }
  }

  // 1회 3연속 차임 + 진동 재생
  function playChimeBurst() {
    var ctx = getAudioContext();
    if (ctx) {
      try {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(function () {});
        }
        var now = ctx.currentTime;
        var notes = [880, 1046.5, 1318.5]; // A5 -> C6 -> E6
        for (var i = 0; i < notes.length; i++) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          var startTime = now + i * 0.18;
          var duration = i === notes.length - 1 ? 0.42 : 0.15;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[i], startTime);

          gain.gain.setValueAtTime(0.001, startTime);
          gain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + duration + 0.02);
        }
      } catch (err) {
        // Ignore audio synthesis failures on restricted devices
      }
    }

    if (global.navigator && typeof global.navigator.vibrate === 'function') {
      try {
        global.navigator.vibrate([220, 100, 220, 100, 320]);
      } catch (err) {
        // Ignore vibration failures
      }
    }
  }

  function stopTimerAlarm() {
    if (alarmIntervalId !== null) {
      global.clearInterval(alarmIntervalId);
      alarmIntervalId = null;
    }
    alarmCycleCount = 0;
    if (global.navigator && typeof global.navigator.vibrate === 'function') {
      try {
        global.navigator.vibrate(0);
      } catch (err) {
        // Ignore
      }
    }
  }

  // 주방 소음에서도 놓치지 않도록 최대 3회(약 2.2초 간격) 반복 알림, 수동 중단 가능
  function startTimerAlarm(onAutoFinished) {
    stopTimerAlarm();
    alarmCycleCount = 1;
    playChimeBurst();

    alarmIntervalId = global.setInterval(function () {
      if (alarmCycleCount >= MAX_ALARM_CYCLES) {
        stopTimerAlarm();
        if (typeof onAutoFinished === 'function') {
          onAutoFinished();
        }
        return;
      }
      alarmCycleCount++;
      playChimeBurst();
    }, 2200);
  }

  function isWakeLockSupported() {
    return Boolean(global.navigator && 'wakeLock' in global.navigator);
  }

  function requestWakeLock() {
    shouldHoldWakeLock = true;
    var supported = isWakeLockSupported();
    if (!supported) {
      notifyWakeLock(false, false);
      return Promise.resolve(false);
    }

    if (wakeLockSentinel) {
      notifyWakeLock(true, true);
      return Promise.resolve(true);
    }

    return global.navigator.wakeLock
      .request('screen')
      .then(function (sentinel) {
        wakeLockSentinel = sentinel;
        sentinel.addEventListener('release', function () {
          wakeLockSentinel = null;
          notifyWakeLock(false, true);
        });
        notifyWakeLock(true, true);
        return true;
      })
      .catch(function () {
        wakeLockSentinel = null;
        notifyWakeLock(false, true);
        return false;
      });
  }

  function releaseWakeLock() {
    shouldHoldWakeLock = false;
    var supported = isWakeLockSupported();
    if (!wakeLockSentinel) {
      notifyWakeLock(false, supported);
      return Promise.resolve();
    }

    var sentinel = wakeLockSentinel;
    wakeLockSentinel = null;
    return sentinel
      .release()
      .catch(function () {})
      .then(function () {
        notifyWakeLock(false, supported);
      });
  }

  function subscribeWakeLock(fn) {
    wakeLockListeners.push(fn);
    return function () {
      wakeLockListeners = wakeLockListeners.filter(function (item) {
        return item !== fn;
      });
    };
  }

  // 탭 전환 후 조리 화면으로 복귀 시 Wake Lock 자동 재요청
  if (global.document) {
    global.document.addEventListener('visibilitychange', function () {
      if (global.document.visibilityState === 'visible' && shouldHoldWakeLock) {
        requestWakeLock();
      }
    });
  }

  FridgeMeal.kitchenApi = {
    unlockAudio: unlockAudio,
    playTimerCompleteSound: playChimeBurst,
    startTimerAlarm: startTimerAlarm,
    stopTimerAlarm: stopTimerAlarm,
    isWakeLockSupported: isWakeLockSupported,
    requestWakeLock: requestWakeLock,
    releaseWakeLock: releaseWakeLock,
    subscribeWakeLock: subscribeWakeLock
  };
})(window);
