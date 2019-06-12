/*
 * runstant
 */

phina.globalize();

var ASSETS = {
  image: {
    'tomapiko': 'img/tomapiko.png',
  },
};

phina.define('MainScene', {
  superClass: 'CanvasScene',
  
  init: function() {
    this.superInit();
    
    var tomapiko = Sprite('tomapiko').addChildTo(this);
    
    tomapiko.x = this.gridX.center();
    tomapiko.y = this.gridY.center();
    tomapiko.width = 128;
    tomapiko.height = 128;
    
    this.player = tomapiko;
    
    // 障害物
    this.shapeGroup = CanvasElement().addChildTo(this);
    // n 回繰り返す
    (12).times(function() {
      // スターを生成
      var star = RectangleShape({
      }).addChildTo(this.shapeGroup);
      // 位置をランダムに設定
      star.x = Random.randint(0, 640);
      star.y = Random.randint(0, 960);
    }, this);
  },
  
  update: function(app) {
    var keyboard = app.keyboard;
  
    // 左右移動
    if (keyboard.getKey('left')) {
      this.player.x -= 8;
      this.player.scale.x = 1;
    }
    if (keyboard.getKey('right')) {
      this.player.x += 8;
      this.player.scale.x = -1;
    }
    // 上下移動
    if (keyboard.getKey('up')) {
      this.player.y -= 8;
    }
    if (keyboard.getKey('down')) {
      this.player.y += 8;
    }
    
     this.shapeGroup.children.each(function(child) {
      // プレイヤーとシェープの衝突判定
      if (this.player.hitTestElement(child)) {
        // 衝突していたら色を変える
        child.fill = 'red';
      }
    }, this);
    
    
    
    
    
  }
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    assets: ASSETS,
  });
  
  app.run();
});
