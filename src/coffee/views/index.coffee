Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'

module.exports = class Index

  particleCount: 3000

  constructor: ->

    @createStarfield()
    @createNebula()

    RAF.on 'tick', @update

  createStarfield: ->

    @starfield = new THREE.Object3D

    Scene.add @starfield

    geometry = new THREE.Geometry

    options =
      color       : 0xFFFFFF
      size        : 2
      map         : THREE.ImageUtils.loadTexture('images/particle.png')
      blending    : THREE.AdditiveBlending
      transparent : true

    material = new THREE.PointCloudMaterial options

    for i in [0...@particleCount]

      x = Math.random() * 500 - 250
      y = Math.random() * 500 - 250
      z = Math.random() * 500 - 250

      particle = new THREE.Vector3 x, y, z

      geometry.vertices.push particle

    particles = new THREE.PointCloud geometry, material

    particles.sortParticles = true

    @starfield.add particles

  createNebula: ->

    images = ['images/plasma.jpg','images/plasma2.jpg', 'images/plasma3.jpg']

    @nebula = new THREE.Object3D

    count = 15

    for i in [0...count]

      geometry = new THREE.PlaneGeometry 100, 100, 1, 1

      texture           = THREE.ImageUtils.loadTexture images[Math.floor(Math.random() * 3)]
      texture.minFilter = THREE.LinearFilter

      options =
        map         : texture
        blending    : THREE.AdditiveBlending
        transparent : true
        side        : THREE.DoubleSide
        wireframe   : false
        depthWrite  : false
        depthTest   : false
      
      material = new THREE.MeshBasicMaterial options
      mesh     = new THREE.Mesh geometry, material

      mesh.rotation.x = i * ( Math.PI * 2 ) / count
      mesh.rotation.y = i * ( Math.PI * 2 ) / count
      mesh.rotation.z = i * ( Math.PI * 2 ) / count

      @nebula.add mesh

    Scene.add @nebula

  update: ( time ) =>

    @nebula.position.y = Math.sin( time / 500 )

    for plane in @nebula.children

      v1 = plane.geometry.faces[0].normal
      v1 = v1.clone().applyMatrix4( plane.matrix )
      v2 = Camera.position.clone().sub( plane.position ).normalize()
      a  = v1.dot v2

      if a < 0 then a = a * -1

      plane.material.opacity = a

