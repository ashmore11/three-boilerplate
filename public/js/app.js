/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _settings = __webpack_require__(1);

	var _settings2 = _interopRequireDefault(_settings);

	var _utilsWindow = __webpack_require__(2);

	var _utilsWindow2 = _interopRequireDefault(_utilsWindow);

	var _utilsRaf = __webpack_require__(4);

	var _utilsRaf2 = _interopRequireDefault(_utilsRaf);

	var _helpersRenderer = __webpack_require__(5);

	var _helpersRenderer2 = _interopRequireDefault(_helpersRenderer);

	var _helpersControls = __webpack_require__(6);

	var _helpersControls2 = _interopRequireDefault(_helpersControls);

	var _helpersCamera = __webpack_require__(7);

	var _helpersCamera2 = _interopRequireDefault(_helpersCamera);

	var _helpersScene = __webpack_require__(8);

	var _helpersScene2 = _interopRequireDefault(_helpersScene);

	var _viewsIndex = __webpack_require__(9);

	var _viewsIndex2 = _interopRequireDefault(_viewsIndex);

	var APP = (function () {
	  function APP() {
	    _classCallCheck(this, APP);

	    if (_settings2['default'].debug) {
	      _helpersScene2['default'].add(new THREE.GridHelper(50, 10));
	      _helpersScene2['default'].add(new THREE.AxisHelper(60));
	    }

	    _utilsRaf2['default'].on('tick', this.update);
	    _utilsWindow2['default'].on('resize', this.resize);

	    this.view = new _viewsIndex2['default']();
	  }

	  _createClass(APP, [{
	    key: 'update',
	    value: function update() {

	      _helpersRenderer2['default'].setViewport(0, 0, _utilsWindow2['default'].width, _utilsWindow2['default'].height);
	      _helpersRenderer2['default'].setScissor(0, 0, _utilsWindow2['default'].width, _utilsWindow2['default'].height);
	      _helpersRenderer2['default'].enableScissorTest(true);
	      _helpersRenderer2['default'].render(_helpersScene2['default'], _helpersCamera2['default']);

	      _helpersCamera2['default'].updateProjectionMatrix();

	      _helpersControls2['default'].update();
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {

	      _helpersRenderer2['default'].setSize(_utilsWindow2['default'].width, _utilsWindow2['default'].height);

	      _helpersCamera2['default'].aspect = _utilsWindow2['default'].width / _utilsWindow2['default'].height;

	      _helpersCamera2['default'].updateProjectionMatrix();
	    }
	  }]);

	  return APP;
	})();

	exports['default'] = new APP();
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var settings = {
	  debug: true,
	  fog: true
	};

	exports["default"] = settings;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _happens = __webpack_require__(3);

	var _happens2 = _interopRequireDefault(_happens);

	var Window = (function () {
		function Window() {
			_classCallCheck(this, Window);

			(0, _happens2['default'])(this);

			this.window = $(window);
			this.width = 0;
			this.height = 0;

			this.window.on('resize', this.resize);

			this.resize();
		}

		_createClass(Window, [{
			key: 'resize',
			value: function resize() {

				this.width = this.window.width();
				this.height = this.window.height();

				this.emit('resize');
			}
		}]);

		return Window;
	})();

	exports['default'] = new Window();
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Module constructor
	 * @param  {Object} target Target object to extends methods and properties into
	 * @return {Object}        Target after with extended methods and properties
	 */
	module.exports = function(target) {
	  target = target || {};
	  for(var prop in Happens)
	    target[prop] = Happens[prop];
	  return target;
	};



	/**
	 * Class Happens
	 * @type {Object}
	 */
	var Happens = {

	  /**
	   * Initializes event
	   * @param  {String} event Event name to initialize
	   * @return {Array}        Initialized event pool
	   */
	  __init: function(event) {
	    var tmp = this.__listeners || (this.__listeners = []);
	    return tmp[event] || (tmp[event] = []);
	  },

	  /**
	   * Adds listener
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  on: function(event, fn) {
	    validate(fn);
	    this.__init(event).push(fn);
	  },

	  /**
	   * Removes listener
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  off: function(event, fn) {
	    var pool = this.__init(event);
	    pool.splice(pool.indexOf(fn), 1);
	  },

	  /**
	   * Add listener the fires once and auto-removes itself
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  once: function(event, fn) {
	    validate(fn);
	    var self = this, wrapper = function() {
	      self.off(event, wrapper);
	      fn.apply(this, arguments);
	    };
	    this.on(event, wrapper );
	  },

	  /**
	   * Emit some event
	   * @param  {String} event Event name -- subsequent params after `event` will
	   * be passed along to the event's handlers
	   */
	  emit: function(event /*, arg1, arg2 */ ) {
	    var i, pool = this.__init(event).slice(0);
	    for(i in pool)
	      pool[i].apply(this, [].slice.call(arguments, 1));
	  }
	};



	/**
	 * Validates if a function exists and is an instanceof Function, and throws
	 * an error if needed
	 * @param  {Function} fn Function to validate
	 */
	function validate(fn) {
	  if(!(fn && fn instanceof Function))
	    throw new Error(fn + ' is not a Function');
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _happens = __webpack_require__(3);

	var _happens2 = _interopRequireDefault(_happens);

	(function () {

		var lastTime = 0;
		var vendors = ["ms", "moz", "o"];
		var x = 0;

		while (x < vendors.length && !window.requestAnimationFrame) {

			window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
			window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];

			++x;
		}

		if (!window.requestAnimationFrame) {

			window.requestAnimationFrame = function (callback, element) {

				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));

				var id = window.setTimeout(function () {

					callback(currTime + timeToCall);
				}, timeToCall);

				lastTime = currTime + timeToCall;

				return id;
			};
		}

		if (!window.cancelAnimationFrame) {

			window.cancelAnimationFrame = function (id) {
				return clearTimeout(id);
			};
		}
	})();

	var RAF = (function () {
		function RAF() {
			_classCallCheck(this, RAF);

			(0, _happens2["default"])(this);

			this.id_animloop = null;

			this.start();
		}

		_createClass(RAF, [{
			key: "start",
			value: function start() {

				this.id_animloop = window.requestAnimationFrame(this.animloop.bind(this));
			}
		}, {
			key: "stop",
			value: function stop() {

				window.cancelAnimationFrame(this.id_animloop.bind(this));

				this.id_animloop = null;
			}
		}, {
			key: "animloop",
			value: function animloop(time) {

				this.id_animloop = window.requestAnimationFrame(this.animloop.bind(this));

				this.emit('tick', time);
			}
		}]);

		return RAF;
	})();

	exports["default"] = new RAF();
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsWindow = __webpack_require__(2);

	var _utilsWindow2 = _interopRequireDefault(_utilsWindow);

	var renderer = new THREE.WebGLRenderer({
	  antialias: true
	});

	renderer.setSize(_utilsWindow2['default'].width, _utilsWindow2['default'].height);
	renderer.setClearColor("#ffffff");

	renderer.shadowMapEnabled = true;

	$('main').append(renderer.domElement);

	exports['default'] = renderer;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _helpersCamera = __webpack_require__(7);

	var _helpersCamera2 = _interopRequireDefault(_helpersCamera);

	var controls = new THREE.TrackballControls(_helpersCamera2['default'], $('canvas')[0]);

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.5;

	exports['default'] = controls;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsWindow = __webpack_require__(2);

	var _utilsWindow2 = _interopRequireDefault(_utilsWindow);

	var camera = new THREE.PerspectiveCamera(65, _utilsWindow2['default'].width / _utilsWindow2['default'].height, 0.1, 10000);

	camera.position.set(60, 45, 60);
	camera.lookAt(new THREE.Vector3());

	exports['default'] = camera;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var scene = new THREE.Scene();

	exports["default"] = scene;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsRaf = __webpack_require__(4);

	var _utilsRaf2 = _interopRequireDefault(_utilsRaf);

	var _helpersScene = __webpack_require__(8);

	var _helpersScene2 = _interopRequireDefault(_helpersScene);

	var Index = (function () {
	  function Index() {
	    _classCallCheck(this, Index);

	    _utilsRaf2['default'].on('tick', this.update);

	    var geometry = new THREE.SphereGeometry(10, 16, 16);
	    var material = new THREE.MeshBasicMaterial({
	      color: 0x000000,
	      wireframe: true
	    });

	    var mesh = new THREE.Mesh(geometry, material);

	    _helpersScene2['default'].add(mesh);
	  }

	  _createClass(Index, [{
	    key: 'update',
	    value: function update(time) {
	      //
	    }
	  }]);

	  return Index;
	})();

	exports['default'] = Index;
	module.exports = exports['default'];

/***/ }
/******/ ]);