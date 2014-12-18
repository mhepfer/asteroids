(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 0;
    this.asteroids = [];
    this.bullets = [];
    this.center = [(this.DIM_X/2), (this.DIM_Y/2)]
    this.ship = new Asteroids.Ship(this.center, this);
    this.score = 0
    this.lives = 3
  };

  Game.prototype.gameOver = function() {
    return this.lives === 0
  }
  
  Game.prototype.addAsteroids = function(){
    for(var i = 0; i < this.NUM_ASTEROIDS; i ++){
      var newAster = new Asteroids.Asteroid(this.randomPosition(), this);
      this.asteroids.push(newAster)
    }
  };

  Game.prototype.isOutOfBounds = function(pos) {
    if (pos[0] > this.DIM_X || pos[0] < 0){
      return true
    } else if (pos[1] > this.DIM_Y || pos[1] < 0) {
      return true
    }

    return false
  }

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets)
  }
  
  Game.prototype.randomPosition = function(){
    var dimX = Math.random()*this.DIM_X;
    var dimY = Math.random()*this.DIM_Y;
    return [dimX, dimY];
  }
  
  Game.prototype.wrap = function(pos){
    var wrapPosx = 0
    var wrapPosy = 0
    if (pos[0] > this.DIM_X || pos[0] < 0){ 
      wrapPosx = Math.abs(Math.abs(pos[0]) - this.DIM_X);
    }
    
    if (pos[1] > this.DIM_Y || pos[1] < 0){ 
      wrapPosy = Math.abs(Math.abs(pos[1]) - this.DIM_Y);
    }

    if (wrapPosx === 0){
      posx = pos[0]
    } else {
      posx = wrapPosx
    }

    if (wrapPosy === 0){
      posy = pos[1]
    } else {
      posy = wrapPosy
    }
    return [posx, posy];
  };

  Game.prototype.checkCollisions = function() {
    var all = this.allObjects()
    for (var i = 0; i < all.length -1 ; i++) {
      for (var j = i + 1; j < all.length; j ++) {
        if (all[i].isCollidedWith(all[j]) && !(all[i] instanceof Asteroids.Ship)) {
          all[i].collideWith(all[j])
        }
      }
    };
  }
  
  Game.prototype.draw = function (ctx){
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    var all = this.allObjects()
    for(var i = 0; i < all.length; i ++){
      all[i].draw(ctx);
    }

    ctx.font="20px Georgia";
    var scoreStr = "Score: " + this.score.toString()
    ctx.fillText(scoreStr,10,20)
    var livesStr = "Lives Left: " + this.lives.toString()
    ctx.fillText(livesStr,690,20)
  }
  
  Game.prototype.moveObjects = function(){
    var all = this.allObjects()
    for(var i = 0; i < all.length; i ++){
      all[i].move();
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(obj) {
    if(obj instanceof Asteroids.Asteroid){
      for (var i = 0; i <= this.asteroids.length; i++) {
        if(obj === this.asteroids[i]){
          this.asteroids.splice(i, 1)
        }
      };
    }

    if(obj instanceof Asteroids.Bullet){
    for (var i = 0; i <= this.bullets.length; i++) {
        if(obj === this.bullets[i]){
          var index = i;
          this.bullets.splice(i, 1)
        }
      };
    }
  }
  
})();