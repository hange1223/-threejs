
function moveItem () {
  let opt = {
    mtlBaseUrl: './model/robot/',
    mtlPath: 'model/robot/',
    mtlFileName: 'FDS.mtl',
    objPath: 'model/robot/',
    objFileName: 'FDS.obj',
    completeCallback: function (object) {
      object.scale.x = 1// 缩放级别
      object.scale.y = 1// 缩放级别
      object.scale.z = 1// 缩放级别
      object.rotation.y = Math.PI// 缩放级别
      object.position.set(-700, 120, 0)
      scene.add(object)
      $('#btn').click(function () {
        // moveFlash(object, 'z', 450, 5000, 0)
        // moveFlash(object, 'x', -300, 5000, 5)
        // moveFlash(object, 'z', 150, 5000, 10)
        // moveFlash(object, 'x', -700, 5000, 15)
        // moveFlash(object, 'z', -150, 5000, 20)
        // moveFlash(object, 'x', -300, 5000, 25)
        // moveFlash(object, 'z', -450, 5000, 30)
        // moveFlash(object, 'x', -700, 5000, 35)
        // moveFlash(object, 'z', 700, 5000, 40)
        onMove(object, -700, 700, 4000)
      })
    }
  }
  createMtlObj(opt)
}
function createMtlObj (options) {
  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.setBaseUrl(options.mtlBaseUrl)// 设置材质路径
  mtlLoader.setPath(options.mtlPath)// 设置mtl文件路径
  mtlLoader.load(options.mtlFileName, function (materials) {
    materials.preload()
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(materials)// 设置三维对象材质库
    objLoader.setPath(options.objPath)// 设置obj文件所在目录
    objLoader.load(options.objFileName, function (object) {
      if (typeof options.completeCallback === 'function') {
        options.completeCallback(object)
      }
    }, function (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100
        if (typeof options.progress === 'function') {
          options.progress(Math.round(percentComplete, 2))
        }
        // console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    }, function (error) {})
  })
}
function onMove (object, x, z, time, delay) {
  delay = delay || 0;
  let num = 0;
  for (let i = 1; i < 2; i++) {
    moveFlash(object, 'z', z - 300 * i, time, time / 1000 * num + delay)
    num++
    rotationFlash(object, (i % 2) === 1 ? -Math.PI / 2 : Math.PI / 2, time, time / 1000 * num + delay)
    num++
    moveFlash(object, 'x', x + 400 * (i % 2), time, time / 1000 * num + delay)
    num++
    if (i !== 4) {
      rotationFlash(object, (i % 2) === 1 ? Math.PI / 2 : -Math.PI / 2, time, time / 1000 * num + delay)
      num++
    }
  }
  rotationFlash(object, Math.PI / 2, time, time / 1000 * num + delay)
  num++
  moveFlash(object, 'z', z, time, time / 1000 * num)
  num++
  rotationFlash(object, Math.PI, time, time / 1000 * num + delay)
}
function moveFlash (item, attr, value, time, delay) {
  console.log();
  setTimeout(function () {
    let ov = item.position[attr]
    let nv = value
    let times = time / 10
    let step = (nv - ov) / times
    for (let i = 0; i < times + 1; i++) {
      setTimeout(function () {
        let obj = Object.assign({}, item.position)
        obj[attr] += step
        item.position.set(obj.x, obj.y, obj.z)
      }, i * 10)
    }
  }, delay * 1000)
}
function rotationFlash (item, value, time, delay) {
  setTimeout(function () {
    let times = time / 10
    let step = value / times
    for (let i = 0; i < times + 1; i++) {
      setTimeout(function () {
        item.rotation.y += step
      }, i * 10)
    }
  }, delay * 1000)
}
