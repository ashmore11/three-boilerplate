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
	    if (Settings.debug) {
	      Scene.add(new THREE.GridHelper(50, 10));
	      Scene.add(new THREE.AxisHelper(60));
	    }
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

	renderer.setClearColor(0x000000);

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

	camera.position.set(110, 45, 110);

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

	var Camera, Index, RAF, Scene, Settings,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Settings = __webpack_require__(1);

	RAF = __webpack_require__(4);

	Scene = __webpack_require__(8);

	Camera = __webpack_require__(7);

	module.exports = Index = (function() {
	  Index.prototype.particleCount = 3000;

	  function Index() {
	    this.update = __bind(this.update, this);
	    this.createStarfield();
	    this.createNebula();
	    RAF.on('tick', this.update);
	  }

	  Index.prototype.createStarfield = function() {
	    var geometry, i, material, options, particle, particles, x, y, z, _i, _ref;
	    this.starfield = new THREE.Object3D;
	    Scene.add(this.starfield);
	    geometry = new THREE.Geometry;
	    options = {
	      color: 0xFFFFFF,
	      size: 2,
	      map: THREE.ImageUtils.loadTexture('images/particle.png'),
	      blending: THREE.AdditiveBlending,
	      transparent: true
	    };
	    material = new THREE.PointCloudMaterial(options);
	    for (i = _i = 0, _ref = this.particleCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	      x = Math.random() * 500 - 250;
	      y = Math.random() * 500 - 250;
	      z = Math.random() * 500 - 250;
	      particle = new THREE.Vector3(x, y, z);
	      geometry.vertices.push(particle);
	    }
	    particles = new THREE.PointCloud(geometry, material);
	    particles.sortParticles = true;
	    return this.starfield.add(particles);
	  };

	  Index.prototype.createNebula = function() {
	    var geometry, i, material, mesh, options, _i;
	    this.nebula = new THREE.Object3D;
	    for (i = _i = 0; _i < 500; i = ++_i) {
	      geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
	      options = {
	        transparent: true,
	        side: THREE.DoubleSide,
	        depthWrite: false,
	        depthTest: false,
	        wireframe: true
	      };
	      material = new THREE.MeshNormalMaterial(options);
	      mesh = new THREE.Mesh(geometry, material);
	      mesh.rotation.x = i * (Math.PI * 2) / 50;
	      this.nebula.add(mesh);
	    }
	    return Scene.add(this.nebula);
	  };

	  Index.prototype.update = function(time) {
	    var a, plane, v1, v2, _i, _len, _ref, _results;
	    _ref = this.nebula.children;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      plane = _ref[_i];
	      v1 = plane.geometry.faces[0].normal;
	      v1 = v1.clone().applyMatrix4(plane.matrix);
	      v2 = Camera.position.clone().sub(plane.position).normalize();
	      a = v1.dot(v2);
	      if (a < 0) {
	        a = a * -1;
	      }
	      _results.push(plane.material.opacity = a);
	    }
	    return _results;
	  };

	  return Index;

	})();


/***/ }
/******/ ]);