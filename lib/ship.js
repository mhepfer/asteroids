(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function(pos, game){
    this.game = game;
    this.heading = 0
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

  var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 
 
  // save the current co-ordinate system 
  // before we screw with it
  context.save(); 
 
  // move to the middle of where we want to draw our image
  context.translate(x, y);
 
  // rotate around that point, converting our 
  // angle from degrees to radians 
  context.rotate(angle * TO_RADIANS);
 
  // draw it up and to the left by half the width
  // and height of the image 
  context.drawImage(image, -(image.width/2), -(image.height/2));
 
  // and restore the co-ords to how they were when we began
  context.restore(); 
}

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