(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function(pos, game, radius, vel){
    this.game = game;
    this.img = new Image();   // Create new img element
    this.img.src = 'lib/moon.png'; // Set source path
    if(typeof radius === "undefined"){
      radius = this.randRadius()
    }
    if(typeof vel === "undefined"){
      vel = Asteroids.Util.randomVec(this.game)
    }
    Asteroids.MovingObject.call(this, {
        COLOR:'#ccddff',
        RADIUS: radius,
        pos:pos,
        vel:vel
      }
    );
  }
  
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      otherObject.relocate(this);
    }

    if(otherObject instanceof Asteroids.Bullet) {
      this.game.score += this.radius;
      if(this.radius < 30){
        this.game.remove(this)
      } else {
        var newRadius = Math.floor(this.radius/2)
        var newVelX = this.vel[1]
        var newVelY = this.vel[0]
        var newAster = new Asteroids.Asteroid(this.pos, this.game, newRadius, [newVelX, newVelY])
        this.game.asteroids.push(newAster)
        var newAster = new Asteroids.Asteroid(this.pos, this.game, newRadius, [-newVelX, -newVelY])
        this.game.asteroids.push(newAster);
        this.game.remove(this)
      }
      this.game.remove(otherObject);
    }
  };

  Asteroid.prototype.randRadius = function() {
    return Math.floor((Math.random()*50) + 30)
  };

  Asteroid.prototype.draw = function(ctx) { 
 
    this.norm = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    this.gamma = 1/Math.sqrt(1 - Math.pow(this.norm,2)/Math.pow(this.game.velocityLimit,2))

    var warpX
    var warpY

    if (this.norm === 0){
      warpX = 1;
      warpY = 1;
    } else {
      var xCompSqr = Math.pow(this.vel[0]/this.norm, 2)
      var yCompSqr = Math.pow(this.vel[1]/this.norm, 2)
      warpX = Math.sqrt(xCompSqr/Math.pow(this.gamma,2)+yCompSqr)
      warpY = Math.sqrt(yCompSqr/Math.pow(this.gamma,2)+xCompSqr)
    }

    ctx.drawImage(this.img, this.pos[0], this.pos[1], this.radius*warpX, this.radius*warpY);

  };
  
})();