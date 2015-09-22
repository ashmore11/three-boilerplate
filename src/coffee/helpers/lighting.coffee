spotLight1 = new THREE.SpotLight 0xffffff
spotLight1.position.set 0, 100, 0

spotLight2 = new THREE.SpotLight 0xffffff, 0
spotLight2.position.set 0, 100, 0

spotLight2.castShadow      = true
spotLight2.shadowDarkness  = 0.2
spotLight2.shadowCameraFov = 25

pointLight1 = new THREE.PointLight 0xffffff
pointLight1.position.set 0, 0, 0

lights =
  spotLights  : [ spotLight1, spotLight2 ]
  pointLights : [ pointLight1 ]

module.exports = lights