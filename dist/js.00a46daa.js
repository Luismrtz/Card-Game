// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/canvas.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var particleArray; // create constructor function

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, directionX, directionY, size, color) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  } // method to draw individual particle


  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    } // to bounce when at edge of screen

  }, {
    key: "update",
    value: function update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }

      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
      }

      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }]);

  return Particle;
}();

function init() {
  particleArray = [];

  for (var i = 0; i < 20; i++) {
    var size = Math.random() * 10;
    var x = Math.random() * (innerWidth - size * .2);
    var y = Math.random() * (innerHeight - size * .2); // so they dont get stuck in wall

    var directionX = Math.random() * .4 - .2;
    var directionY = Math.random() * .4 - .2;
    var color = 'white';
    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
} //animation


function animate() {
  requestAnimationFrame(animate); // RAF api

  ctx.clearRect(0, 0, innerWidth, innerHeight); // clear canvas over and over
  // itterate through particle array, run update method for each particle
  //update method checks if particle has reached end of screen, and if NOT. It draws it

  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();
window.addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
},{}],"Assets/Audio/calm2.mp3":[function(require,module,exports) {
module.exports = "/calm2.875ac81f.mp3";
},{}],"Assets/Audio/cardFlip.wav":[function(require,module,exports) {
module.exports = "/cardFlip.7eab815f.wav";
},{}],"Assets/Audio/matching.wav":[function(require,module,exports) {
module.exports = "/matching.8d04e3be.wav";
},{}],"Assets/Audio/victory2.wav":[function(require,module,exports) {
module.exports = "/victory2.180d90a2.wav";
},{}],"Assets/Audio/waterOver.wav":[function(require,module,exports) {
module.exports = "/waterOver.169b5342.wav";
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

require("../scss/main.scss");

require("./canvas.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//* parcel-bundler fix for audio (only loads paths from require, imports, workers)
var p1 = require('../Assets/Audio/calm2.mp3');

var p2 = require('../Assets/Audio/cardFlip.wav');

var p3 = require('../Assets/Audio/matching.wav');

var p4 = require('../Assets/Audio/victory2.wav');

var p5 = require('../Assets/Audio/waterOver.wav');

var AudioController = /*#__PURE__*/function () {
  // tracking audio/volume properties
  function AudioController() {
    _classCallCheck(this, AudioController);

    this.bgMusic = new Audio(p1);
    this.flipSound = new Audio(p2);
    this.matchSound = new Audio(p3);
    this.victorySound = new Audio(p4);
    this.gameOverSound = new Audio(p5);
    this.bgMusic.volume = 0.04; // base game's track volume

    this.flipSound.volume = 0.05;
    this.victorySound.volume = 0.01;
    this.gameOverSound.volume = 0.01;
    this.matchSound.volume = .09;
    this.bgMusic.loop = true; // to loop
  }

  _createClass(AudioController, [{
    key: "startMusic",
    value: function startMusic() {
      this.bgMusic.play(); // for when we call this via 'new' ac or somefin
      //  this.bgMusic.volume = 0.6;
    }
  }, {
    key: "stopMusic",
    value: function stopMusic() {
      this.bgMusic.pause(); // no stop functionality in js so pause()

      this.bgMusic.currentTime = 0; //putting music time to zero so it replays from beginning when paused
    }
  }, {
    key: "flip",
    value: function flip() {
      this.flipSound.play();
    }
  }, {
    key: "match",
    value: function match() {
      this.matchSound.play();
    }
  }, {
    key: "victory",
    value: function victory() {
      this.stopMusic(); // to stop MAIN music when we win, 

      this.victorySound.play(); // and play VICTORY music
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.stopMusic();
      this.gameOverSound.play();
    }
  }]);

  return AudioController;
}();

var MixOrMatch = /*#__PURE__*/function () {
  function MixOrMatch(totalTime, cards) {
    _classCallCheck(this, MixOrMatch);

    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining');
    this.ticker = document.getElementById('flips');
    this.ac = new AudioController(); // Inheriting AudioController and its properties to 'ac'
  } //! note: class constructors ONLY get called ONCE when written and when 'new' is made
  //! so we CALL a function for this (startGame) to be called multiple times


  _createClass(MixOrMatch, [{
    key: "startGame",
    value: function startGame() {
      var _this = this;

      this.cardToCheck = null; // no card to check, so cardtocheck is on null (when not match)

      this.totalClicks = 0; // to reset clicks

      this.timeRemaining = this.totalTime; // to reset time depending on set variable

      this.matchedCards = []; // where all the matched cards will go so we know if matched. But set to empty at start

      this.busy = true; // to check if allowed to flip a card

      setTimeout(function () {
        _this.ac.startMusic();

        _this.shuffleCard(_this.cardsArray);

        _this.countDown = _this.startCountDown();
        _this.busy = false;
      }, 500);
      this.hideCards();
      this.timer.innerText = this.timeRemaining;
      this.ticker.innerText = this.totalClicks;
    }
  }, {
    key: "hideCards",
    value: function hideCards() {
      this.cardsArray.forEach(function (card) {
        card.classList.remove('visible');
        card.classList.remove('matched');
      });
    }
  }, {
    key: "flipCard",
    value: function flipCard(card) {
      //* this is called in orignal forEach we initiated
      if (this.canFlipCard(card)) {
        // if(true) canFlipCard returns true
        this.ac.flip();
        this.totalClicks++;
        this.ticker.innerText = this.totalClicks; // to increment flips #

        card.classList.add('visible');
        if (this.cardToCheck) //if is not null
          // check if match
          this.checkForCardMatch(card);else this.cardToCheck = card;
      }
    } // grab card and compare to other| push to cardMatch/ or cardMisMatch

  }, {
    key: "checkForCardMatch",
    value: function checkForCardMatch(card) {
      if (this.getCardType(card) === this.getCardType(this.cardToCheck)) this.cardMatch(card, this.cardToCheck);else this.cardMisMatch(card, this.cardToCheck);
      this.cardToCheck = null;
    } //push card1/card2 to array if matched

  }, {
    key: "cardMatch",
    value: function cardMatch(card1, card2) {
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.ac.match(); // play 'isMatched' sound

      if (this.matchedCards.length === this.cardsArray.length) this.victory();
    } // remove visible if no match, cannot flip until timeout finishes.

  }, {
    key: "cardMisMatch",
    value: function cardMisMatch(card1, card2) {
      var _this2 = this;

      this.busy = true;
      setTimeout(function () {
        card1.classList.remove('visible');
        card2.classList.remove('visible');
        _this2.busy = false;
      }, 1000);
    }
  }, {
    key: "getCardType",
    value: function getCardType(card) {
      return card.getElementsByClassName('card-value')[0].src;
    } // timer countdown. 

  }, {
    key: "startCountDown",
    value: function startCountDown() {
      var _this3 = this;

      return setInterval(function () {
        _this3.timeRemaining--;
        _this3.timer.innerText = _this3.timeRemaining;
        if (_this3.timeRemaining === 0) _this3.gameOver();
      }, 1000);
    } // banner overlays

  }, {
    key: "gameOver",
    value: function gameOver() {
      clearInterval(this.countDown);
      this.ac.gameOver();
      document.getElementById('game-over-text').classList.add('visible');
    }
  }, {
    key: "victory",
    value: function victory() {
      clearInterval(this.countDown);
      this.ac.victory();
      document.getElementById('victory-text').classList.add('visible');
    }
  }, {
    key: "shuffleCard",
    value: function shuffleCard() {
      //static function | remember: 'cardsArray = cards' in mixOrMatch constructor
      for (var i = this.cardsArray.length - 1; i > 0; i--) {
        //fisher yates shuffle pattern
        var randIndex = Math.floor(Math.random() * (i + 1)); //looping through this backwards
        // detects ALL cards, grabs length(16) loops downwards. everyloop gets random int for grid
        //? length - 1 because need it to start from 0-15, instead of grabbing full length of 16
        //* (i+1)); because we already set i to [0-15]  cant mult by 0, so adding 1 so its (1-16) when in formula 

        this.cardsArray[randIndex].style.order = i; //links to the grid-order prototype in style of '.card'| = i is 0 bound, so [0-15]. 

        this.cardsArray[i].style.order = randIndex;
      }
    }
  }, {
    key: "canFlipCard",
    value: function canFlipCard(card) {
      // NOT allowed to flip card when....
      // this.busy = true
      // clicking on card that is already matched
      // one is already clicked and checking for a match
      return !this.busy && !this.matchedCards.includes(card) && card != this.cardToCheck; // return true if all these are false
    }
  }]);

  return MixOrMatch;
}(); // if page hasn't loaded yet, wait for page to load before running js. 
//start


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready()); // 'DOMContentLoaded' = once everything in htmlDOM has loaded. call function
} else {
  ready();
} // ? tip: getElementbyClassName 
//         1 returns an HTMLCollection, which needs to be converted to an array BUT is live loaded. 
// ? tip: querySelectorAll  
//         1 returns a nodelist, forEach works for nodeLists, BUT nodelist is NOT ARRAY and not live loaded | BUT CAN CALL ANYTHING YO, div > li
//                         STILL NEEDS TO BE CONVERTED TO ARRAY to access array prototypes methods (push/pop/slice)
//         2 note: cant convert queryselectorall to array when just pulling a div. 
//                   might be because its not hot loaded/live like getelementsbyclassName
//hotlive so className
//start


function ready() {
  var overlays = _toConsumableArray(document.getElementsByClassName('overlay-text')); //array of these overlay-text elements
  //* need it to be an array for future purposes.


  var cards = Array.from(document.getElementsByClassName('card')); //* instance of the object flipcard(card)

  var game = new MixOrMatch(50, cards); //? links to constructor and passes (arguments,arguments)
  //flips all visible cards

  overlays.forEach(function (overlay) {
    //can use forEach here now since overlay-text was converted
    overlay.addEventListener('click', function () {
      overlay.classList.remove('visible');
      game.startGame();
    });
  }); //on any card click, call flip card with selected card

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      //MixOrMatch constructor .flipCard function
      game.flipCard(card);
    });
  });
}
},{"../scss/main.scss":"scss/main.scss","./canvas.js":"js/canvas.js","../Assets/Audio/calm2.mp3":"Assets/Audio/calm2.mp3","../Assets/Audio/cardFlip.wav":"Assets/Audio/cardFlip.wav","../Assets/Audio/matching.wav":"Assets/Audio/matching.wav","../Assets/Audio/victory2.wav":"Assets/Audio/victory2.wav","../Assets/Audio/waterOver.wav":"Assets/Audio/waterOver.wav"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62492" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map