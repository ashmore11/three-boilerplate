win         = require 'utils/window'
Settings    = require 'settings'
RAF         = require 'utils/raf'
Scene       = require 'helpers/scene'
Camera      = require 'helpers/camera'
Renderer    = require 'helpers/renderer'
RandomColor = require 'randomcolor'
Mouse       = require 'utils/mouse'

module.exports = class Index

  faces: []

  constructor: ->

    @innerSphere()
    @outerSphere()
    @seperateGeometry()
    @getFaces()
    @getNewPosition()
    @colorFaces()
    @tweenFaces()

    @groupedObjects = new THREE.Object3D

    @groupedObjects.add @glowBall
    @groupedObjects.add @mainSphere

    Scene.add @groupedObjects

    RAF.on 'tick', @update

  innerSphere: ->

    materialOptions =
      uniforms       : {}
      vertexShader   : $('#vertexShader').text()
      fragmentShader : $('#fragmentShader').text()
      side           : THREE.BackSide
      blending       : THREE.AdditiveBlending
      transparent    : true

    geometry  = new THREE.SphereGeometry 18, 32, 32
    material  = new THREE.ShaderMaterial materialOptions
    @glowBall = new THREE.Mesh geometry, material

  outerSphere: ->

    materialOptions =
      color        : 0xffffff
      wireframe    : false
      side         : THREE.DoubleSide
      vertexColors : THREE.FaceColors

    geometry    = new THREE.SphereGeometry 20, 8, 8
    material    = new THREE.MeshLambertMaterial materialOptions
    @mainSphere = new THREE.Mesh geometry, material

    @mainSphere.castShadow    = true
    @mainSphere.receiveShadow = true

  seperateGeometry: ->

    geometry = @mainSphere.geometry
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

    for vertex, i in @mainSphere.geometry.vertices

      if i % 3 is 0

        @faces.push arr unless i is 0

        arr = []

      arr.push vertex

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

    for face in @mainSphere.geometry.faces

      color = RandomColor( hue: 'red', luminosity: 'bright' ).split('#')[1]

      face.color.setHex "0x#{color}"

  tweenFaces: ->

    for face, i in @faces

      for vertex in face
          
        x = vertex.x
        y = vertex.y
        z = vertex.z

        params =
          x      : vertex.x + face.diff.x * 4
          y      : vertex.y + face.diff.y * 4
          z      : vertex.z + face.diff.z * 4
          delay  : i * 0.005
          ease   : Power1.easeInOut
          repeat : -1
          yoyo   : true

        TweenMax.to vertex, 0.5, params

  update: ( time ) =>

    @mainSphere.rotation.y -= 0.01

    @mainSphere.geometry.verticesNeedUpdate = true
    @mainSphere.geometry.colorsNeedUpdate   = true
      
    @mainSphere.scale.x = 0.05 * Math.sin( time / 500 ) + 1.05
    @mainSphere.scale.y = 0.05 * Math.sin( time / 500 ) + 1.05
    @mainSphere.scale.z = 0.05 * Math.sin( time / 500 ) + 1.05
