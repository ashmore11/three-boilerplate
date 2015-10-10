Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'
Camera   = require 'helpers/camera'
Controls = require 'helpers/controls'
dat      = require 'dat-gui'

module.exports = class Index

  planeCount: 200
  
  rotTweenComplete: true
  transparentEdges: true
  introTweenComplete: false
  
  scale:
    x: 1.2
    y: 1.2
    z: 1.2

  materialOptions:
    side        : THREE.DoubleSide
    transparent : true
    depthWrite  : false
    depthTest   : false
    wireframe   : true

  materialType: [
    THREE.MeshBasicMaterial
    THREE.MeshNormalMaterial
  ]

  constructor: ->

    @createPlanes()
    @tweenPlanes()
    @tweenCamera()
    @gui()

    RAF.on 'tick', @update

  createPlanes: ->

    @planes = new THREE.Object3D

    for i in [0...@planeCount]

      geometry = new THREE.PlaneGeometry 100, 100, 1, 1
      material = new THREE.MeshNormalMaterial @materialOptions
      mesh     = new THREE.Mesh geometry, material

      mesh.rotation.x = i * ( Math.PI * 2 ) / @planeCount
      mesh.dynamic    = true

      @planes.add mesh

    Scene.add @planes

  tweenPlanes: ->

    for plane, i in @planes.children

      params =
        x      : @scale.x
        y      : @scale.y
        z      : @scale.z
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

    @planes.rotation.y = -( Math.PI / 4 )

    params =
      y    : Math.PI / 12
      ease : Power4.easeInOut
      onComplete: => 

        @introTweenComplete = true

    TweenMax.to @planes.rotation, 2, params

  spinAxis: =>

    return unless @rotTweenComplete

    @rotTweenComplete = false

    count = 0

    for plane, i in @planes.children

      params =
        z         : Math.PI * 2
        ease      : Power1.easeInOut
        delay     : i * 0.005
        onComplete: =>

          count++

          if count is @planeCount

            @rotTweenComplete = true
            plane.rotation.z  = 0 for plane in @planes.children

      TweenMax.to plane.rotation, 5, params

  sideView: ->

    params =
      x    : 200
      y    : 0
      z    : -53
      ease : Power4.easeInOut

    TweenMax.to Camera.position, 2, params

  upView: ->

    params =
      x    : 136
      y    : 151
      z    : -36
      ease : Power4.easeInOut

    TweenMax.to Camera.position, 2, params

  originalView: ->

    params =
      x    : 150
      y    : 0
      z    : 150
      ease : Power4.easeInOut

    TweenMax.to Camera.position, 2, params

  updateMaterial: ( material ) =>

    for plane in @planes.children

      plane.material = new THREE[material] @materialOptions

  update: ( time ) =>

    Controls.enabled = @introTweenComplete

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

      if @transparentEdges
        
        plane.material.opacity = cosA

      else

        plane.material.opacity = 1

  gui: ->

    gui = new dat.GUI

    material = gui.add @, "materialType", ['MeshNormalMaterial', 'MeshBasicMaterial']
    material.onChange ( value ) => @updateMaterial value

    edges = gui.add( @, 'transparentEdges' ).listen()
    edges.onChange ( value ) => @transparentEdges = value

    gui.add @, 'spinAxis'
    gui.add @, 'sideView'
    gui.add @, 'upView'
    gui.add @, 'originalView'
