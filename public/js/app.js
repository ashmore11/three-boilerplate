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

	var APP, Camera, Controls, Lights, RAF, Renderer, Scene, Settings, View, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Settings = __webpack_require__(1);

	win = __webpack_require__(2);

	RAF = __webpack_require__(4);

	Renderer = __webpack_require__(5);

	Controls = __webpack_require__(6);

	Camera = __webpack_require__(7);

	Lights = __webpack_require__(8);

	Scene = __webpack_require__(9);

	View = __webpack_require__(10);

	APP = (function() {
	  function APP() {
	    this.resize = __bind(this.resize, this);
	    this.update = __bind(this.update, this);
	    var key, light, object, _i, _len;
	    if (Settings.debug) {
	      Scene.add(new THREE.GridHelper(50, 10));
	      Scene.add(new THREE.AxisHelper(60));
	    }
	    for (key in Lights) {
	      object = Lights[key];
	      for (_i = 0, _len = object.length; _i < _len; _i++) {
	        light = object[_i];
	        Scene.add(light);
	      }
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
	  fog: false
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

	renderer.shadowMapSoft = true;

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

	camera.position.set(60, 60, 60);

	camera.lookAt(new THREE.Vector3);

	module.exports = camera;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var lights, pointLight1, spotLight1, spotLight2;

	spotLight1 = new THREE.SpotLight(0xffffff);

	spotLight1.position.set(60, 100, 60);

	spotLight2 = new THREE.SpotLight(0xffffff, 0);

	spotLight2.position.set(0, 100, 0);

	spotLight2.castShadow = true;

	spotLight2.shadowDarkness = 0.2;

	spotLight2.shadowCameraFov = 25;

	pointLight1 = new THREE.PointLight(0xffffff);

	pointLight1.position.set(0, 0, 0);

	lights = {
	  spotLights: [spotLight1, spotLight2],
	  pointLights: [pointLight1]
	};

	module.exports = lights;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Settings;

	Settings = __webpack_require__(1);

	module.exports = new THREE.Scene;

	if (Settings.fog) {
	  module.exports.fog = new THREE.FogExp2(0x000000, 0.005);
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Camera, Index, Mouse, RAF, RandomColor, Renderer, Scene, Settings, win,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	win = __webpack_require__(2);

	Settings = __webpack_require__(1);

	RAF = __webpack_require__(4);

	Scene = __webpack_require__(9);

	Camera = __webpack_require__(7);

	Renderer = __webpack_require__(5);

	RandomColor = __webpack_require__(11);

	Mouse = __webpack_require__(12);

	module.exports = Index = (function() {
	  Index.prototype.faces = [];

	  function Index() {
	    this.update = __bind(this.update, this);
	    this.innerSphere();
	    this.outerSphere();
	    this.seperateGeometry();
	    this.getFaces();
	    this.getNewPosition();
	    this.colorFaces();
	    this.tweenFaces();
	    this.groupedObjects = new THREE.Object3D;
	    this.groupedObjects.add(this.glowBall);
	    this.groupedObjects.add(this.mainSphere);
	    Scene.add(this.groupedObjects);
	    RAF.on('tick', this.update);
	  }

	  Index.prototype.innerSphere = function() {
	    var geometry, material, materialOptions;
	    materialOptions = {
	      uniforms: {},
	      vertexShader: $('#vertexShader').text(),
	      fragmentShader: $('#fragmentShader').text(),
	      side: THREE.BackSide,
	      blending: THREE.AdditiveBlending,
	      transparent: true
	    };
	    geometry = new THREE.SphereGeometry(18, 32, 32);
	    material = new THREE.ShaderMaterial(materialOptions);
	    return this.glowBall = new THREE.Mesh(geometry, material);
	  };

	  Index.prototype.outerSphere = function() {
	    var geometry, material, materialOptions;
	    materialOptions = {
	      color: 0xffffff,
	      wireframe: false,
	      side: THREE.DoubleSide,
	      vertexColors: THREE.FaceColors
	    };
	    geometry = new THREE.SphereGeometry(20, 8, 8);
	    material = new THREE.MeshLambertMaterial(materialOptions);
	    this.mainSphere = new THREE.Mesh(geometry, material);
	    this.mainSphere.castShadow = true;
	    return this.mainSphere.receiveShadow = true;
	  };

	  Index.prototype.seperateGeometry = function() {
	    var a, b, c, face, geometry, i, n, va, vb, vc, vertices, _i, _len, _ref;
	    geometry = this.mainSphere.geometry;
	    vertices = [];
	    _ref = geometry.faces;
	    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	      face = _ref[i];
	      n = vertices.length;
	      a = face.a;
	      b = face.b;
	      c = face.c;
	      va = geometry.vertices[a];
	      vb = geometry.vertices[b];
	      vc = geometry.vertices[c];
	      vertices.push(va.clone());
	      vertices.push(vb.clone());
	      vertices.push(vc.clone());
	      face.a = n;
	      face.b = n + 1;
	      face.c = n + 2;
	    }
	    return geometry.vertices = vertices;
	  };

	  Index.prototype.getFaces = function() {
	    var arr, i, vertex, _i, _len, _ref, _results;
	    _ref = this.mainSphere.geometry.vertices;
	    _results = [];
	    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	      vertex = _ref[i];
	      if (i % 3 === 0) {
	        if (i !== 0) {
	          this.faces.push(arr);
	        }
	        arr = [];
	      }
	      _results.push(arr.push(vertex));
	    }
	    return _results;
	  };

	  Index.prototype.getNewPosition = function() {
	    var center, cx, cy, cz, diff, face, length, _i, _len, _ref, _results;
	    _ref = this.faces;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      face = _ref[_i];
	      cx = (face[0].x + face[1].x + face[2].x) / 3;
	      cy = (face[0].y + face[1].y + face[2].y) / 3;
	      cz = (face[0].z + face[1].z + face[2].z) / 3;
	      center = new THREE.Vector3(cx, cy, cz);
	      diff = center.sub(Scene.position);
	      length = diff.length();
	      diff.normalize();
	      diff.multiplyScalar(2);
	      _results.push(face.diff = diff);
	    }
	    return _results;
	  };

	  Index.prototype.colorFaces = function() {
	    var color, face, _i, _len, _ref, _results;
	    _ref = this.mainSphere.geometry.faces;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      face = _ref[_i];
	      color = RandomColor({
	        hue: 'red',
	        luminosity: 'bright'
	      }).split('#')[1];
	      _results.push(face.color.setHex("0x" + color));
	    }
	    return _results;
	  };

	  Index.prototype.tweenFaces = function() {
	    var face, i, params, vertex, x, y, z, _i, _len, _ref, _results;
	    _ref = this.faces;
	    _results = [];
	    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	      face = _ref[i];
	      _results.push((function() {
	        var _j, _len1, _results1;
	        _results1 = [];
	        for (_j = 0, _len1 = face.length; _j < _len1; _j++) {
	          vertex = face[_j];
	          x = vertex.x;
	          y = vertex.y;
	          z = vertex.z;
	          params = {
	            x: vertex.x + face.diff.x * 4,
	            y: vertex.y + face.diff.y * 4,
	            z: vertex.z + face.diff.z * 4,
	            delay: i * 0.005,
	            ease: Power1.easeInOut,
	            repeat: -1,
	            yoyo: true
	          };
	          _results1.push(TweenMax.to(vertex, 0.5, params));
	        }
	        return _results1;
	      })());
	    }
	    return _results;
	  };

	  Index.prototype.update = function(time) {
	    this.mainSphere.rotation.y -= 0.01;
	    this.mainSphere.geometry.verticesNeedUpdate = true;
	    this.mainSphere.geometry.colorsNeedUpdate = true;
	    this.mainSphere.scale.x = 0.05 * Math.sin(time / 500) + 1.05;
	    this.mainSphere.scale.y = 0.05 * Math.sin(time / 500) + 1.05;
	    return this.mainSphere.scale.z = 0.05 * Math.sin(time / 500) + 1.05;
	  };

	  return Index;

	})();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// randomColor by David Merfield under the MIT license
	// https://github.com/davidmerfield/randomColor/

	;(function(root, factory) {

	  // Support AMD
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Support CommonJS
	  } else if (typeof exports === 'object') {
	    var randomColor = factory();
	    
	    // Support NodeJS & Component, which allow module.exports to be a function
	    if (typeof module === 'object' && module && module.exports) {
	      exports = module.exports = randomColor;
	    }
	    
	    // Support CommonJS 1.1.1 spec
	    exports.randomColor = randomColor;
	  
	  // Support vanilla script loading
	  } else {
	    root.randomColor = factory();
	  };

	}(this, function() {

	  // Seed to get repeatable colors
	  var seed = null;

	  // Shared color dictionary
	  var colorDictionary = {};

	  // Populate the color dictionary
	  loadColorBounds();

	  var randomColor = function(options) {
	    options = options || {};
	    if (options.seed && !seed) seed = options.seed;

	    var H,S,B;

	    // Check if we need to generate multiple colors
	    if (options.count != null) {

	      var totalColors = options.count,
	          colors = [];

	      options.count = null;

	      while (totalColors > colors.length) {
	        colors.push(randomColor(options));
	      }

	      options.count = totalColors;

	      //Keep the seed constant between runs. 
	      if (options.seed) seed = options.seed;
	      
	      return colors;
	    }

	    // First we pick a hue (H)
	    H = pickHue(options);

	    // Then use H to determine saturation (S)
	    S = pickSaturation(H, options);

	    // Then use S and H to determine brightness (B).
	    B = pickBrightness(H, S, options);

	    // Then we return the HSB color in the desired format
	    return setFormat([H,S,B], options);
	  };

	  function pickHue (options) {

	    var hueRange = getHueRange(options.hue),
	        hue = randomWithin(hueRange);

	    // Instead of storing red as two seperate ranges,
	    // we group them, using negative numbers
	    if (hue < 0) {hue = 360 + hue}

	    return hue;

	  }

	  function pickSaturation (hue, options) {

	    if (options.luminosity === 'random') {
	      return randomWithin([0,100]);
	    }

	    if (options.hue === 'monochrome') {
	      return 0;
	    }

	    var saturationRange = getSaturationRange(hue);

	    var sMin = saturationRange[0],
	        sMax = saturationRange[1];

	    switch (options.luminosity) {

	      case 'bright':
	        sMin = 55;
	        break;

	      case 'dark':
	        sMin = sMax - 10;
	        break;

	      case 'light':
	        sMax = 55;
	        break;
	   }

	    return randomWithin([sMin, sMax]);

	  }

	  function pickBrightness (H, S, options) {

	    var brightness,
	        bMin = getMinimumBrightness(H, S),
	        bMax = 100;

	    switch (options.luminosity) {

	      case 'dark':
	        bMax = bMin + 20;
	        break;

	      case 'light':
	        bMin = (bMax + bMin)/2;
	        break;

	      case 'random':
	        bMin = 0;
	        bMax = 100;
	        break;
	    }

	    return randomWithin([bMin, bMax]);

	  }

	  function setFormat (hsv, options) {

	    switch (options.format) {

	      case 'hsvArray':
	        return hsv;

	      case 'hslArray':
	        return HSVtoHSL(hsv);

	      case 'hsl':
	        var hsl = HSVtoHSL(hsv);
	        return 'hsl('+hsl[0]+', '+hsl[1]+'%, '+hsl[2]+'%)';

	      case 'rgbArray':
	        return HSVtoRGB(hsv);

	      case 'rgb':
	        var rgb = HSVtoRGB(hsv);
	        return 'rgb(' + rgb.join(', ') + ')';

	      default:
	        return HSVtoHex(hsv);
	    }

	  }

	  function getMinimumBrightness(H, S) {

	    var lowerBounds = getColorInfo(H).lowerBounds;

	    for (var i = 0; i < lowerBounds.length - 1; i++) {

	      var s1 = lowerBounds[i][0],
	          v1 = lowerBounds[i][1];

	      var s2 = lowerBounds[i+1][0],
	          v2 = lowerBounds[i+1][1];

	      if (S >= s1 && S <= s2) {

	         var m = (v2 - v1)/(s2 - s1),
	             b = v1 - m*s1;

	         return m*S + b;
	      }

	    }

	    return 0;
	  }

	  function getHueRange (colorInput) {

	    if (typeof parseInt(colorInput) === 'number') {

	      var number = parseInt(colorInput);

	      if (number < 360 && number > 0) {
	        return [number, number];
	      }

	    }

	    if (typeof colorInput === 'string') {

	      if (colorDictionary[colorInput]) {
	        var color = colorDictionary[colorInput];
	        if (color.hueRange) {return color.hueRange}
	      }
	    }

	    return [0,360];

	  }

	  function getSaturationRange (hue) {
	    return getColorInfo(hue).saturationRange;
	  }

	  function getColorInfo (hue) {

	    // Maps red colors to make picking hue easier
	    if (hue >= 334 && hue <= 360) {
	      hue-= 360;
	    }

	    for (var colorName in colorDictionary) {
	       var color = colorDictionary[colorName];
	       if (color.hueRange &&
	           hue >= color.hueRange[0] &&
	           hue <= color.hueRange[1]) {
	          return colorDictionary[colorName];
	       }
	    } return 'Color not found';
	  }

	  function randomWithin (range) {
	    if (seed == null) {
	      return Math.floor(range[0] + Math.random()*(range[1] + 1 - range[0]));
	    } else {
	      //Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
	      var max = range[1] || 1;
	      var min = range[0] || 0;
	      seed = (seed * 9301 + 49297) % 233280;
	      var rnd = seed / 233280.0;
	      return Math.floor(min + rnd * (max - min));
	    }
	  }

	  function HSVtoHex (hsv){

	    var rgb = HSVtoRGB(hsv);

	    function componentToHex(c) {
	        var hex = c.toString(16);
	        return hex.length == 1 ? "0" + hex : hex;
	    }

	    var hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);

	    return hex;

	  }

	  function defineColor (name, hueRange, lowerBounds) {

	    var sMin = lowerBounds[0][0],
	        sMax = lowerBounds[lowerBounds.length - 1][0],

	        bMin = lowerBounds[lowerBounds.length - 1][1],
	        bMax = lowerBounds[0][1];

	    colorDictionary[name] = {
	      hueRange: hueRange,
	      lowerBounds: lowerBounds,
	      saturationRange: [sMin, sMax],
	      brightnessRange: [bMin, bMax]
	    };

	  }

	  function loadColorBounds () {

	    defineColor(
	      'monochrome',
	      null,
	      [[0,0],[100,0]]
	    );

	    defineColor(
	      'red',
	      [-26,18],
	      [[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]
	    );

	    defineColor(
	      'orange',
	      [19,46],
	      [[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]
	    );

	    defineColor(
	      'yellow',
	      [47,62],
	      [[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]
	    );

	    defineColor(
	      'green',
	      [63,178],
	      [[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]
	    );

	    defineColor(
	      'blue',
	      [179, 257],
	      [[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]
	    );

	    defineColor(
	      'purple',
	      [258, 282],
	      [[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]
	    );

	    defineColor(
	      'pink',
	      [283, 334],
	      [[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]
	    );

	  }

	  function HSVtoRGB (hsv) {

	    // this doesn't work for the values of 0 and 360
	    // here's the hacky fix
	    var h = hsv[0];
	    if (h === 0) {h = 1}
	    if (h === 360) {h = 359}

	    // Rebase the h,s,v values
	    h = h/360;
	    var s = hsv[1]/100,
	        v = hsv[2]/100;

	    var h_i = Math.floor(h*6),
	      f = h * 6 - h_i,
	      p = v * (1 - s),
	      q = v * (1 - f*s),
	      t = v * (1 - (1 - f)*s),
	      r = 256,
	      g = 256,
	      b = 256;

	    switch(h_i) {
	      case 0: r = v, g = t, b = p;  break;
	      case 1: r = q, g = v, b = p;  break;
	      case 2: r = p, g = v, b = t;  break;
	      case 3: r = p, g = q, b = v;  break;
	      case 4: r = t, g = p, b = v;  break;
	      case 5: r = v, g = p, b = q;  break;
	    }
	    var result = [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)];
	    return result;
	  }

	  function HSVtoHSL (hsv) {
	    var h = hsv[0],
	      s = hsv[1]/100,
	      v = hsv[2]/100,
	      k = (2-s)*v;

	    return [
	      h,
	      Math.round(s*v / (k<1 ? k : 2-k) * 10000) / 100,
	      k/2 * 100
	    ];
	  }

	  return randomColor;
	}));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Mouse, happens,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(3);

	Mouse = (function() {
	  Mouse.prototype.doc = $(document);

	  Mouse.prototype.x = 0;

	  Mouse.prototype.y = 0;

	  function Mouse() {
	    this.mousemove = __bind(this.mousemove, this);
	    happens(this);
	    this.doc.on('mousemove', this.mousemove);
	  }

	  Mouse.prototype.mousemove = function(event) {
	    this.x = event.pageX - ($(window).width() / 2);
	    this.y = event.pageY - ($(window).height() / 2);
	    return this.emit('move');
	  };

	  return Mouse;

	})();

	module.exports = new Mouse;


/***/ }
/******/ ]);