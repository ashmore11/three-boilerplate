Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'

module.exports = class Index

  constructor: ->

    geometry = new THREE.SphereGeometry 10, 32, 32
    material = new THREE.MeshLambertMaterial color: 0xffffff, wireframe: true
    @sphere  = new THREE.Mesh geometry, material

    Scene.add @sphere

    RAF.on 'tick', @update

  update: ( time ) =>

    @sphere.geometry.verticesNeedUpdate = true

    for face in @sphere.geometry.faces

      face.a = Math.floor( 100 * Math.sin( time / 10000 ) + 100 )
      face.b = Math.floor( 100 * Math.sin( time / 10000 ) + 100 )