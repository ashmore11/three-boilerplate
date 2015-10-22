Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'

module.exports = class Index

  particleCount: 5000
  planeCount   : 15
  meshRadius   : 300
  faces        : []

  constructor: ->

    # @createStarfield()
    @createSpecialMesh()
    # @createFaceArray()
    # @tweenFaces()

    RAF.on 'tick', @update

  createStarfield: ->

    @starfield = new THREE.Object3D

    Scene.add @starfield

    geometry = new THREE.Geometry

    options =
      map         : THREE.ImageUtils.loadTexture 'images/particle.png'
      blending    : THREE.AdditiveBlending
      size        : 1
      transparent : true
      depthWrite  : false
      depthTest   : false
      fog         : false

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

  createSpecialMesh: ->

    @nebula = new THREE.Object3D

    materialOptions =
      # map         : THREE.ImageUtils.loadTexture 'images/viel-nebula.jpg'
      # blending    : THREE.AdditiveBlending
      side        : THREE.DoubleSide
      wireframe   : true

    geometry = new THREE.ParametricGeometry @radialWave, 100, 100, false
    material = new THREE.MeshBasicMaterial materialOptions
    mesh     = new THREE.Mesh geometry, material
    matrix   = new THREE.Matrix4

    geometry.applyMatrix matrix.makeTranslation -( @meshRadius / 2 ), 0, -( @meshRadius / 2 )

    @nebula.add mesh
    
    Scene.add @nebula

  radialWave: ( u, v ) =>

    x = Math.sin( u ) * @meshRadius
    z = Math.sin( v ) * @meshRadius
    y = ( Math.sin( u * 4 * Math.PI ) + Math.cos( v * 6 * Math.PI ) ) * @randomNumber( 3, 6 )

    vector = new THREE.Vector3 x, y, z
    
    return vector

  createFaceArray: ->

    for vertex, i in @nebula.children[0].geometry.vertices

      if i is @nebula.children[0].geometry.vertices.length - 1

        arr.push vertex

      if i % 3 is 0

        @faces.push arr unless i is 0

        arr = []

      arr.push vertex

  tweenFaces: ->

    for face, i in @faces

      for vertex in face

        params =
          x      : vertex.x + 0.5
          z      : vertex.x + 0.5
          delay  : i * 0.01
          ease   : Power1.easeInOut
          repeat : -1
          yoyo   : true

        TweenMax.to vertex, 3, params

  randomNumber: ( min, max ) ->

    return ( Math.random() * ( max - min + 1 ) ) + min

  update: ( time ) =>

    for plane in @nebula.children
      
      plane.geometry.verticesNeedUpdate = true

      # for vertex in plane.geometry.vertices

      #   vertex.y = vertex.at

