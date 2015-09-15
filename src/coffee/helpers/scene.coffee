Settings = require 'settings'

module.exports = new THREE.Scene

if Settings.fog
  
  module.exports.fog = new THREE.FogExp2 0xffffff, 0.005