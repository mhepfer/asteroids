(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function(pos, game){
    this.game = game;
    this.rotated = false
    this.heading = 0
    this.lastFired = 0
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
    this.rotateShip(ctx)
    // ctx.drawImage(this.img, this.pos[0], this.pos[1])
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

  Ship.prototype.power = function(direction, impulse, ctx){

    if(direction === "up" || direction === "down"){
      var headingx = -1*Math.sin(this.heading * Math.PI/180)
      var headingy = Math.cos(this.heading * Math.PI/180) 
      this.vel[0] += impulse * headingx;
      this.vel[1] += impulse * headingy;  
    }
    if(direction === "left" || direction === "right"){
      this.heading = this.heading + (impulse * 10)
    }

  };

  Ship.prototype.rotateShip = function(ctx) { 
 
    // save the current co-ordinate system 
    // before we screw with it
    ctx.save(); 
   
    // move to the middle of where we want to draw our image
    ctx.translate(this.pos[0], this.pos[1]);
   
    // rotate around that point, converting our 
    // angle from degrees to radians 
    ctx.rotate(this.heading * Math.PI/180);
   
    // draw it up and to the left by half the width
    // and height of the image 
    ctx.drawImage(this.img, -(this.img.width/2), -(this.img.height/2));
   
    // and restore the co-ords to how they were when we began
    ctx.restore();
  }

  Ship.prototype.fireBullet = function() {
    var timeFired = new Date()
    var timeFired = timeFired.getTime()

    if (timeFired - this.lastFired > 500){
      this.lastFired = new Date()
      this.lastFired = this.lastFired.getTime()
      var posx = this.pos[0];
      var posy = this.pos[1];
      var bullet = new Asteroids.Bullet([posx, posy], this.findBulletVel(), this.game);
      this.game.bullets.push(bullet);
    }
  }

  Ship.prototype.findBulletVel = function() {
    var newVel = [0,0]

    // var norm = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2))
    var norm = 1
    newVel[0] = this.vel[0]/norm+(Math.sin(this.heading * Math.PI/180))
    newVel[1] = this.vel[1]/norm+(-1 * Math.cos(this.heading * Math.PI/180))

    if(this.vel[0] === 0 && this.vel[1] === 0){
      newVel = [Math.sin(this.heading * Math.PI/180), -1 * Math.cos(this.heading * Math.PI/180)]
    }
    return newVel
  }

  
})();