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

    $('main').append @renderer.domElement

    RAF.on 'update', @update

  update: =>

    @renderer.render Scene, Camera.camera

module.exports = new Renderer