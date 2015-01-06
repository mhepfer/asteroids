(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function(pos, game, radius){
    this.game = game;
    this.img = new Image();   // Create new img element
    this.img.src = 'images/AsteroidTemp.png'; // Set source path
    if(typeof radius === "undefined"){
      radius = this.randRadius()
    }
    vel = Asteroids.Util.randomVec(this.game)
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
      if(this.radius < 50){
        this.game.remove(this)
      } else {
        var newRadius = Math.floor(this.radius/2)
        var newPos = this.pos[0] + this.radius/2
        var newAster = new Asteroids.Asteroid([newPos, this.pos[1]], this.game, newRadius)
        
        this.vel[0] = newAster.vel[1]
        this.vel[1] = newAster.vel[0]
        this.game.asteroids.push(newAster)

        newPos = this.pos[0] - this.radius/2
        newAster = new Asteroids.Asteroid([newPos, this.pos[1]], this.game, newRadius)
        this.game.asteroids.push(newAster);
        this.game.remove(this)
      }
      this.game.remove(otherObject);
    }

    if(otherObject instanceof Asteroids.Asteroid){

        otherObject.vel[0] = -1*otherObject.vel[0];
        otherObject.vel[1] = -1*otherObject.vel[1];

        this.vel[0] = -1*this.vel[0];
        this.vel[1] = -1*this.vel[1];
    }
  };

  Asteroid.prototype.randRadius = function() {
    return Math.floor((Math.random()*80) + 30)
  };

  Asteroid.prototype.draw = function(ctx) { 
    var warpX = 1
    var warpY = 1

    var norm = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    var gamma = 1/Math.sqrt(1 - Math.pow(norm,2)/Math.pow(this.game.velocityLimit,2))

    if (norm > 0){
      var xCompSqr = Math.pow(this.vel[0]/norm, 2)
      var yCompSqr = Math.pow(this.vel[1]/norm, 2)
      warpX = Math.sqrt(xCompSqr/Math.pow(gamma,2)+yCompSqr)
      warpY = Math.sqrt(yCompSqr/Math.pow(gamma,2)+xCompSqr)
    }

    var newX = this.radius*warpX*2
    var newY = this.radius*warpY*2

    ctx.drawImage(this.img, this.pos[0] - newX/2, this.pos[1] - newY/2, newX, newY);

  };
  
})();