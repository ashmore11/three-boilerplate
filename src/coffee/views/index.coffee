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

    @createStarfield()
    @createSpecialMesh()
    @explodeGeometry()
    @createFaceArray()
    @getNewVectorPos()
    # @colorFaces()
    @tweenFaces()

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

  createSpecialMesh: ->

    @nebula = new THREE.Object3D

    geometry = new THREE.ParametricGeometry @radialWave, 50, 50, false
    material = new THREE.MeshBasicMaterial wireframe: true, side: THREE.DoubleSide
    mesh     = new THREE.Mesh geometry, material
    matrix   = new THREE.Matrix4

    geometry.applyMatrix matrix.makeTranslation -( 250 / 2 ), 0, -( 250 / 2 )

    @nebula.add mesh
    
    Scene.add @nebula

    for mesh in @nebula.children

      for vertex, i in mesh.geometry.vertices

        if i is 0

          console.log vertex.y

  radialWave: ( u, v ) =>

    x = Math.sin( u ) * @meshRadius
    z = Math.sin( v ) * @meshRadius
    y = ( Math.sin( u * 4 * Math.PI ) + Math.cos( v * 6 * Math.PI ) ) * 6

    vector = new THREE.Vector3 x, y, z
    
    return vector

  explodeGeometry: ->

    geometry = @nebula.children[0].geometry
    vertices = []

    for face, i in geometry.faces

      n = vertices.length

      a = face.a
      b = face.b
      c = face.c

      va = geometry.vertices[ a ]
      vb = geometry.vertices[ b ]
      vc = geometry.vertices[ c ]

      vertices.push va.clone()
      vertices.push vb.clone()
      vertices.push vc.clone()

      face.a = n
      face.b = n + 1
      face.c = n + 2

    geometry.vertices = vertices

  createFaceArray: ->

    for vertex, i in @nebula.children[0].geometry.vertices

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
      diff.multiplyScalar 10

      face.diff = diff

  colorFaces: ->

    for face in @nebula.children[0].geometry.faces

      color = RandomColor( hue: 'red', luminosity: 'bright' ).split('#')[1]

      face.color.setHex "0x#{color}"

  tweenFaces: ->

    for face, i in @faces

      for vertex in face

        params =
          y      : vertex.y + face.diff.y
          delay  : 0
          ease   : Power1.easeInOut
          repeat : -1
          yoyo   : true

        TweenMax.to vertex, 1, params

  update: ( time ) =>

    @nebula.children[0].geometry.verticesNeedUpdate = true

