win         = require 'utils/window'
Settings    = require 'settings'
RAF         = require 'utils/raf'
Scene       = require 'helpers/scene'
Camera      = require 'helpers/camera'
Renderer    = require 'helpers/renderer'
RandomColor = require 'randomcolor'

module.exports = class Index

  faces: []

  constructor: ->

    geometry = new THREE.SphereGeometry 20, 64, 64

    materialOptions =
      color        : 0xffffff
      wireframe    : false
      side         : THREE.DoubleSide
      vertexColors : THREE.FaceColors

    material = new THREE.MeshLambertMaterial materialOptions

    @icosahedron = new THREE.Mesh geometry, material

    @icosahedron.castShadow = true
    @icosahedron.receiveShadow = true

    Scene.add @icosahedron

    @innerSphere()
    @seperateGeometry()
    @getFaces()
    @getNewPosition()
    @colorFaces()
    @tweenFaces()

    RAF.on 'tick', @update

  innerSphere: ->

    geometry     = new THREE.SphereGeometry 19.9, 32, 32
    material     = new THREE.MeshBasicMaterial color: 0xffffff
    @innerSphere = new THREE.Mesh geometry, material

    @innerSphere.receiveShadow = true

    Scene.add @innerSphere

  seperateGeometry: ->

    geometry = @icosahedron.geometry
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

  getFaces: ->

    for vertex, i in @icosahedron.geometry.vertices

      if i % 3 is 0

        @faces.push faceGroup unless i is 0

        faceGroup = []

      if i is 57

        faceGroup = []

        @faces.push faceGroup

      faceGroup.push vertex

  getNewPosition: ->

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

  colorFaces: ->

    for face in @icosahedron.geometry.faces

      color = RandomColor( hue: 'red', luminosity: 'bright' ).split('#')[1]

      face.color.setHex "0x#{color}"

  tweenFaces: ->

    for face, i in @faces

      if i % 5 is 0

        for vertex in face
            
          x = vertex.x
          y = vertex.y
          z = vertex.z

          params =
            x      : vertex.x + face.diff.x * 4
            y      : vertex.y + face.diff.y * 4
            z      : vertex.z + face.diff.z * 4
            delay  : i * 0.001
            ease   : Power1.easeInOut
            # repeat : 4
            # yoyo   : true

          TweenMax.to vertex, 0.5, params

  update: ( time ) =>

    @icosahedron.rotation.y -= 0.005

    @icosahedron.geometry.verticesNeedUpdate = true
    @icosahedron.geometry.colorsNeedUpdate   = true
      
