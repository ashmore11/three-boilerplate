Settings = require 'settings'
win      = require 'utils/window'
RAF      = require 'utils/raf'
Renderer = require 'helpers/renderer'
Controls = require 'helpers/controls'
Camera   = require 'helpers/camera'
Scene    = require 'helpers/scene'
View     = require 'views/index'

class APP

  constructor: ->

    if Settings.debug

      Scene.add new THREE.GridHelper 50, 10
      Scene.add new THREE.AxisHelper 60

    light = new THREE.SpotLight 0x555555
    light.position.set 0, 100, 0

    Scene.add light

    light = new THREE.PointLight 0xffffff
    light.position.set 0, 0, 0

    Scene.add light

    @view = new View

    RAF.on 'tick',   @update
    win.on 'resize', @resize

  update: =>

    # Renderer.setViewport 0, 0, win.width, win.height
    # Renderer.setScissor  0, 0, win.width, win.height

    # Renderer.enableScissorTest true

    # Renderer.render Scene, Camera

    Camera.updateProjectionMatrix()

    Controls.update()

  resize: =>

    Renderer.setSize win.width, win.height

    Camera.aspect = win.width / win.height
    
    Camera.updateProjectionMatrix()

module.exports = new APP