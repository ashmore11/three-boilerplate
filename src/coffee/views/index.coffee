Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'

module.exports = class Index

  count  : 4
  radius : 10

  constructor: ->

    @group = new THREE.Object3D

    for i in [0...@count]

      geometry = new THREE.SphereGeometry @radius, 32, 32
      material = new THREE.MeshLambertMaterial color: 0xffffff, wireframe: true
      sphere   = new THREE.Mesh geometry, material

      center = i * ( @radius * 2 ) - ( @count * @radius ) + @radius

      sphere.position.set 0, center, 0

      @group.add sphere

    Scene.add @group

    RAF.on 'tick', @update

  update: ( time ) =>

    @group.rotation.z += 0.005

    for sphere, i in @group.children

      sphere.rotation.y += 0.01

      scale = 0.25 * Math.sin( time / 500 ) + 1.25

      sphere.scale.set scale, scale, scale

      y = sphere.position.y

      # sphere.position.y = 