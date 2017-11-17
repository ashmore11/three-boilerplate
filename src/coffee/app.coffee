Settings = require 'settings'
win      = require 'utils/window'
RAF      = require 'utils/raf'
Renderer = require 'helpers/renderer'
Controls = require 'helpers/controls'
Camera   = require 'helpers/camera'
Scene    = require 'helpers/scene'
Lights   = require 'helpers/lighting'
View     = require 'views/index'

class APP

  constructor: ->

    if Settings.debug

      Scene.add new THREE.GridHelper 10, 10
      Scene.add new THREE.AxisHelper 60

    Scene.add light for light in object for key, object of Lights

    @view = new View

    RAF.on 'tick',   @update
    win.on 'resize', @resize

  update: =>

    Renderer.setViewport 0, 0, win.width, win.height
    Renderer.setScissor  0, 0, win.width, win.height

    Renderer.setScissorTest true

    Renderer.render Scene, Camera

    Camera.updateProjectionMatrix()

    Controls.update() if Settings.controls

  resize: =>

    Renderer.setSize win.width, win.height

    Camera.aspect = win.width / win.height
    
    Camera.updateProjectionMatrix()

module.exports = new APP