Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'

module.exports = class Index

  particleCount: 3000

  constructor: ->

    # @createStarfield()
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

    for i in [0...50]

      geometry = new THREE.PlaneGeometry 100, 100, 1, 1

      texture           = THREE.ImageUtils.loadTexture images[Math.floor(Math.random() * 3)]
      texture.minFilter = THREE.LinearFilter

      options =
        # map         : texture
        blending    : THREE.AdditiveBlending
        transparent : true
        side        : THREE.DoubleSide
        depthWrite  : false
        depthTest   : false
        wireframe   : true
      
      material = new THREE.MeshNormalMaterial options
      mesh     = new THREE.Mesh geometry, material

      # mesh.rotation.set i * 0.01, i * 0.01, ( Math.PI * i ) / 360
      mesh.rotation.set ( Math.PI * i ) / 360, 0, 0

      @nebula.add mesh

    Scene.add @nebula

  update: ( time ) =>

    for plane in @nebula.children

      v1 = plane.geometry.faces[0].normal
      v1 = v1.clone().applyMatrix4( plane.matrix )
      v2 = Camera.position.clone().sub( plane.position ).normalize()
      a  = v1.dot v2

      if a < 0 then a = a * -1

      plane.material.opacity = a

      # plane.rotation.x += 0.01
      # plane.rotation.y += 0.01

