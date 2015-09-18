Settings    = require 'settings'
RAF         = require 'utils/raf'
Scene       = require 'helpers/scene'
randomColor = require 'randomcolor'

module.exports = class Index

  count  : 20
  radius : 10

  constructor: ->

    @group = new THREE.Object3D

    for i in [0...20]

      balls = new THREE.Object3D

      balls.position.x = ( i * 30 ) - 500

      for i in [0...@count]

        geometry = new THREE.OctahedronGeometry 10, 0
        # geometry = new THREE.SphereGeometry @radius, 16, 16
        material = new THREE.MeshPhongMaterial color: randomColor(luminosity: 'light'), wireframe: true
        sphere   = new THREE.Mesh geometry, material

        center = i * ( @radius * 2 ) - ( @count * @radius ) + @radius

        sphere.position.set 0, center * 1.5, 0

        balls.add sphere

      @group.add balls

    Scene.add @group

    RAF.on 'tick', @update

  update: ( time ) =>

    for balls in @group.children

      for sphere in balls.children

        sphere.rotation.x = Math.sin( time / 500 )
        sphere.rotation.y = Math.sin( time / 500 )
        sphere.rotation.z = Math.sin( time / 500 )

        scale = 0.25 * Math.sin( time / 500 ) + 1.25

        sphere.scale.set scale, scale, scale