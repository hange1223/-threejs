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
function addAirCondition(){
  let airConditions = [{pos:[1000,80,-700], angle: -Math.PI/2}, {pos:[-800,80,1000], angle: Math.PI}];
  airConditions.forEach(d=>{
    createAirConditionItem(d);
  });
}

function createAirConditionItem (d) {
    let opt = {
      mtlBaseUrl: './model/kongtiaod/',
      mtlPath: 'model/kongtiaod/',
      mtlFileName: 'kongtiaod.mtl',
      objPath: 'model/kongtiaod/',
      objFileName: 'kongtiaod.obj',
      completeCallback: function (object) {
        object.scale.x = 0.1;// 缩放级别
        object.scale.y = 0.1;// 缩放级别
        object.scale.z = 0.1;// 缩放级别
        object.rotation.y = d.angle;// 转角
        object.position.set(...d.pos);
        scene.add(object);
      }
    }
    createMtlObj(opt);
}