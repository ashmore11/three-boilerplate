Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'

module.exports = class Index

  avgVertexNormals: []
  faces: []

  constructor: ->

    geometry = new THREE.SphereGeometry 15, 64, 64
    material = new THREE.MeshBasicMaterial color: 0xffffff
    @sphere  = new THREE.Mesh geometry, material

    Scene.add @sphere

    geometry     = new THREE.IcosahedronGeometry 20, 0
    material     = new THREE.MeshPhongMaterial color: 0xffffff, wireframe: false, side: THREE.DoubleSide
    @icosahedron = new THREE.Mesh geometry, material

    Scene.add @icosahedron

    @seperateGeometry()
    # @getAverage()
    @getFaces()
    # @tweenFaces()

    @icosahedron.position.x = 0

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

  getFaces: ->

    faceGroup = []

    for vertex, i in @icosahedron.geometry.vertices

      if i % 3 is 0

        @faces.push faceGroup unless i is 0

        faceGroup = []

      if i is 57

        vertex.index = i

        faceGroup = []

        faceGroup.push vertex

        @faces.push faceGroup

      else

        vertex.index = i

        faceGroup.push vertex

    for face in @faces

      cx = ( face[0].x + face[1].x + face[2].x ) / 3
      cy = ( face[0].y + face[1].y + face[2].y ) / 3
      cz = ( face[0].z + face[1].z + face[2].z ) / 3

      center = new THREE.Vector3 cx, cy, cz
      diff   = center.sub Scene.position
      length = diff.length()

      diff.normalize()
      diff.multiplyScalar 2

      face.diff = diff

      # for vertex in face

      #   vertex.add diff

  tweenFaces: ->

    for face, i in @faces

      for vertex in face
          
        x = vertex.x
        y = vertex.y
        z = vertex.z

        params =
          x     : x + face.diff.x
          y     : y + face.diff.y
          z     : z + face.diff.z
          delay : i * 0.05
          ease  : Expo.easeInOut

        TweenMax.to vertex, 2, params

  update: ( time ) =>

    @icosahedron.rotation.y += 0.01

    for face, i in @faces

      for vertex in face
          
        vertex.x += ( ( face.diff.x * 0.01 ) * Math.sin(time / 500) )
        vertex.y += ( ( face.diff.y * 0.01 ) * Math.sin(time / 500) )
        vertex.z += ( ( face.diff.z * 0.01 ) * Math.sin(time / 500) )

    @icosahedron.geometry.verticesNeedUpdate = true