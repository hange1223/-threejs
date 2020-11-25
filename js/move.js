
// function moveItem () {
//   let item = createShelfItem('box', [-700, 25, 700], [50, 50, 50], name + '-1#box')
//   scene.add(item)
//   $('#btn').click(function () {
//     moveFlash(item, 'z', 450, 5000, 0)
//     moveFlash(item, 'x', -300, 5000, 5)
//     moveFlash(item, 'z', 150, 5000, 10)
//     moveFlash(item, 'x', -700, 5000, 15)
//     moveFlash(item, 'z', -150, 5000, 20)
//     moveFlash(item, 'x', -300, 5000, 25)
//     moveFlash(item, 'z', -450, 5000, 30)
//     moveFlash(item, 'x', -700, 5000, 35)
//     moveFlash(item, 'z', 700, 5000, 40)
//   })
// }

var mixer;
function moveItem () {
  var loader = new THREE.FBXLoader();
  loader.load('model/F.fbx', function (object) {
    mixer = new THREE.AnimationMixer(object);

    var action = mixer.clipAction(object.animations[ 0 ]);
    action.play();

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    })
    object.scale.x = 3;// 缩放级别
    object.scale.y = 3;// 缩放级别
    object.scale.z = 3;// 缩放级别
    object.rotation.y = Math.PI;// 缩放级别
    object.position.set(-700, 120, 700);
    scene.add(object);
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
      onMove(object, -700, 750, 1000);
    })
  })
}
// function onMove (object, x, z, time, delay) {
//   delay = delay || 0;
//   let num = 0;
//   for (let i = 1; i < 5; i++) {
//     moveFlash(object, 'z', z - 300 * i, time, time / 1000 * num + delay);
//     num++;
//     rotationFlash(object, (i % 2) === 1 ? -Math.PI / 2 : Math.PI / 2, time, time / 1000 * num + delay);
//     num++;
//     moveFlash(object, 'x', x + 400 * (i % 2), time, time / 1000 * num + delay);
//     num++;
//     if (i !== 4) {
//       rotationFlash(object, (i % 2) === 1 ? Math.PI / 2 : -Math.PI / 2, time, time / 1000 * num + delay);
//       num++;
//     }
//   }
//   rotationFlash(object, Math.PI / 2, time, time / 1000 * num + delay);
//   num++;
//   moveFlash(object, 'z', z, time, time / 1000 * num);
//   num++;
//   rotationFlash(object, Math.PI, time, time / 1000 * num + delay);
// }
// function moveFlash (item, attr, value, time, delay) {
//   setTimeout(function () {
//     let ov = item.position[attr];
//     let nv = value;
//     let times = time / 10;
//     let step = (nv - ov) / times;
//     for (let i = 0; i < times + 1; i++) {
//       setTimeout(function () {
//         let obj = Object.assign({}, item.position);
//         obj[attr] += step;
//         item.position.set(obj.x, obj.y, obj.z);
//       }, i * 10)
//     }
//   }, delay * 1000)
// }
// function rotationFlash (item, value, time, delay) {
//   setTimeout(function () {
//     let times = time / 10;
//     let step = value / times;
//     for (let i = 0; i < times + 1; i++) {
//       setTimeout(function () {
//         item.rotation.y += step;
//       }, i * 10)
//     }
//   }, delay * 1000)
// }

function onMove (object, x, z, time, delay) {
  delay = delay || 0;
  let num = 0;
  for(let i = 1; i < 4; i++){
    if(i!==3){
      moveFlash(object, 'z', (i % 2 === 1) ? z - 1400 : z + 30, time, time / 1000 * num + delay);
      num++;
      rotationFlash(object, (i % 2 === 1) ? -Math.PI / 2 : Math.PI / 2, time,  time / 1000 * num + delay);
      num++;
      moveFlash(object, 'x', x + 500 * i, time, time / 1000 * num + delay);
      num++;
      rotationFlash(object, (i % 2 === 1) ? -Math.PI / 2 : Math.PI / 2, time,  time / 1000 * num + delay);
      num++;
    } else {//回归原位
        moveFlash(object, 'z', z - 1400, time, time / 1000 * num + delay);
        num++;
        rotationFlash(object, Math.PI/2, time, time / 1000 * num + delay);
        num++;
        moveFlash(object, 'x', x, time, time / 1000 * num + delay);
        num++;
        rotationFlash(object, Math.PI/2, time, time / 1000 * num + delay);
        num++;
        moveFlash(object, 'z', z, time, time / 1000 * num + delay);
        num++;
        rotationFlash(object, Math.PI, time, time / 1000 * num + delay);
    }
  }
}
function moveFlash (item, attr, value, time, delay) {
  setTimeout(function () {
    let ov = item.position[attr];
    let nv = value;
    let times = time / 10;
    let step = (nv - ov) / times;
    for (let i = 0; i < times + 1; i++) {
      setTimeout(function () {
        let obj = Object.assign({}, item.position);
        obj[attr] += step;
        item.position.set(obj.x, obj.y, obj.z);
      }, i * 10)
    }
  }, delay * 1000)
}
function rotationFlash (item, value, time, delay) {
  setTimeout(function () {
    let times = time / 10;
    let step = value / times;
    for (let i = 0; i < times + 1; i++) {
      setTimeout(function () {
        item.rotation.y += step;
      }, i * 10)
    }
  }, delay * 1000)
}
