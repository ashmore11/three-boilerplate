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
    @createFaceArray()
    @getNewVectorPos()
    @tweenFaces()

    RAF.on 'tick', @update

  createStarfield: ->

    @starfield = new THREE.Object3D

    Scene.add @starfield

    geometry = new THREE.Geometry

    options =
      map         : THREE.ImageUtils.loadTexture 'images/particle.png'
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

  createSpecialMesh: ->

    @nebula = new THREE.Object3D

    texture           = THREE.ImageUtils.loadTexture 'images/sea-texture.jpg'
    texture.minFilter = THREE.LinearFilter

    materialOptions =
      map         : texture
      blending    : THREE.AdditiveBlending
      side        : THREE.DoubleSide
      transparent : false
      wireframe   : false

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
    y = ( Math.sin( u * 4 * Math.PI ) + Math.cos( v * 6 * Math.PI ) ) * 2

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

  getNewVectorPos: ->

    for face in @faces

      cx = ( face[0].x + face[1].x + face[2].x ) / 3
      cy = ( face[0].y + face[1].y + face[2].y ) / 3
      cz = ( face[0].z + face[1].z + face[2].z ) / 3

      center = new THREE.Vector3 cx, cy, cz
      diff   = center.sub @nebula.children[0].position
      length = diff.length()

      diff.normalize()
      diff.multiplyScalar 20

      face.diff = diff

  tweenFaces: ->

    for face, i in @faces

      for vertex in face

        params =
          y      : vertex.y + 2
          delay  : i * 0.01
          ease   : Power1.easeInOut
          repeat : -1
          yoyo   : true

        TweenMax.to vertex, 3, params

  update: ( time ) =>

    @nebula.children[0].geometry.verticesNeedUpdate = true

