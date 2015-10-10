Settings = require 'settings'
win      = require 'utils/window'
RAF      = require 'utils/raf'
Renderer = require 'helpers/renderer'
Controls = require 'helpers/controls'
Camera   = require 'helpers/camera'
Scene    = require 'helpers/scene'
View     = require 'views/index'

class APP

  camera   : Camera
  controls : Controls
  scene    : Scene
  renderer : Renderer

  constructor: ->

    if Settings.debug

      Scene.add new THREE.AxisHelper 200

    @view = new View

    RAF.on 'tick',   @update
    win.on 'resize', @resize

  update: =>

    Renderer.setViewport 0, 0, win.width, win.height
    Renderer.setScissor  0, 0, win.width, win.height

    Renderer.enableScissorTest true

    Renderer.render Scene, Camera

    Camera.updateProjectionMatrix()

    Controls.update()

  resize: =>

    Renderer.setSize win.width, win.height

    Camera.aspect = win.width / win.height
    
    Camera.updateProjectionMatrix()

window.APP = new APP