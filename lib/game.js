(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 10;
    this.asteroids = [];
  }
  
  Game.prototype.addAsteroids = function(){
    for(var i = 0; i < this.NUM_ASTEROIDS; i ++){
      var newAster = new Asteroids.Asteroid(this.randomPosition(), this);
      this.asteroids.push(newAster)
    }
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
    for (var i = 0; i < this.asteroids.length -1 ; i++) {
      for (var j = i + 1; j < this.asteroids.length; j ++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          this.asteroids[i].collideWith(this.asteroids[j])
        }
      }
    };
  }
  
  Game.prototype.draw = function (ctx){
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for(var i = 0; i < this.asteroids.length; i ++){
      this.asteroids[i].draw(ctx);
    }
  }
  
  Game.prototype.moveObjects = function(){
    for(var i = 0; i < this.asteroids.length; i ++){
      this.asteroids[i].move()
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(asteroid) {
    for (var i = 0; i <= this.asteroids.length; i++) {
      if(asteroid === this.asteroids[i]){
        var index = i;
      }
    };
    if (typeof index === "undefined") {
      console.log("error")
    } else {
      this.asteroids.splice(index, 1)
    }
  }
  
})();