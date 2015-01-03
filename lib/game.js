(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.bullets = [];
    this.center = [(this.DIM_X/2), (this.DIM_Y/2)]
    this.ship = new Asteroids.Ship(this.center, this);
    this.score = 0
    this.lives = 20
    this.velocityLimit = 10;
    this.shipFrame = false;
  };

  Game.prototype.gameOver = function() {
    return this.lives === 0
  };

  Game.prototype.changeFrame = function(){
    this.shipFrame = !this.shipFrame
    this.ship.vel = [0, 0]
    this.ship.pos = [400, 300]
  }
  
  Game.prototype.addAsteroids = function(){
    while(this.asteroids.length < this.NUM_ASTEROIDS){
      var newAster = new Asteroids.Asteroid(this.randomPosition(), this);
      if(this.positionAvailable(newAster)){
        this.asteroids.push(newAster)
      }
    }
  };

  Game.prototype.place = function(object){
    var notPlaced = true
    console.log(object)
    debugger
      while(notPlaced){
        object.pos = this.randomPosition();
        if(this.positionAvailable(object)){
          notPlaced = false
        }
      }
  }

  Game.prototype.positionAvailable = function(object){
    var position = object.pos
    for(i = 0; i < this.asteroids.length; i++){
      if(object === this.asteroids[i]) continue;
      if(this.asteroids[i].isCollidedWith(object)){
        return false
      }
    }
    return true;
  }

  Game.prototype.accelerateAsteroids = function(heading, impulse){

    var headingx = -1*Math.sin(heading * Math.PI/180)
    var headingy = Math.cos(heading * Math.PI/180)
    var addVelX = -0.5*impulse * headingx;
    var addVelY = -0.5*impulse * headingy;
    this.limSqr = Math.pow(this.velocityLimit,2)

    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i]
      this.norm = Math.sqrt(Math.pow(asteroid.vel[0],2) + Math.pow(asteroid.vel[1],2));
      this.gamma = 1/Math.sqrt(1 - Math.pow(this.norm,2)/Math.pow(this.velocityLimit,2))
      var dotProd = asteroid.vel[0]*addVelX+asteroid.vel[1]*addVelY
      this.shipVelCoeff = 1-this.gamma*dotProd/(this.limSqr+this.limSqr*this.gamma)
      this.addVelCoeff = 1/this.gamma
      if(isNaN(this.norm) || isNaN(this.gamma)){
        asteroid.vel[0] = asteroid.vel[0] - 0.5
        asteroid.vel[1] = asteroid.vel[1] - 0.5
      } else {
        asteroid.vel[0] = (1/(1-dotProd/this.limSqr))*(this.shipVelCoeff*asteroid.vel[0]+this.addVelCoeff*addVelX);
        asteroid.vel[1] = (1/(1-dotProd/this.limSqr))*(this.shipVelCoeff*asteroid.vel[1]+this.addVelCoeff*addVelY);
      }
    }
  };

  Game.prototype.accelerateBullets = function(heading, impulse){

    var headingx = -1*Math.sin(heading * Math.PI/180)
    var headingy = Math.cos(heading * Math.PI/180)
    var addVelX = -0.5*impulse * headingx;
    var addVelY = -0.5*impulse * headingy;
    this.limSqr = Math.pow(this.velocityLimit,2)

    for (var i = 0; i < this.bullets.length; i++) {
      var bullet = this.bullets[i]
      this.norm = Math.sqrt(Math.pow(bullet.vel[0],2) + Math.pow(bullet.vel[1],2));
      this.gamma = 1/Math.sqrt(1 - Math.pow(this.norm,2)/Math.pow(this.velocityLimit,2))
      var dotProd = bullet.vel[0]*addVelX+bullet.vel[1]*addVelY
      this.shipVelCoeff = 1-this.gamma*dotProd/(this.limSqr+this.limSqr*this.gamma)
      this.addVelCoeff = 1/this.gamma
      if(isNaN(this.norm) || isNaN(this.gamma)){
        bullet.vel[0] = bullet.vel[0] - 0.5
        bullet.vel[1] = bullet.vel[1] - 0.5
      } else {
        bullet.vel[0] = (1/(1-dotProd/this.limSqr))*(this.shipVelCoeff*bullet.vel[0]+this.addVelCoeff*addVelX);
        bullet.vel[1] = (1/(1-dotProd/this.limSqr))*(this.shipVelCoeff*bullet.vel[1]+this.addVelCoeff*addVelY);
      }
    }
  }

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
    this.addAsteroids();
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