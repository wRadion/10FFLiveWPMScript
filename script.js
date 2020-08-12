// ==UserScript==
// @name         10FF Live WPM EN/FR
// @namespace    https://www.wradion.dev
// @version      2.3
// @description  Live WPM for 10FF English/French tests
// @author       wRadion
// @match        *://10fastfingers.com/typing-test/*
// @match        *://10fastfingers.com/widget*
// @match        *://10fastfingers.com/competition/*
// @match        *://10fastfingers.com/advanced-typing-test/*
// @grant        none
// ==/UserScript==
 
const style = window.getComputedStyle(document.getElementById('words'), null);
const bg = style.getPropertyValue('background-color');
const border = style.getPropertyValue('border');
 
const commonStyle = 'display: inline-block; background: ' + bg + '; border-radius: 4px 4px 0 0; border: ' + border + '; margin: 0 4px; padding: 8px 12px 12px 12px;';
const smallStyle = 'font-size: 10px; margin-bottom: 6px;';
 
(function() {
    'use strict';
 
  $("#words").before('<h3 align="center" style="margin-bottom: -1px">' +
                     '<div style="' + commonStyle + '"><div style="' + smallStyle + '">Speed</div><span id="live-wpm"></span> <strong>WPM</strong></div>' +
                     '<div style="' + commonStyle + '"><div style="' + smallStyle + '">Keystrokes</div><span id="live-kw" class="correct"></span> | <span id="live-kc" class="wrong"></span></div>' +
                     '<div style="' + commonStyle + '"><div style="' + smallStyle + '">Score</div><span id="live-raw"></span> <strong>WPM</strong></div>' +
                     '</h3>');
 
  /* VARIABLES */
  var inter, timer, durationRatio, start, keystrokesCorrect, keystrokesWrong, index;
 
 
  /* FUNCTIONS */
  function getDuration() {
    const durParam = window.location.search.match(/dur=(\d+)/);
    if (durParam) {
      return parseInt(durParam[1]);
    }
 
    const baseTimer = document.getElementById("timer").innerText.split(':').map((i) => parseInt(i));
    return baseTimer[0] * 60 + baseTimer[1];
  }
 
  function updateWpm(wpm) { document.getElementById("live-wpm").innerText = wpm; }
  function updateKs(kw, kc) { document.getElementById("live-kw").innerText = kw; document.getElementById("live-kc").innerText = kc; }
  function updateRaw(raw) { document.getElementById("live-raw").innerText = raw; }
  function getKeystrokes(word) { return (word.match(/[a-zéàùç']/g) || []).length + (word.match(/[A-Zâêîôû]/g) || []).length * 2; }
 
  function reset() {
    if (inter) {
      clearInterval(inter);
    }
    inter = null;
    timer = getDuration();
    durationRatio = 60 / timer;
    start = null;
    keystrokesCorrect = 0;
    keystrokesWrong = 0;
    index = 0;
    updateWpm('?');
    updateKs('?', '?');
    updateRaw('?');
    document.getElementById("inputfield").focus();
  }
 
  /* EVENT HANDLERS */
  // F5
  document.onkeydown = function(e) { if (e.keyCode === 116) { reset(); } };
  // Reload Button
  document.getElementById("reload-btn").onclick = function(e) { reset(); };
  // Apply Settings Button (Custom Test)
  const applySettingsBtn = document.getElementById("apply-settings");
  if (applySettingsBtn) {
    applySettingsBtn.onclick = function(e) { reset(); };
  }
 
  document.getElementById("inputfield").oninput = function(e) {
    if (start === null) {
      start = Date.now();
      updateWpm(0);
      updateKs(0, 0);
      updateRaw(0);
 
      inter = setInterval(() => {
        if (--timer === 0) {
          start = undefined;
          clearInterval(inter);
        }
      }, 1000);
    }
  };
 
  document.getElementById("inputfield").onkeyup = function(e) {
    if (start === undefined) return;
 
    if (e.keyCode === 32) {
      const word = $(".correct[wordnr]")[index++];
 
      if (word) {
        keystrokesCorrect += getKeystrokes(word.innerText) + 1;
      }
      else {
        --index;
        const wrongWords = $(".wrong[wordnr]");
        keystrokesWrong += (wrongWords[wrongWords.length - 1].innerText).length;
      }
 
      const tmp = keystrokesCorrect / 5;
      updateWpm(((tmp * 60 * 1000) / (Date.now() - start)).toFixed(2));
      updateKs(keystrokesCorrect, keystrokesWrong);
      updateRaw((tmp * durationRatio).toFixed(2));
    }
  };
 
  /* CODE */
  reset();
})();
