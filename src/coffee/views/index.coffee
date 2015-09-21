win         = require 'utils/window'
Settings    = require 'settings'
RAF         = require 'utils/raf'
Scene       = require 'helpers/scene'
Camera      = require 'helpers/camera'
Renderer    = require 'helpers/renderer'
RandomColor = require 'randomcolor'

module.exports = class Index

  avgVertexNormals: []
  faces: []
  postprocessing:
    enabled : true

  sunPosition: new THREE.Vector3 0, 0, 0
  screenSpacePosition: new THREE.Vector3
  materialDepth: new THREE.MeshDepthMaterial

  constructor: ->

    geometry = new THREE.IcosahedronGeometry 20, 0

    materialOptions =
      color        : 0xffffff
      wireframe    : false
      side         : THREE.DoubleSide
      vertexColors : THREE.FaceColors

    material = new THREE.MeshLambertMaterial materialOptions

    @icosahedron = new THREE.Mesh geometry, material

    Scene.add @icosahedron

    @innerSphere()
    @seperateGeometry()
    @getFaces()
    @getNewPosition()
    @colorFaces()
    @initPostprocessing()

    RAF.on 'tick', @update

  innerSphere: ->

    geometry = new THREE.SphereGeometry 15, 64, 64
    material = new THREE.MeshBasicMaterial color: 0xffffff
    mesh     = new THREE.Mesh geometry, material

    Scene.add mesh

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

      color = RandomColor( hue: 'monochrome' ).split('#')[1]

      face.color.setHex "0x#{color}"

  initPostprocessing: ->

    @postprocessing.scene = new THREE.Scene

    @postprocessing.camera = new THREE.OrthographicCamera(
      win.width / -2,
      win.width / 2, 
      win.height / 2,
      win.height / -2
    )

    @postprocessing.camera.position.z = 100

    @postprocessing.scene.add( @postprocessing.camera )

    pars = 
      minFilter : THREE.LinearFilter
      magFilter : THREE.LinearFilter
      format    : THREE.RGBFormat

    @postprocessing.rtTextureColors = new THREE.WebGLRenderTarget( win.width, win.height, pars )

    # Switching the depth formats to luminance from rgb doesn't seem to work. I didn't
    # investigate further for now.
    # pars.format = THREE.LuminanceFormat

    # I would have this quarter size and use it as one of the ping-pong render
    # targets but the aliasing causes some temporal flickering

    @postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget( win.width, win.height, pars )

    # Aggressive downsize god-ray ping-pong render targets to minimize cost

    w = win.width  / 4
    h = win.height / 4

    @postprocessing.rtTextureGodRays1 = new THREE.WebGLRenderTarget( w, h, pars )
    @postprocessing.rtTextureGodRays2 = new THREE.WebGLRenderTarget( w, h, pars )

    # god-ray shaders

    godraysGenShader = THREE.ShaderGodRays[ "godrays_generate" ]
    @postprocessing.godrayGenUniforms = THREE.UniformsUtils.clone( godraysGenShader.uniforms )
    @postprocessing.materialGodraysGenerate = new THREE.ShaderMaterial
      uniforms       : @postprocessing.godrayGenUniforms,
      vertexShader   : godraysGenShader.vertexShader,
      fragmentShader : godraysGenShader.fragmentShader

    godraysCombineShader = THREE.ShaderGodRays[ "godrays_combine" ]
    @postprocessing.godrayCombineUniforms = THREE.UniformsUtils.clone( godraysCombineShader.uniforms )
    @postprocessing.materialGodraysCombine = new THREE.ShaderMaterial
      uniforms       : @postprocessing.godrayCombineUniforms,
      vertexShader   : godraysCombineShader.vertexShader,
      fragmentShader : godraysCombineShader.fragmentShader

    @postprocessing.godrayCombineUniforms.fGodRayIntensity.value = 0.5

    @postprocessing.quad = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( win.width, win.height ),
      @postprocessing.materialGodraysGenerate
    )

    @postprocessing.quad.position.z = 0
    @postprocessing.scene.add( @postprocessing.quad )

  update: ( time ) =>

    @icosahedron.rotation.y += 0.0075

    for face, i in @faces

      for vertex in face
          
        vertex.x += ( face.diff.x * 0.01 ) * Math.sin( time / 500 )
        vertex.y += ( face.diff.y * 0.01 ) * Math.sin( time / 500 )
        vertex.z += ( face.diff.z * 0.01 ) * Math.sin( time / 500 )

    @icosahedron.geometry.verticesNeedUpdate = true
    @icosahedron.geometry.colorsNeedUpdate   = true

    if @postprocessing.enabled

      @postProcessUpdate()

    else

      Renderer.setViewport 0, 0, win.width, win.height
      Renderer.setScissor  0, 0, win.width, win.height

      Renderer.enableScissorTest true

      Renderer.render Scene, Camera

  postProcessUpdate: ->

    # Colors
    Renderer.render( Scene, Camera, @postprocessing.rtTextureColors )

    # Depth
    Renderer.render( Scene, Camera, @postprocessing.rtTextureDepth, true )

    # -- Render god-rays --

    # Maximum length of god-rays (in texture space [0,1]X[0,1])

    filterLen = 1

    # Samples taken by filter

    TAPS_PER_PASS = 6

    # Pass order could equivalently be 3,2,1 (instead of 1,2,3), which
    # would start with a small filter support and grow to large. however
    # the large-to-small order produces less objectionable aliasing artifacts that
    # appear as a glimmer along the length of the beams

    # pass 1 - render into first ping-pong target

    pass    = 1
    stepLen = filterLen * Math.pow( TAPS_PER_PASS, -pass )

    @postprocessing.godrayGenUniforms[ "fStepSize" ].value = stepLen
    @postprocessing.godrayGenUniforms[ "tInput" ].value    = @postprocessing.rtTextureDepth

    @postprocessing.scene.overrideMaterial = @postprocessing.materialGodraysGenerate

    Renderer.render( @postprocessing.scene, @postprocessing.camera, @postprocessing.rtTextureGodRays2 )

    # pass 2 - render into second ping-pong target

    pass    = 2
    stepLen = filterLen * Math.pow( TAPS_PER_PASS, -pass )

    @postprocessing.godrayGenUniforms[ "fStepSize" ].value = stepLen
    @postprocessing.godrayGenUniforms[ "tInput" ].value    = @postprocessing.rtTextureGodRays2

    Renderer.render( @postprocessing.scene, @postprocessing.camera, @postprocessing.rtTextureGodRays1  )

    # pass 3 - 1st RT

    pass    = 3
    stepLen = filterLen * Math.pow( TAPS_PER_PASS, -pass )

    @postprocessing.godrayGenUniforms[ "fStepSize" ].value = stepLen
    @postprocessing.godrayGenUniforms[ "tInput" ].value    = @postprocessing.rtTextureGodRays1

    Renderer.render( @postprocessing.scene, @postprocessing.camera, @postprocessing.rtTextureGodRays2  )

    # final pass - composite god-rays onto colors

    @postprocessing.godrayCombineUniforms["tColors"].value  = @postprocessing.rtTextureColors
    @postprocessing.godrayCombineUniforms["tGodRays"].value = @postprocessing.rtTextureGodRays2

    @postprocessing.scene.overrideMaterial = @postprocessing.materialGodraysCombine

    Renderer.render( @postprocessing.scene, @postprocessing.camera )
