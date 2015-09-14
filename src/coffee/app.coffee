RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Renderer = require 'helpers/renderer'
Controls = require 'helpers/controls'

class APP

  scene    : Scene
  renderer : Renderer.renderer
  controls : Controls.controls

  constructor: ->

    @scene.add new THREE.GridHelper 50, 10
    @scene.add new THREE.AxisHelper 10

    @ambientLight = new THREE.AmbientLight( 0x000000 )
    @spotLight    = new THREE.SpotLight( 0xcfcfcf )
    @spotLight.position.set 0, 1000, 0
    
    @scene.add @spotLight
    # @scene.add @ambientLight

    geometry = new THREE.SphereGeometry( 10, 32, 32 )
    material = new THREE.MeshPhongMaterial( 0x000000, wireframe: true )
    mesh     = new THREE.Mesh( geometry, material )

    mesh.position.set(0,10,0)

    @scene.add mesh

    RAF.on 'update', @update

  update: =>

module.exports = new APP