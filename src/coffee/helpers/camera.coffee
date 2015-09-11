RAF = require 'utils/raf'
win = require 'utils/window'

class Camera

  camera: null

  constructor: ->

    @camera = new THREE.PerspectiveCamera( 65, win.width / win.height, 0.1, 100000 )

    @camera.position.set 60, 45, 60
    @camera.lookAt new THREE.Vector3

    RAF.on 'update', @update

  update: =>

    @camera.updateProjectionMatrix()

module.exports = new Camera