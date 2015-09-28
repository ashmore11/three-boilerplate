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

    for i in [0...1]

      geometry = new THREE.PlaneGeometry 40, 40

      options =
        map         : THREE.ImageUtils.loadTexture('images/plasma.jpg')
        blending    : THREE.AdditiveBlending
        transparent : true
        side        : THREE.DoubleSide
      
      material = new THREE.MeshBasicMaterial options

      mesh = new THREE.Mesh geometry, material

      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI
      mesh.rotation.z = Math.random() * Math.PI

      @nebula.add mesh

    console.log Camera

    Scene.add @nebula

  update: ( time ) =>

    # @starfield.rotation.y += 0.001

    for plane in @nebula.children

      opacity = Math.cos plane.geometry.faces[0].normal.dot Camera.up

      plane.material.opacity = opacity

      console.log opacity

