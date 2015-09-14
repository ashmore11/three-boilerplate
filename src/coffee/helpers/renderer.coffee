win    = require 'utils/window'
RAF    = require 'utils/raf'
Scene  = require 'helpers/scene'
Camera = require 'helpers/camera'

class Renderer

  renderer: null

  constructor: ( el ) ->

    @renderer = new THREE.WebGLRenderer antialias: true

    @renderer.setSize win.width, win.height
    @renderer.setClearColor 0xffffff

    @renderer.shadowMapEnabled = on

    RAF.on 'update', @update

  appendDomElement: ( el ) ->

    el.append @renderer.domElement

  update: =>

    @renderer.render Scene, Camera.camera

module.exports = new Renderer