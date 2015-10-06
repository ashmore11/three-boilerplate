Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'

module.exports = class Index

  count: 200
  rotTweenComplete: true

  constructor: ->

    @createPlanes()
    @tweenPlanes()
    @tweenCamera()

    $('#trig-rot span').on 'click', @tweenRotation

    RAF.on 'tick', @update

  createPlanes: ->

    @planes = new THREE.Object3D

    for i in [0...@count]

      geometry = new THREE.PlaneGeometry 100, 100, 1, 1

      options =
        side        : THREE.DoubleSide
        transparent : true
        depthWrite  : false
        depthTest   : false
        wireframe   : true
      
      material = new THREE.MeshNormalMaterial options
      mesh     = new THREE.Mesh geometry, material

      mesh.rotation.x = i * ( Math.PI * 2 ) / @count

      @planes.add mesh

    Scene.add @planes

  tweenPlanes: ->

    for plane, i in @planes.children

      params =
        x      : 1.3
        y      : 1.3
        z      : 1.3
        ease   : Power1.easeInOut
        delay  : i * 0.05
        yoyo   : true
        repeat : -1

      TweenMax.to plane.scale, 1, params

  tweenCamera: ->

    params =
      x    : 150
      z    : 150
      ease : Power4.easeInOut

    TweenMax.to Camera.position, 2, params

  tweenRotation: =>

    return unless @rotTweenComplete

    @rotTweenComplete = false

    count = 0

    for plane, i in @planes.children

      params =
        z         : i * ( Math.PI * 2 ) / @count
        ease      : Expo.easeInOut
        delay     : i * 0.005
        yoyo      : true
        repeat    : 1
        onComplete: =>

          count++

          @rotTweenComplete = true if count is @count

      TweenMax.to plane.rotation, 5, params

  update: ( time ) =>

    for plane in @planes.children

      normal = plane.geometry.faces[0].normal

      # The vector perpendicular to the plane
      v1 = normal.clone().applyMatrix4( plane.matrix )

      # The vector from the plane to the camera
      v2 = Camera.position.clone().sub( plane.position ).normalize()

      # Cosign of the angle between vector1 and vector2
      cosA = v1.dot v2

      # Normalize the value to be between 0 and 1
      if cosA < 0 then cosA = cosA * -1

      # Set the opacity of the material with the result
      plane.material.opacity = cosA
