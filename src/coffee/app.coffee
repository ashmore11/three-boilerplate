Renderer = require 'helpers/renderer'
Controls = require 'helpers/controls'
Camera   = require 'helpers/camera'
Scene    = require 'helpers/scene'
RAF      = require 'utils/raf'

class APP

  constructor: ->

    Scene.add new THREE.GridHelper 50, 10
    Scene.add new THREE.AxisHelper 60

    light = new THREE.SpotLight 0xffffff
    light.position.set 0, 20, 0

    Scene.add light

    geometry = new THREE.SphereGeometry 5, 32, 32
    material = new THREE.MeshLambertMaterial 0xffffff
    mesh     = new THREE.Mesh geometry, material

    Scene.add mesh

    RAF.on 'update', @update

  update: =>

    Renderer.render( Scene, Camera )

    Camera.updateProjectionMatrix()

    Controls.update()

module.exports = new APP