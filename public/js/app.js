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

	var APP, Camera, Controls, RAF, Renderer, Scene, Settings, View, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Settings = __webpack_require__(1);

	win = __webpack_require__(2);

	RAF = __webpack_require__(4);

	Renderer = __webpack_require__(5);

	Controls = __webpack_require__(6);

	Camera = __webpack_require__(7);

	Scene = __webpack_require__(8);

	View = __webpack_require__(9);

	APP = (function() {
	  function APP() {
	    this.resize = __bind(this.resize, this);
	    this.update = __bind(this.update, this);
	    var light;
	    if (Settings.debug) {
	      Scene.add(new THREE.GridHelper(50, 10));
	      Scene.add(new THREE.AxisHelper(60));
	    }
	    light = new THREE.SpotLight(0xffffff);
	    light.position.set(0, 20, 0);
	    this.view = new View;
	    RAF.on('tick', this.update);
	    win.on('resize', this.resize);
	  }

	  APP.prototype.update = function() {
	    Renderer.setViewport(0, 0, win.width, win.height);
	    Renderer.setScissor(0, 0, win.width, win.height);
	    Renderer.enableScissorTest(true);
	    Renderer.render(Scene, Camera);
	    Camera.updateProjectionMatrix();
	    return Controls.update();
	  };

	  APP.prototype.resize = function() {
	    Renderer.setSize(win.width, win.height);
	    Camera.aspect = win.width / win.height;
	    return Camera.updateProjectionMatrix();
	  };

	  return APP;

	})();

	module.exports = new APP;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  debug: false,
	  fog: true
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Window, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(3);

	Window = (function() {
	  Window.prototype.window = $(window);

	  Window.prototype.width = 0;

	  Window.prototype.height = 0;

	  function Window() {
	    this.resize = __bind(this.resize, this);
	    happens(this);
	    this.window.on('resize', this.resize);
	    this.resize();
	  }

	  Window.prototype.resize = function() {
	    this.width = this.window.width();
	    this.height = this.window.height();
	    return this.emit('resize');
	  };

	  return Window;

	})();

	module.exports = new Window;


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

	var RAF, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(3);

	(function() {
	  var lastTime, vendors, x;
	  lastTime = 0;
	  vendors = ["ms", "moz", "o"];
	  x = 0;
	  while (x < vendors.length && !window.requestAnimationFrame) {
	    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
	    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
	    ++x;
	  }
	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function(callback, element) {
	      var currTime, id, timeToCall;
	      currTime = new Date().getTime();
	      timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      id = window.setTimeout(function() {
	        return callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }
	  if (!window.cancelAnimationFrame) {
	    return window.cancelAnimationFrame = function(id) {
	      return clearTimeout(id);
	    };
	  }
	})();

	RAF = (function() {
	  RAF.prototype.id_animloop = null;

	  function RAF() {
	    this.animloop = __bind(this.animloop, this);
	    happens(this);
	    this.start();
	  }

	  RAF.prototype.start = function() {
	    return this.id_animloop = window.requestAnimationFrame(this.animloop);
	  };

	  RAF.prototype.stop = function() {
	    window.cancelAnimationFrame(this.id_animloop);
	    return this.id_animloop = null;
	  };

	  RAF.prototype.animloop = function(time) {
	    this.id_animloop = window.requestAnimationFrame(this.animloop);
	    return this.emit('tick', time);
	  };

	  return RAF;

	})();

	module.exports = new RAF;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var renderer, win;

	win = __webpack_require__(2);

	renderer = new THREE.WebGLRenderer({
	  antialias: true
	});

	renderer.setSize(win.width, win.height);

	renderer.setClearColor("#ffffff");

	renderer.shadowMapEnabled = true;

	$('main').append(renderer.domElement);

	module.exports = renderer;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Camera, controls;

	Camera = __webpack_require__(7);

	controls = new THREE.TrackballControls(Camera, $('canvas')[0]);

	controls.rotateSpeed = 1.0;

	controls.zoomSpeed = 1.2;

	controls.panSpeed = 0.8;

	controls.noZoom = false;

	controls.noPan = false;

	controls.staticMoving = true;

	controls.dynamicDampingFactor = 0.5;

	module.exports = controls;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var camera, win;

	win = __webpack_require__(2);

	camera = new THREE.PerspectiveCamera(65, win.width / win.height, 0.1, 10000);

	camera.position.set(60, 45, 60);

	camera.lookAt(new THREE.Vector3);

	module.exports = camera;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Settings;

	Settings = __webpack_require__(1);

	module.exports = new THREE.Scene;

	if (Settings.fog) {
	  module.exports.fog = new THREE.FogExp2(0xffffff, 0.005);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Index, RAF, Scene, Settings,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Settings = __webpack_require__(1);

	RAF = __webpack_require__(4);

	Scene = __webpack_require__(8);

	module.exports = Index = (function() {
	  Index.prototype.count = 20;

	  Index.prototype.radius = 10;

	  function Index() {
	    this.update = __bind(this.update, this);
	    var balls, center, geometry, i, material, sphere, _i, _j, _ref;
	    this.group = new THREE.Object3D;
	    for (i = _i = 0; _i < 20; i = ++_i) {
	      balls = new THREE.Object3D;
	      balls.position.x = (i * 30) - 500;
	      for (i = _j = 0, _ref = this.count; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
	        geometry = new THREE.SphereGeometry(this.radius, 32, 32);
	        material = new THREE.MeshLambertMaterial({
	          color: 0xffffff,
	          wireframe: true
	        });
	        sphere = new THREE.Mesh(geometry, material);
	        center = i * (this.radius * 2) - (this.count * this.radius) + this.radius;
	        sphere.position.set(0, center * 1.5, 0);
	        balls.add(sphere);
	      }
	      this.group.add(balls);
	    }
	    Scene.add(this.group);
	    RAF.on('tick', this.update);
	  }

	  Index.prototype.update = function(time) {
	    var balls, scale, sphere, _i, _len, _ref, _results;
	    _ref = this.group.children;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      balls = _ref[_i];
	      _results.push((function() {
	        var _j, _len1, _ref1, _results1;
	        _ref1 = balls.children;
	        _results1 = [];
	        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	          sphere = _ref1[_j];
	          sphere.rotation.y = 0.5 * Math.sin(time / 500) + 1.5;
	          scale = 0.25 * Math.sin(time / 500) + 1.25;
	          _results1.push(sphere.scale.set(scale, scale, scale));
	        }
	        return _results1;
	      })());
	    }
	    return _results;
	  };

	  return Index;

	})();


/***/ }
/******/ ]);