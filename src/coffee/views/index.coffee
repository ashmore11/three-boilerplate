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

      faceGroup = []

      if i % 3 is 0

        faceGroup.push vertex

      @faces.push faceGroup

    console.log @faces

  explodeGeometry: ->

    # for vertex, i in @icosahedron.geometry.vertices
        
    #   vertex.x += @avgVertexNormals[ i ].x * 0.02 * -1
    #   vertex.y += @avgVertexNormals[ i ].y * 0.02 * -1
    #   vertex.z += @avgVertexNormals[ i ].z * 0.02 * -1

  update: ( time ) =>

    @explodeGeometry()

    # @icosahedron.rotation.y += 0.01

    @icosahedron.geometry.verticesNeedUpdate = true