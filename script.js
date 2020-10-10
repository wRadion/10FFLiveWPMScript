// ==UserScript==
// @name         10FF Live WPM
// @namespace    https://github.com/wRadion/10FFLiveWPMScript
// @version      3.0
// @description  Live WPM for 10FF tests
// @author       wRadion
// @match        *://10fastfingers.com/typing-test/*
// @match        *://10fastfingers.com/widget*
// @match        *://10fastfingers.com/competition/*
// @match        *://10fastfingers.com/advanced-typing-test/*
// @grant        none
// ==/UserScript==

/*******************
 ** CUSTOMISATION **
 *******************/

const alignment = 'center'; // left | center | right
const speedVisible = true; // true | false
const keystrokesVisible = true; // true | false
const scoreVisible = true; // true | false

/*******************/

const style = window.getComputedStyle(document.getElementById('words'), null);

const divStyle =
      'font-size: 22px;' +
      'line-height: 18px;' +
      'margin-bottom: -1px;';

const commonStyle =
      'background: ' + style.getPropertyValue('background-color') + ';' +
      'border-radius: 4px 4px 0 0;' +
      'border: ' + style.getPropertyValue('border') + ';' +
      'margin: 0 4px;' +
      'padding: 8px 12px 12px 12px;';

const smallStyle =
      'text-align: center;' +
      'font-size: 10px;' +
      'margin-bottom: 6px;';

