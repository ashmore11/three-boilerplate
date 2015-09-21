Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'

module.exports = class Index

  avgVertexNormals: []
  faces: []

  constructor: ->

    geometry     = new THREE.IcosahedronGeometry 20, 0
    material     = new THREE.MeshNormalMaterial color: 0xffffff, wireframe: true, side: THREE.DoubleSide
    @icosahedron = new THREE.Mesh geometry, material

    Scene.add @icosahedron

    @seperateGeometry()
    @getAverage()
    @getFaces()

    RAF.on 'tick', @update

  seperateGeometry: ->

    geometry = @icosahedron.geometry
    vertices = []

    for i in [0...geometry.faces.length]

      n = vertices.length

      face = geometry.faces[ i ]

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

  getAverage: ->
    
    for i in [0...@icosahedron.geometry.vertices.length]
      
      @avgVertexNormals.push new THREE.Vector3

    # first add all the normals
    for face in @icosahedron.geometry.faces

      va = face.vertexNormals[ 0 ]
      vb = face.vertexNormals[ 1 ]
      vc = face.vertexNormals[ 2 ]
      
      # add the vectors
      @avgVertexNormals[ face.a ].add va
      @avgVertexNormals[ face.b ].add vb
      @avgVertexNormals[ face.c ].add vc

  getFaces: ->

    for vertex, i in @icosahedron.geometry.vertices

      if i % 3 is 0

        @faces.push faceGroup unless i is 0

        faceGroup = []

      vertex.index = i

      faceGroup.push vertex

    @tweenFaces()

  tweenFaces: ->

    for face, i in @faces

      for vertex in face
          
        x = vertex.x
        y = vertex.y
        z = vertex.z

        params =
          x     : x + @avgVertexNormals[ vertex.index ].x * 10
          y     : y + @avgVertexNormals[ vertex.index ].y * 10
          z     : z + @avgVertexNormals[ vertex.index ].z * 10
          delay : i * 0.1
          ease  : Power1.easeInOut

        TweenMax.to vertex, 0.5, params

  explodeGeometry: ->

    for face, i in @faces

      if i % 3 is 0

        for vertex in face
            
          vertex.x += @avgVertexNormals[ vertex.index ].x * 0.02
          vertex.y += @avgVertexNormals[ vertex.index ].y * 0.02
          vertex.z += @avgVertexNormals[ vertex.index ].z * 0.02

  update: ( time ) =>

    # @explodeGeometry()

    # @icosahedron.rotation.y += 0.01

    @icosahedron.geometry.verticesNeedUpdate = true