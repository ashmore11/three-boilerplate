RAF      = require 'utils/raf'
Camera   = require 'helpers/camera'

class Controls

  controls: null

  constructor: ->

    @controls = new THREE.TrackballControls Camera.camera, $('canvas')[0]

    @controls.rotateSpeed          = 1.0
    @controls.zoomSpeed            = 1.2
    @controls.panSpeed             = 0.8
    @controls.noZoom               = false
    @controls.noPan                = false
    @controls.staticMoving         = true
    @controls.dynamicDampingFactor = 0.5

    RAF.on 'update', @update

  update: =>

    @controls.update()

module.exports = new Controls