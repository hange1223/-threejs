var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()
var composer = {}
var renderPass = {}
var outlinePass = {}
var effectFXAA = {}

function getTargets (event, arr) {
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  mouse.set(mouse.x, mouse.y, 0.5)
  raycaster.setFromCamera(mouse, camera)
  return raycaster.intersectObjects(arr, true)
}
function initComposer () {
  composer = new THREE.EffectComposer(renderer)
  renderPass = new THREE.RenderPass(scene, camera) // 这个通道会渲染场景，但不会讲渲染结果输出到屏幕上。
  composer.addPass(renderPass)
  outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
  outlinePass.edgeStrength = 3// 包围线浓度
  outlinePass.edgeGlow = 0.5// 边缘线范围
  outlinePass.edgeThickness = 1// 边缘线浓度
  outlinePass.pulsePeriod = 2// 包围线闪烁评率
  outlinePass.visibleEdgeColor.set('#ffffff')// 包围线颜色
  outlinePass.hiddenEdgeColor.set('#190a05')// 被遮挡的边界线颜色
  composer.addPass(outlinePass)
  effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
  effectFXAA.uniforms[ 'resolution' ].value.set(1 / window.innerWidth, 1 / window.innerHeight)
  effectFXAA.renderToScreen = true
  composer.addPass(effectFXAA)
}
function onClick (event) {
  let arr = [...model.doorWindow].concat(model.boxs)
  let targets = getTargets(event, arr)
  if (targets.length) {
    $('#label').html(targets[0].object.name).css({top: (event.clientY - $('#label').outerHeight()) + 'px', left: (event.clientX + 10) + 'px'})
    outlinePass.selectedObjects = [targets[0].object]
  } else {
    outlinePass.selectedObjects = []
    $('#label').css({top: '-200px', left: '-200px'})
  }
  if (targets[0] && targets[0].object.name === '门左') {
    new TWEEN.Tween(targets[0].object.rotation).to({
      y: -0.5 * Math.PI
    }, 5000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
    }).start()
  }
  if (targets[0] && targets[0].object.name === '门右') {
    new TWEEN.Tween(targets[0].object.rotation).to({
      y: 0.5 * Math.PI
    }, 5000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
    }).start()
  }
  if (targets[0] && targets[0].object.name === '地面') {
    console.log(3333)
  }
}
function onMouseMove (event) {
  $('#label').css({top: '-200px', left: '-200px'})
  let targets = getTargets(event, model.doorWindow)
  if (targets.length) {
    outlinePass.selectedObjects = [targets[0].object]
  } else {

  }
}
// window.addEventListener('mousemove', onMouseMove)
window.addEventListener('click', onClick)
