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
    this.img.src = 'images/Ship.png'; // Set source path
    this.effectiveWidth = this.img.width;
    this.effectiveLength = this.img.length;
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
  };

  Ship.prototype.relocate = function(asteroid) {
    this.game.lives -= 1;
    if(this.game.lives === 0 ){
      console.log("DEAD")
    }
    // debugger
    if(!this.game.shipFrame){
      this.game.place(this)
    } else {
      this.game.place(asteroid)
      // asteroid.pos = this.game.randomPosition();
    }
    
    this.vel = [0,0];
  };

  Ship.prototype.power = function(direction, impulse, ctx){
    if((this.game.shipFrame) && !(direction === "left" || direction === "right")){
      console.log("ShipFrame")
      this.game.accelerateAsteroids(this.heading, impulse);
      this.game.accelerateBullets(this.heading, impulse);
    } else if(direction === "up" || direction === "down"){
      this.accelerate(impulse)
    }
    if(direction === "left" || direction === "right"){
      this.heading = this.heading + (impulse * 10)
    }

  };

  Ship.prototype.accelerate = function(impulse) {
    var headingx = -1*Math.sin(this.heading * Math.PI/180)
    var headingy = Math.cos(this.heading * Math.PI/180)
    this.norm = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    this.gamma = 1/Math.sqrt(1 - Math.pow(this.norm,2)/Math.pow(this.game.velocityLimit,2))
    var addVelX = 0.5*impulse * headingx;
    var addVelY = 0.5*impulse * headingy;
    var dotProd = this.vel[0]*addVelX+this.vel[1]*addVelY
    this.limSqr = Math.pow(this.game.velocityLimit,2)
    this.shipVelCoeff = 1+this.gamma*dotProd/(this.limSqr+this.limSqr*this.gamma)
    this.addVelCoeff = 1/this.gamma
    this.vel[0] = (1/(1+dotProd/this.limSqr))*(this.shipVelCoeff*this.vel[0]+this.addVelCoeff*addVelX);
    this.vel[1] = (1/(1+dotProd/this.limSqr))*(this.shipVelCoeff*this.vel[1]+this.addVelCoeff*addVelY);
  }

  Ship.prototype.rotateShip = function(ctx) { 
 
    this.norm = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    this.gamma = 1/Math.sqrt(1 - Math.pow(this.norm,2)/Math.pow(this.game.velocityLimit,2))
    // save the current co-ordinate system 
    // before we screw with it
    ctx.save(); 
   
    // move to the middle of where we want to draw our image
    ctx.translate(this.pos[0], this.pos[1]);
   
    // rotate around that point, converting our 
    // angle from degrees to radians 
    ctx.rotate(this.heading * Math.PI/180);
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

    //correct for rotation

    var maxX = Math.sqrt(Math.pow(Math.cos(this.heading*Math.PI/180)*this.img.width*warpX,2) + Math.pow(Math.sin(this.heading*Math.PI/180)*this.img.height*warpY,2))
    var maxY = Math.sqrt(Math.pow(Math.sin(this.heading*Math.PI/180)*this.img.width*warpX,2) + Math.pow(Math.cos(this.heading*Math.PI/180)*this.img.height*warpY,2))
    this.effectiveWidth = maxX
    this.effectiveLength = maxY
    this.radius = Math.sqrt(Math.pow(maxX, 2) + Math.pow(maxY, 2))/4
    ctx.drawImage(this.img, -(maxX/4), -(maxY/4), maxX/2, maxY/2);
   
    // and restore the co-ords to how they were when we began
    ctx.restore();
  };

  Ship.prototype.stop = function() {
    this.vel[0] = 0;
    this.vel[1] = 0;
  }

  Ship.prototype.fireBullet = function() {
    var timeFired = new Date()
    var timeFired = timeFired.getTime()
    this.norm = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    this.gamma = 1/Math.sqrt(1 - Math.pow(this.norm,2)/Math.pow(this.game.velocityLimit,2))
    var bulletTime = this.gamma*200

    if (timeFired - this.lastFired > bulletTime){
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
    var addVelX = this.gamma*3*Math.sin(this.heading * Math.PI/180)
    var addVelY = -this.gamma*3*Math.cos(this.heading *Math.PI/180)
    var dotProd = this.vel[0]*addVelX+this.vel[1]*addVelY
  
    this.limSqr = Math.pow(this.game.velocityLimit,2)
    this.shipVelCoeff = 1+this.gamma*dotProd/(this.limSqr+this.limSqr*this.gamma)
    this.addVelCoeff = 1/this.gamma


    newVel[0] = 2*(1/(1+dotProd/this.limSqr))*(this.shipVelCoeff*this.vel[0]+this.addVelCoeff*addVelX);
    newVel[1] = 2*(1/(1+dotProd/this.limSqr))*(this.shipVelCoeff*this.vel[1]+this.addVelCoeff*addVelY);

    return newVel
  }

  
})();