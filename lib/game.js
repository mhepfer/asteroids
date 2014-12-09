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
    if (pos[0] > DIM_X || pos[0] < 0){ 
      wrapPosx = Math.abs(Math.abs(pos[0]) - this.DIM_X);
    }
    
    if (pos[1] > DIM_Y || pos[1] < 0){ 
      wrapPosy = Math.abs(Math.abs(pos[1]) - this.DIM_Y);
    }
    
    posx = (wrapPosx ? wrapPosx : pos[0]);
    posy = (wrapPosy ? wrapPosy : pos[1]);
    return [posx, posy];
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
  }
  
})();