(function() {
    'use strict';

  const html =
        '<div align="' + alignment + '" style="' + divStyle + '">' +
          '<div style="' + commonStyle + 'display: ' + (speedVisible ? 'inline-block' : 'none') + ';"><div style="' + smallStyle + '">Speed</div><span id="live-wpm"></span> <strong>WPM</strong></div>' +
          '<div style="' + commonStyle + 'display: ' + (keystrokesVisible ? 'inline-block' : 'none') + ';"><div style="' + smallStyle + '">Keystrokes</div><span id="live-kw" class="correct"></span> | <span id="live-kc" class="wrong"></span></div>' +
          '<div style="' + commonStyle + 'display: ' + (scoreVisible ? 'inline-block' : 'none') + ';"><div style="' + smallStyle + '">Score</div><span id="live-raw"></span> <strong>WPM</strong></div>' +
        '</div>';
  $('#words').before(html);

  /* VARIABLES */
  var language,
      inter,
      timer,
      durationRatio,
      startTime,
      keystrokesCorrect,
      keystrokesWrong,
      index;

  /* SETUP */
  const languageId = parseInt($('#speedtest-id').attr('value'));
  language = [
    null, 'english', 'german', 'french', 'portugese', 'spanish', 'indonesian', 'turkish', 'vietnamese', 'polish', 'romanian', 'malaysian', 'norwegian', 'persian', 'hungarian', 'chinese_traditional', 'chinese_simplified',
    'danish', 'dutch', 'swedish', 'italian', 'finnish', 'serbian', 'catalan', 'filipino', 'croatian', 'russian', 'arabic', 'bulgarian', 'japanese', 'albanian', 'korean', 'greek', 'czech', 'estonian', 'latvian', 'hebrew',
    'urdu', 'galician', 'lithuanian', 'georgian', 'armenian', 'kurdish', 'azerbaijani', 'hindi', 'slovak', 'slovenian', null, 'icelandic', null, 'thai', 'pashto', 'esperanto', 'ukrainian', 'macedonian', 'malagasy', 'bengali'
  ][languageId];

  /* FUNCTIONS */
  function getDuration() {
    const durParam = window.location.search.match(/dur=(\d+)/);
    if (durParam) return parseInt(durParam[1]);

    const baseTimer = document.getElementById("timer").innerText.split(':').map((i) => parseInt(i));
    return baseTimer[0] * 60 + baseTimer[1];
  }

  function updateWpm(wpm) { document.getElementById("live-wpm").innerText = wpm; }
  function updateKs(kw, kc) { document.getElementById("live-kw").innerText = kw; document.getElementById("live-kc").innerText = kc; }
  function updateRaw(raw) { document.getElementById("live-raw").innerText = raw; }
<<<<<<< HEAD

  function getKeystrokes(word) {
    var oneKeystroke = null;
    var twoKeystrokes = null;
    var threeKeystrokes = null;
    var fourKeystrokes = null;
    var fiveKeystrokes = null;

    switch (language) {
      /******************************
       ** KEYSTROKES CUSTOMISATION **
       ******************************/

      case 'danish':
        oneKeystroke = /[^A-ZÆØÅ]/g;
        twoKeystrokes = /[A-ZÆØÅ]/g;
        break;

      case 'dutch':
        oneKeystroke = /[^A-Zé]/g;
        twoKeystrokes = /[A-Zé]/g;
        break;

      case 'esperanto':
        oneKeystroke = /[^A-Zĉŭŝĝĵĥ]/g;
        twoKeystrokes = /[A-Zĉŭŝĝĵĥ]/g;
        break;

      case 'french':
        oneKeystroke = /[a-zéèàùç'-]/g;
        twoKeystrokes = /[A-Zâêîôû]/g;
        threeKeystrokes = /[ÂÊÎÔÛäëïüÿÄËÏÜ]/g;
        fourKeystrokes = /[ÀÈÙÇÉ]/g;
        fiveKeystrokes = /[ŒœŸ]/g;
        break;

      case 'german':
        oneKeystroke = /[a-zäöüß]/g;
        twoKeystrokes = /[A-ZÄÖÜ]/g;
        break;

      case 'italian':
        oneKeystroke = /[^A-Zé]/g;
        twoKeystrokes = /[A-Zé]/g;
        break;

      case 'latvian':
        oneKeystroke = /[^A-Zēūīāšģķļžčņ]/g;
        twoKeystrokes = /[A-Zēūīāšģķļžčņ]/g;
        break;

      case 'lithuanian':
        oneKeystroke = /[^A-Ząčęėįšųūž]/g;
        twoKeystrokes = /A-Ząčęėįšųūž]/g;
        break;

      case 'persian':
        oneKeystroke = /[^ژآء ّ َ ُ]/g;
        twoKeystrokes = /[ژآء ّ َ ُ]/g;
        break;

      case 'polish':
        oneKeystroke = /[^A-Ząćęłńóśźż]/g;
        twoKeystrokes = /[A-Ząćęłńóśźż]/g;
        break;

      case 'romanian':
        oneKeystroke = /[^ăâîșț]/g;
        twoKeystrokes = /[ăâîșț]/g;
        break;

      case 'turkish':
        oneKeystroke = /[^A-ZÖÜÇŞĞİ]/g;
        twoKeystrokes = /[A-ZÖÜÇŞĞİ]/g;
        break;

      case 'urdu':
        oneKeystroke = /[ء آ ؤ ئ ث چ خ ذ ڈ ز ڑ ژ ض ظ گ ں ۂ ۃ ي ۓ]/g;
        twoKeystrokes = /[ا ب پ ت ٹ ج ح د ر س ش ص ط ع غ ف ق ک ل م ن ھ ہ و ی ے]/g;
        break;

      default: // english, indonesian, malaysian, filipino, malagasy
        oneKeystroke = /[a-z'-]/g;
        twoKeystrokes = /[A-Z]/g;
        break;

      /******************************/
    }
=======
  function getKeystrokes(word) {
    return (word.match(/[a-zéèàùç'ا ب پ ت ٹ ج ح د ر س ش ص ط ع غ ف ق ک ل م ن ھ ہ و ی ے]/g) || []).length +
      (word.match(/[A-Zâêîôûء آ ؤ ئ ث چ خ ذ ڈ ز ڑ ژ ض ظ گ ں ۂ ۃ ي ۓ]/g) || []).length * 2;
>>>>>>> afa31212adfe65cd50102b1c36b434ba212926bb
  }

  function reset() {
    if (inter) clearInterval(inter);
    inter = null;
    timer = getDuration();
    durationRatio = 60 / timer;
    startTime = null;
    keystrokesCorrect = 0;
    keystrokesWrong = 0;
    index = 0;
    updateWpm('?');
    updateKs('?', '?');
    updateRaw('?');
    document.getElementById("inputfield").focus();
  }

  function stop() {
    if (inter) clearInterval(inter);
    startTime = undefined;
  }

  function start() {
      startTime = Date.now();
      updateWpm(0);
      updateKs(0, 0);
      updateRaw(0);
      inter = setInterval(() => { if (--timer === 0) stop(); }, 1000);
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
    if (startTime === null) start();
  };

  document.getElementById("inputfield").onkeyup = function(e) {
    if (startTime === undefined) return;

    if (document.getElementById('words').style.display === 'none') {
      stop();
      return;
    }

    if (e.keyCode === 32) {
      const word = $(".correct[wordnr]")[index++];

      if (word) {
        keystrokesCorrect += getKeystrokes(word.innerText) + 1;
      }
      else {
        --index;
        const wrongWords = $(".wrong[wordnr]");
        keystrokesWrong += getKeystrokes(wrongWords[wrongWords.length - 1].innerText) + 1;
      }

      const tmp = keystrokesCorrect / 5;
      updateWpm(((tmp * 60 * 1000) / (Date.now() - startTime)).toFixed(2));
      updateKs(keystrokesCorrect, keystrokesWrong);
      updateRaw((tmp * durationRatio).toFixed(2));
    }
  };

  /* CODE */
  reset();
})();
