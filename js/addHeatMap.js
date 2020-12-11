function addHeatMap(heatArr){

  heatGroup = new THREE.Group();
  heatArr.forEach((d, i) => {
    addHeatItem(d.src, '热点'+i, d.pos);
    //y方向的数据需要-150（scaleY）再加上文字的高度90
    addText(d.temperature, [d.pos[0], d.pos[1]-60, d.pos[2]], '文字'+i);//
  });

  scene.add( heatGroup );
}
function addHeatItem(src, name, pos){
  var spriteMap = new THREE.TextureLoader().load( src );
  var spriteMaterial = new THREE.SpriteMaterial({
    transparent: true,
    map: spriteMap,
    side: THREE.DoubleSide
  });
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.name=name;
  sprite.scale.set(150, 150, 10);
  sprite.center = new THREE.Vector2(0, 0);
  sprite.position.set(...pos);
  
  heatGroup.add(sprite);
  console.log('heatGroup', heatGroup)
}

function addText(text, pos, name){
  var spriteText = makeTextSprite( text,
          {
              fontsize: 20,
              borderColor: {r:255, g:0, b:0, a:0.4},/* 边框黑色 */
              backgroundColor: {r:255, g:255, b:255, a:0.9}/* 背景颜色 */
          } );
  spriteText.center = new THREE.Vector2(0, 0);
  spriteText.position.set(...pos);
  spriteText.name = name;
  heatGroup.add( spriteText );
  
}

/* 创建字体精灵 */
    function makeTextSprite(message, parameters) {

      if ( parameters === undefined ) parameters = {};

      var fontface = parameters.hasOwnProperty("fontface") ?
          parameters["fontface"] : "Arial";

      /* 字体大小 */
      var fontsize = parameters.hasOwnProperty("fontsize") ?
          parameters["fontsize"] : 50;

      /* 边框厚度 */
      var borderThickness = parameters.hasOwnProperty("borderThickness") ?
          parameters["borderThickness"] : 4;

      /* 边框颜色 */
      var borderColor = parameters.hasOwnProperty("borderColor") ?
          parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

      /* 背景颜色 */
      var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
          parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

      /* 创建画布 */
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      /* 字体加粗 */
      context.font = "Bold " + fontsize + "px " + fontface;

      /* 获取文字的大小数据，高度取决于文字的大小 */
      var metrics = context.measureText( message );
      var textWidth = metrics.width;
      console.log('textWidth', textWidth);
      /* 背景颜色 */
      context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
          + backgroundColor.b + "," + backgroundColor.a + ")";

      /* 边框的颜色 */
      context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
          + borderColor.b + "," + borderColor.a + ")";
      context.lineWidth = borderThickness;

      /* 绘制圆角矩形 */
      roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);

      /* 字体颜色 */
      context.fillStyle = "rgba(0, 0, 0, 1.0)";
      context.fillText( message, borderThickness, fontsize + borderThickness);

      /* 画布内容用于纹理贴图 */
      var texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      var spriteMaterial = new THREE.SpriteMaterial({ map: texture } );
      var sprite = new THREE.Sprite( spriteMaterial );

      console.log(sprite.spriteMaterial);

      /* 缩放比例 */
      sprite.scale.set(300,150,0);

      return sprite;

    }

    function roundRect(ctx, x, y, w, h, r) {

      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.lineTo(x+w-r, y);
      ctx.quadraticCurveTo(x+w, y, x+w, y+r);
      ctx.lineTo(x+w, y+h-r);
      ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
      ctx.lineTo(x+r, y+h);
      ctx.quadraticCurveTo(x, y+h, x, y+h-r);
      ctx.lineTo(x, y+r);
      ctx.quadraticCurveTo(x, y, x+r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    
    }
    