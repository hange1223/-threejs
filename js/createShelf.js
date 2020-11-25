let shelfMat = {
  box: new THREE.MeshLambertMaterial({ color: 0xfeb74c, map: new THREE.TextureLoader().load('./ThreeJs/images/box.png') }),
  board: [
    new THREE.MeshPhongMaterial({ color: 0x1C7CD8 }),
    new THREE.MeshPhongMaterial({ color: 0x1C7CD8 }),
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./ThreeJs/images/rack.png', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(1, 2)
    })}),
    new THREE.MeshPhongMaterial({ color: 0x1C7CD8 }),
    new THREE.MeshPhongMaterial({ color: 0x1C7CD8 }),
    new THREE.MeshPhongMaterial({ color: 0x1C7CD8 })
  ],
  leg: new THREE.MeshPhongMaterial({color: 0x1C86EE}),
  // line: new THREE.MeshBasicMaterial({ opacity: 1.0, transparent: true, map: new THREE.TextureLoader().load('./ThreeJs/images/plane.png') })
  line: new THREE.MeshPhongMaterial({ color: 0x00ff00 })
}

function addShelf () {
  createShelf(-500)
  createShelf(0)
  createShelf(500)
  onDrag()
}

function createShelf (x) {
  scene.add(createShelfItem('line', [x - 200, 2, 0], [1600, 4, 10]))
  scene.add(createShelfItem('line', [x + 200, 2, 0], [1600, 4, 10]))
  scene.add(createShelfItem('line', [x, 2, 800], [10, 4, 400]))
  scene.add(createShelfItem('line', [x, 2, -800], [10, 4, 400]))
  for (let i = 1; i < 6; i++) {
    for (let j = 1; j < 4; j++) {
      createOneShelf([x, j * 80, -900 + i * 300], i + '-' + j)
    }
  }
}

function createOneShelf (pos, name) {
  let arr = [
    createShelfItem('board', pos, [80, 5, 160]),
    createShelfItem('leg', [pos[0] - 77, pos[1] / 2, pos[2] - 37], [6, pos[1], 6]),
    createShelfItem('leg', [pos[0] - 77, pos[1] / 2, pos[2] + 37], [6, pos[1], 6]),
    createShelfItem('leg', [pos[0] + 77, pos[1] / 2, pos[2] - 37], [6, pos[1], 6]),
    createShelfItem('leg', [pos[0] + 77, pos[1] / 2, pos[2] + 37], [6, pos[1], 6]),
    createShelfItem('box', [pos[0] - 40, pos[1] + 25, pos[2]], [50, 50, 50], name + '-1#box'),
    createShelfItem('box', [pos[0] + 40, pos[1] + 25, pos[2]], [50, 50, 50], name + '-2#box')
  ]
  arr.forEach(e => {
    scene.add(e)
    if (e.name && e.name.includes('box')) {
      model.boxs ? model.boxs.push(e) : model.boxs = [e]
    }
  })
}

function createShelfItem (type, pos, size, name) {
  let item = createBoxGeometry({ size: size, material: shelfMat[type], pos: pos, angle: Math.PI / 2, name: name })
  return item
}

function onDrag () {
  var dragControls = new THREE.DragControls(model.boxs, camera, renderer.domElement)
  dragControls.addEventListener('dragstart', function () {
    controls.enabled = false
  })
  dragControls.addEventListener('dragend', function () {
    controls.enabled = true
  })
}
