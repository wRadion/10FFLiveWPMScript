// ==UserScript==
// @name         10FF Live WPM
// @namespace    https://github.com/wRadion/10FFLiveWPMScript
// @version      4.10
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
const wordsVisible = true; // true | false
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
          '<div style="' + commonStyle + 'display: ' + (keystrokesVisible ? 'inline-block' : 'none') + ';"><div style="' + smallStyle + '">Keystrokes</div><span id="live-kc" class="correct"></span> | <span id="live-kw" class="wrong"></span></div>' +
          '<div style="' + commonStyle + 'display: ' + (wordsVisible ? 'inline-block' : 'none') + ';"><div style="' + smallStyle + '">Words</div><span id="live-wc" class="correct"></span> | <span id="live-ww" class="wrong"></span></div>' +
          '<div style="' + commonStyle + 'display: ' + (scoreVisible ? 'inline-block' : 'none') + ';"><div style="' + smallStyle + '">Score</div><span id="live-raw"></span> <strong>WPM</strong></div>' +
        '</div>';
  let infoBar = document.createElement('div');
  infoBar.innerHTML = html;
  document.querySelector('#words').before(infoBar);

  /* VARIABLES */
  var language,
      inter,
      timer,
      durationRatio,
      startTime,
      keystrokesCorrect,
      keystrokesWrong,
      wordsCorrect,
      wordsWrong,
      index;

  /* SETUP */
  const languageId = parseInt(document.querySelector('#speedtest-id').attributes.value.value);
  language = [
    null, 'english', 'german', 'french', 'portuguese', 'spanish', 'indonesian', 'turkish', 'vietnamese', 'polish', 'romanian', 'malaysian', 'norwegian', 'persian', 'hungarian', 'chinese_traditional', 'chinese_simplified',
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
  function updateKs(kc, kw) { document.getElementById("live-kc").innerText = kc; document.getElementById("live-kw").innerText = kw; }
  function updateWs(wc, ww) { document.getElementById("live-wc").innerText = wc; document.getElementById("live-ww").innerText = ww; }
  function updateRaw(raw) { document.getElementById("live-raw").innerText = raw; }

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

      case 'albanian':
        oneKeystroke = /[a-zçë]/g;
        twoKeystrokes = /[A-ZÇË]/g;
        break;

      case 'armenian':
        oneKeystroke = /աբգդեևզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ/g;
        twoKeystrokes = /ԷԿ/g;
        break;

      case 'azerbaijani':
        oneKeystroke = /[a-zçəğıöşü]/g;
        twoKeystrokes = /[A-ZÇƏĞIİÖŞÜ]/g;
        break;

      case 'bulgarian':
        oneKeystroke = /[абвгдежзийклмнопрстуфхцчшщъюя]/g;
        twoKeystrokes = /[Б]/g;
        break;

      case 'catalan':
        oneKeystroke = /[a-zç]/g;
        twoKeystrokes = /[A-ZÇàèòéíóú]/g;
        threeKeystrokes = /ÀÈÒÉÍÓÚïü/g;
        fourKeystrokes = /[ÏÜ]/g;
        break;

      case 'croatian':
        oneKeystroke = /[a-zćčđšž]/g;
        twoKeystrokes = /[A-ZĆČĐŠŽ]/g;
        break;

      case 'czech':
        oneKeystroke = /[a-záéěíščřúůýž]/g;
        twoKeystrokes = /[A-Zó]/g;
        threeKeystrokes = /[ďťňÁÉÍÓÚÝ]/g;
        fourKeystrokes = /[ĚŠČŘŽŇŤĎŮ]/g;
        break;

      case 'danish':
        oneKeystroke = /[a-zåæø]/g;
        twoKeystrokes = /[A-ZÅÆØ]/g;
        break;

      case 'dutch':
        oneKeystroke = /[a-z']/g;
        twoKeystrokes = /[A-Zé]/g;
        break;

      case 'esperanto':
        oneKeystroke = /[a-z]/g;
        twoKeystrokes = /[A-Zĉĝĥĵŝŭ]/g;
        break;

      case 'estonian':
        oneKeystroke = /[a-zõäöü]/g;
        twoKeystrokes = /[A-ZÕÄÖÜ]/g;
        break;

      case 'finnish':
        oneKeystroke = /[a-zäö]/g;
        twoKeystrokes = /[A-ZÄÖ]/g;
        break;

      case 'french':
        oneKeystroke = /[a-zàçéèù'-]/g;
        twoKeystrokes = /[A-Zâêîôû]/g;
        threeKeystrokes = /[ÂÊÎÔÛäëïüÿÄËÏÜ]/g;
        fourKeystrokes = /[ÀÈÙÇÉ]/g;
        fiveKeystrokes = /[ŒœŸ]/g;
        break;

      case 'galician':
        oneKeystroke = /[a-zñ]/g;
        twoKeystrokes = /[A-ZáéíóúÑ]/g;
        threeKeystrokes = /[ÁÉÍÓÚ]/g;
        break;

      case 'german':
        oneKeystroke = /[a-zäöüß]/g;
        twoKeystrokes = /[A-ZÄÖÜ]/g;
        break;

      case 'greek':
        oneKeystroke = /[αβγδεζηθικλμνξοπρσςτυφχψω]/g;
        twoKeystrokes = /[άήίώόύέΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]/g;
        threeKeystrokes = /[ϊϋΐΰΆΉΊΏΌΎΈ]/g;
        fourKeystrokes = /[ΪΫ]/g;
        break;

      case 'hebrew':
         oneKeystroke = /[אבגדהוזחטיכלמנסעפצקרשת]/g;
         break;

      case 'hungarian':
        oneKeystroke = /[a-záéíóöőúüű]/g;
        twoKeystrokes = /[A-ZÁÉÍÓÖŐÚÜŰ]/g;
        break;

      case 'icelandic':
        oneKeystroke = /[a-zðþæö]/g;
        twoKeystrokes = /[A-ZÐÞÆÖáéúíóý]/g;
        threeKeystrokes = /[ÁÉÍÓÚÝ]/g;
        break;

      case 'italian':
        oneKeystroke = /[a-zàèìòù]/g;
        twoKeystrokes = /[A-Zçé]/g;
        break;

      case 'latvian':
        oneKeystroke = /[a-z]/g;
        twoKeystrokes = /[A-Zāčēģīķļņšūž]/g;
        threeKeystrokes = /[ĀČĒĢĪĶĻŅŠŪŽ]/g;
        break;

      case 'lithuanian':
        oneKeystroke = /[a-ząčęėįšųūž]/g;
        twoKeystrokes = /[A-ZĄČĘĖĮŠŲŪŽ]/g;
        break;

      case 'malagasy':
        oneKeystroke = /[a-zà'-]/g;
        twoKeystrokes = /[A-Z]/g;
        break;

      case 'norwegian':
        oneKeystroke = /[a-zåæø]/g;
        twoKeystrokes = /[A-ZÅÆØ]/g;
        break;

      case 'persian':
        oneKeystroke = /[ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی]/g;
        twoKeystrokes = /[ژ آ ء ّ َ ُ ِ]/g;
        break;

      case 'polish':
        oneKeystroke = /[a-z]/g;
        twoKeystrokes = /[A-Ząćęłńóśźż]/g; // Some should be one
        threeKeystrokes = /[ĄĆĘŁŃÓŚŹŻ]/g; // Some should be two
        break;

      case 'portuguese':
        oneKeystroke = /[a-zç]/g;
        twoKeystrokes = /[A-ZÇáãéíóõú]/g;
        threeKeystrokes = /[ÁÃÀÂÉÊÍÓÕÔÚàâêô]/g;
        break;

      case 'romanian':
        oneKeystroke = /[a-z]/g;
        twoKeystrokes = /[A-Zăâîșț]/g; // Should be one
        break;
                
      case 'russian':
        oneKeystroke = /[явертыуиопшщэючасдфгхйклзьцжбнм\-]/g;
        twoKeystrokes = /[ЮёЁъЪЧЯВЕРТЫУИОПШЩЭАСДФГХЙКЛЗЬЦЖБНМ]/g; // phonetic layout
        break;
                
      case 'serbian':
        oneKeystroke = /[a-zćčđšž]/g;
        twoKeystrokes = /[A-ZĆČĐŠŽ]/g;
        break;

      case 'slovak':
        oneKeystroke = /[a-záäčéíľňôšťúýž]/g;
        twoKeystrokes = /[A-Z]/g;
        threeKeystrokes = /[ďĎÁČÉÍĽŇŠŤÚÝŽ]/g;
        fourKeystrokes = /[ÄÔ]/g;
        break;

      case 'slovenian':
        oneKeystroke = /[a-zčšž]/g;
        twoKeystrokes = /[A-ZČŠŽ]/g;
        break;

      case 'spanish':
        oneKeystroke = /[a-zñ]/g;
        twoKeystrokes = /[A-ZáéíóúÑ]/g;
        threeKeystrokes = /[ÁÉÍÓÚü]/g;
        fourKeystrokes = /[Ü]/g;
        break;

      case 'swedish':
        oneKeystroke = /[a-zåäö]/g;
        twoKeystrokes = /[A-ZÅÄÖ]/g;
        break;

      case 'turkish':
        oneKeystroke = /[a-zçğıöşü]/g;
        twoKeystrokes = /[A-ZÇĞIİÖŞÜ]/g;
        break;

      case 'ukrainian':
        oneKeystroke = /[абвгдеєжзиійклмнопрстуфхцчшщьюя]/g;
        break;

      case 'urdu':
        oneKeystroke = /[ء آ ؤ ئ ث چ خ ذ ڈ ز ڑ ژ ض ظ گ ں ۂ ۃ ي ۓ]/g;
        twoKeystrokes = /[ا ب پ ت ٹ ج ح د ر س ش ص ط ع غ ف ق ک ل م ن ھ ہ و ی ے]/g;
        break;

      case 'thai': // temporary fix, count all chars as 1 keystroke
        oneKeystroke = /./g;
        break;

      case 'vietnamese':
        oneKeystroke = /[a-z]/g;
        twoKeystrokes = /[A-Zăâáàạảãđéèẻẽẹêíìỉĩịôơóòỏõọưúùủũụýỳỷỹỵ]/g;
        threeKeystrokes = /[ắằặẳẵấầậẩẫếềểễệốồổỗộớờởỡợứừửữự]/g;
        break;

      default: // english, indonesian, malaysian, filipino
        oneKeystroke = /[a-z'\-\.]/g;
        twoKeystrokes = /[A-Z]/g;
        break;

      /******************************/
    }

    const one = (word.match(oneKeystroke) || []).length;
    const two = (word.match(twoKeystrokes) || []).length * 2;
    const three = (word.match(threeKeystrokes) || []).length * 3;
    const four = (word.match(fourKeystrokes) || []).length * 4;
    const five = (word.match(fiveKeystrokes) || []).length * 5;

    return one + two + three + four + five;
  }

  function reset() {
    if (inter) clearInterval(inter);
    inter = null;
    timer = getDuration();
    durationRatio = 60 / timer;
    startTime = null;
    keystrokesCorrect = 0;
    keystrokesWrong = 0;
    wordsCorrect = 0;
    wordsWrong = 0;
    index = 0;
    updateWpm('?');
    updateKs('?', '?');
    updateWs('?', '?');
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
    updateWs(0, 0);
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
      const word = document.querySelectorAll(".correct[wordnr]")[index++];

      if (word) {
        keystrokesCorrect += getKeystrokes(word.innerText) + 1;
        wordsCorrect += 1;
      } else {
        --index;
        const wrongWords = document.querySelectorAll(".wrong[wordnr]");
        keystrokesWrong += getKeystrokes(wrongWords[wrongWords.length - 1].innerText) + 1;
        wordsWrong += 1;
      }

      const tmp = keystrokesCorrect / 5;
      updateWpm(((tmp * 60 * 1000) / (Date.now() - startTime)).toFixed(2));
      updateKs(keystrokesCorrect, keystrokesWrong);
      updateWs(wordsCorrect, wordsWrong);
      updateRaw((tmp * durationRatio).toFixed(2));
    }
  };

  /* CODE */
  reset();
})();
