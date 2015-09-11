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

	var APP, Controls, RAF, Renderer, Scene,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	RAF = __webpack_require__(1);

	Scene = __webpack_require__(3);

	Renderer = __webpack_require__(4);

	Controls = __webpack_require__(7);

	APP = (function() {
	  APP.prototype.el = $('#scene');

	  APP.prototype.scene = Scene.scene;

	  APP.prototype.renderer = Renderer.renderer;

	  APP.prototype.controls = Controls.controls;

	  function APP() {
	    this.update = __bind(this.update, this);
	    var geometry, material, mesh;
	    Renderer.appendDomElement(this.el);
	    this.scene.add(new THREE.GridHelper(50, 10));
	    this.scene.add(new THREE.AxisHelper(10));
	    this.ambientLight = new THREE.AmbientLight(0xffffff);
	    this.scene.add(this.ambientLight);
	    geometry = new THREE.SphereGeometry(10, 16, 16);
	    material = new THREE.MeshLambertMaterial(0x000000, {
	      wireframe: true
	    });
	    mesh = new THREE.Mesh(geometry, material);
	    this.scene.add(mesh);
	    RAF.on('update', this.update);
	  }

	  APP.prototype.update = function() {};

	  return APP;

	})();

	module.exports = new APP;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var RAF, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(2);

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

	  RAF.prototype.animloop = function() {
	    this.id_animloop = window.requestAnimationFrame(this.animloop);
	    return this.emit('update');
	  };

	  return RAF;

	})();

	module.exports = new RAF;


/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	var Scene;

	Scene = (function() {
	  Scene.prototype.scene = null;

	  function Scene(el) {
	    this.scene = new THREE.Scene;
	  }

	  return Scene;

	})();

	module.exports = new Scene;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Camera, RAF, Renderer, Scene, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	win = __webpack_require__(5);

	RAF = __webpack_require__(1);

	Scene = __webpack_require__(3);

	Camera = __webpack_require__(6);

	Renderer = (function() {
	  Renderer.prototype.renderer = null;

	  function Renderer(el) {
	    this.update = __bind(this.update, this);
	    this.renderer = new THREE.WebGLRenderer({
	      antialias: true
	    });
	    this.renderer.setSize(win.width, win.height);
	    this.renderer.setClearColor(0xffffff);
	    this.renderer.shadowMapEnabled = true;
	    RAF.on('update', this.update);
	  }

	  Renderer.prototype.appendDomElement = function(el) {
	    return el.append(this.renderer.domElement);
	  };

	  Renderer.prototype.update = function() {
	    return this.renderer.render(Scene.scene, Camera.camera);
	  };

	  return Renderer;

	})();

	module.exports = new Renderer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Window, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(2);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Camera, RAF, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	RAF = __webpack_require__(1);

	win = __webpack_require__(5);

	Camera = (function() {
	  Camera.prototype.camera = null;

	  function Camera() {
	    this.update = __bind(this.update, this);
	    this.camera = new THREE.PerspectiveCamera(65, win.width / win.height, 0.1, 100000);
	    this.camera.position.set(60, 45, 60);
	    this.camera.lookAt(new THREE.Vector3);
	    RAF.on('update', this.update);
	  }

	  Camera.prototype.update = function() {
	    return this.camera.updateProjectionMatrix();
	  };

	  return Camera;

	})();

	module.exports = new Camera;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Camera, Controls, RAF,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	RAF = __webpack_require__(1);

	Camera = __webpack_require__(6);

	Controls = (function() {
	  Controls.prototype.controls = null;

	  function Controls() {
	    this.update = __bind(this.update, this);
	    this.controls = new THREE.TrackballControls(Camera.camera, $('canvas')[0]);
	    this.controls.rotateSpeed = 1.0;
	    this.controls.zoomSpeed = 1.2;
	    this.controls.panSpeed = 0.8;
	    this.controls.noZoom = false;
	    this.controls.noPan = false;
	    this.controls.staticMoving = true;
	    this.controls.dynamicDampingFactor = 0.5;
	    RAF.on('update', this.update);
	  }

	  Controls.prototype.update = function() {
	    return this.controls.update();
	  };

	  return Controls;

	})();

	module.exports = new Controls;


/***/ }
/******/ ]);