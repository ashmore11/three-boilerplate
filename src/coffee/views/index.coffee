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

      pX = Math.random() * 500 - 250
      pY = Math.random() * 500 - 250
      pZ = Math.random() * 500 - 250

      particle = new THREE.Vector3 pX, pY, pZ

      geometry.vertices.push particle

    particles = new THREE.PointCloud geometry, material

    particles.sortParticles = true

    @starfield.add particles

  createNebula: ->

    @nebula = new THREE.Object3D

    for i in [0...10]

      geometry = new THREE.PlaneGeometry 50, 50, 5, 5

      images = ['images/plasma.jpg', 'images/plasma2.jpg']

      texture           = THREE.ImageUtils.loadTexture images[Math.floor(Math.random() * 2)]
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

      mesh.matrix = new THREE.Matrix4
      mesh.matrix.extractRotation mesh.matrixWorld

      mesh.rotation.set Math.random() * 360, Math.random() * 360, Math.random() * 360
      # mesh.position.set Math.random() * 5, Math.random() * 5, Math.random() * 5

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

