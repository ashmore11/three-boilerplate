Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'

module.exports = class Index

  constructor: ->

    geometry = new THREE.SphereGeometry 5, 32, 32
    material = new THREE.MeshLambertMaterial 0xffffff
    mesh     = new THREE.Mesh geometry, material

    Scene.add mesh

    RAF.on 'tick', @update

  update: =>

    console.log 'update'