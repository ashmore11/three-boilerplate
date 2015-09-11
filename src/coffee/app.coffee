RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Renderer = require 'helpers/renderer'
Controls = require 'helpers/controls'

class APP

  el       : $ '#scene'
  scene    : Scene.scene
  renderer : Renderer.renderer
  controls : Controls.controls

  constructor: ->

    Renderer.appendDomElement @el

    @scene.add new THREE.GridHelper 50, 10
    @scene.add new THREE.AxisHelper 10

    RAF.on 'update', @update

  update: =>

module.exports = new APP