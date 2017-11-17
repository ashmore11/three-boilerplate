spotLight1 = new THREE.SpotLight 0xffffff
spotLight1.position.set 30, 100, 30

spotLight2 = new THREE.SpotLight 0xffffff, 0
spotLight2.position.set 0, 100, 0

spotLight2.castShadow        = true
spotLight2.shadow.camera.fov = 25

pointLight1 = new THREE.PointLight 0xffffff
pointLight1.position.set 0, 0, 0

module.exports =
  spotLights  : [ spotLight1, spotLight2 ]
  pointLights : [ pointLight1 ]