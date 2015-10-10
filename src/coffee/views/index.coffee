Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'

module.exports = class Index

  particleCount: 5000
  planeCount   : 15
  meshRadius   : 300

  constructor: ->

    # @createStarfield()
    # @createNebula()
    @createSpecialMesh()

    RAF.on 'tick', @update

  createStarfield: ->

    @starfield = new THREE.Object3D

    Scene.add @starfield

    geometry = new THREE.Geometry

    options =
      map         : THREE.ImageUtils.loadTexture('images/particle.png')
      blending    : THREE.AdditiveBlending
      size        : 2
      transparent : true
      depthWrite  : false
      depthTest   : false

    material = new THREE.PointCloudMaterial options

    for i in [0...@particleCount]

      x = ( Math.random() * 500 ) - 250
      y = ( Math.random() * 500 ) - 250
      z = ( Math.random() * 500 ) - 250

      particle = new THREE.Vector3 x, y, z

      geometry.vertices.push particle

    particles = new THREE.PointCloud geometry, material

    particles.sortParticles = true

    @starfield.add particles

  # createNebula: ->

  #   @nebula = new THREE.Object3D
  #   images  = ['images/plasma.jpg','images/plasma2.jpg', 'images/plasma3.jpg']

  #   for i in [0...@planeCount]

  #     geometry = new THREE.PlaneGeometry 150, 150, 1, 1

  #     texture           = THREE.ImageUtils.loadTexture images[Math.floor(Math.random() * 3)]
  #     texture.minFilter = THREE.LinearFilter

  #     options =
  #       map         : texture
  #       blending    : THREE.AdditiveBlending
  #       side        : THREE.DoubleSide
  #       transparent : true
  #       wireframe   : false
  #       depthWrite  : false
  #       depthTest   : false
      
  #     material = new THREE.MeshBasicMaterial options
  #     mesh     = new THREE.Mesh geometry, material

  #     mesh.rotation.x = i * ( Math.PI * 2 ) / @planeCount
  #     mesh.rotation.y = i * ( Math.PI * 2 ) / @planeCount
  #     mesh.rotation.z = i * ( Math.PI * 2 ) / @planeCount

  #     @nebula.add mesh

  #   Scene.add @nebula

  createSpecialMesh: ->

    geometry = new THREE.ParametricGeometry @radialWave, 25, 25, false
    material = new THREE.MeshBasicMaterial wireframe: true, side: THREE.DoubleSide
    mesh     = new THREE.Mesh geometry, material
    matrix   = new THREE.Matrix4

    geometry.applyMatrix matrix.makeTranslation -( @meshRadius / 2 ), 0, -( @meshRadius / 2 )
    
    Scene.add mesh

  radialWave: ( u, v ) =>

    r = @meshRadius

    x = Math.sin( u ) * r
    z = Math.sin( v / 2 ) * 2 * r
    y = ( Math.sin( u * 4 * Math.PI ) + Math.cos( v * 4 * Math.PI ) ) * 8

    vector = new THREE.Vector3 x, y, z
    
    return vector

  update: ( time ) =>

    @starfield?.rotation.y += 0.000025
    @starfield?.position.y -= 0.025

    @nebula?.position.y = Math.sin( time / 500 )

    # for plane in @nebula.children

    #   v1 = plane.geometry.faces[0].normal
    #   v1 = v1.clone().applyMatrix4( plane.matrix )
    #   v2 = Camera.position.clone().sub( plane.position ).normalize()
    #   a  = v1.dot v2

    #   if a < 0 then a = a * -1

    #   plane.material.opacity = a

