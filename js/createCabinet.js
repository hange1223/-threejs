let shelfMat = {
  line: new THREE.MeshPhongMaterial({ color: '#deae24' }),
  cabinet: [
    new THREE.MeshLambertMaterial({ color: '#4a4948' }),
    new THREE.MeshLambertMaterial({ color: '#ffffff', map: new THREE.TextureLoader().load('./ThreeJs/images/jigui.png') }),
    new THREE.MeshLambertMaterial({ color: '#4a4948' }), 
    
    new THREE.MeshLambertMaterial({ color: '#4a4948' }),
    
    new THREE.MeshLambertMaterial({ color: '#4a4948' }),
    
    new THREE.MeshLambertMaterial({ color: '#4a4948' }), 
    
  ]
}

function addShelf () {
  createShelf(-500)
  createShelf(0)
  createShelf(500)
}

function createShelf (x) {
  scene.add(createShelfItem('line', [x - 200, 2, 0], [1600, 4, 10]))
  scene.add(createShelfItem('line', [x + 200, 2, 0], [1600, 4, 10]))
  scene.add(createShelfItem('line', [x, 2, 800], [10, 4, 400]))
  scene.add(createShelfItem('line', [x, 2, -800], [10, 4, 400]))
  for (let i = 1; i < 19; i++) {
      let pos = [x,105, i * 70 - 650];
      createShelfItem('cabinet', pos, [100, 1550, 160], 'cabinet');
  }
}
function createMtlObj (options) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setBaseUrl(options.mtlBaseUrl);// 设置材质路径
  mtlLoader.setPath(options.mtlPath);// 设置mtl文件路径
  mtlLoader.load(options.mtlFileName, function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);// 设置三维对象材质库
    objLoader.setPath(options.objPath);// 设置obj文件所在目录
    objLoader.load(options.objFileName, function (object) {
      if (typeof options.completeCallback === 'function') {
        options.completeCallback(object);
      }
    }, function (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        if (typeof options.progress === 'function') {
          options.progress(Math.round(percentComplete, 2));
        }
        // console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    }, function (error) {})
  })
}
function createShelfItem (type, pos, size, name) {
  if(type === "cabinet"){
    let opt = {
      mtlBaseUrl: './model/JIGUID/',
      mtlPath: 'model/JIGUID/',
      mtlFileName: 'JIGUID.mtl',
      objPath: 'model/JIGUID/',
      objFileName: 'JIGUID.obj',
      completeCallback: function (object) {
        object.scale.x = 0.1// 缩放级别
        object.scale.y = 0.1// 缩放级别
        object.scale.z = 0.1// 缩放级别
        object.rotation.y = -Math.PI/2// 缩放级别
        object.position.set(...pos);
        scene.add(object);
      }
    }
    createMtlObj(opt);
  } else {
    let item = createBoxGeometry({ size: size, material: shelfMat[type], pos: pos, angle: Math.PI/2, name: name });
    scene.add(item);
  }
}

