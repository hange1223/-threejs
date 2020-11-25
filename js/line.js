function addLine () {
  var p = []
  p.push(new THREE.Vector3(-10, 0))
  p.push(new THREE.Vector3(-5, 5))
  p.push(new THREE.Vector3(0, 0))
  p.push(new THREE.Vector3(5, -5))
  p.push(new THREE.Vector3(10, 0))
  p.push(new THREE.Vector3(-1, 2))
  p.push(new THREE.Vector3(-2, 2))

  /*
json数据格式
*/
  var objson = {
    'arcLengthDivisions': 200, // 每段分割
    'closed': false, // 曲线是否闭合
    'curveType': 'centripetal', // 曲线类型
    'points': [ [ -10, 0, 0], [ -5, 5, 0], [ 0, 0, 0], [ 5, -5, 0], [ 10, 0, 0] ], // 点数据z轴可以不要
    'temsion': 0.5// 曲线张度
  }

  var geometry = new THREE.Geometry() // 声明一个几何体对象Geometry
  var curve = new THREE.CatmullRomCurve3()
  curve.fromJSON(objson)// 复制数据

  /*
jsonObj = curve.toJSON();
console.log(jsonObj); */

  var points = curve.getPoints(100)// 把曲线分为points段

  geometry.setFromPoints(points)

  var material = new THREE.LineBasicMaterial({
    color: 0xF8F8FF
  })

  var line = new THREE.Line(geometry, material)
  scene.add(line)
}
