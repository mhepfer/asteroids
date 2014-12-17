(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function(pos, game){
    this.game = game;
    this.img = new Image();   // Create new img element
    this.img.src = 'lib/enterprise.jpeg'; // Set source path
    Asteroids.MovingObject.call(this, {
        COLOR:'#ffa662',
        RADIUS:10,
        pos:pos,
        vel:[0,0]
      }
    );
  }
  
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.pos[0], this.pos[1])
  };

  Ship.prototype.relocate = function() {
    this.game.lives -= 1;
    if(this.game.lives === 0 ){
      console.log("DEAD")
    }
    this.pos = this.game.randomPosition();
    // this.pos = this.game.center;
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse){
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var posx = this.pos[0];
    var posy = this.pos[1];
    var bullet = new Asteroids.Bullet([posx, posy], this.findBulletVel(), this.game);
    this.game.bullets.push(bullet);
  }

  Ship.prototype.findBulletVel = function() {
    var newVel = [0,0]

    var norm = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2))
    newVel[0] = this.vel[0]/norm+this.vel[0]
    newVel[1] = this.vel[1]/norm+this.vel[1]

    if(this.vel[0] === 0 && this.vel[1] === 0){
      newVel = [0, 1.4]
    }
    return newVel
  }

  
})();