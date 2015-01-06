(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  // var Astroids = Astroids || {};
  var MovingObject = Asteroids.MovingObject = function (attributeHash) {
    this.pos = attributeHash["pos"];
    this.vel = attributeHash["vel"];
    this.radius = attributeHash["RADIUS"];
    this.color = attributeHash["COLOR"];
    this.minorAxis = this.radius;
  };

  MovingObject.prototype.isWrappable = true;
  
  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      Math.PI*2,
      true
    ); // Outer circle
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var sumRadii = this.minorAxis + otherObject.minorAxis
    var distance = 2 + Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2))
    return sumRadii > distance
  };
  
  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]

    //recalculate minor axis
    this.setMinorAxis();

    var checkPos = [this.pos[0], this.pos[1]];
    if(this.game.isOutOfBounds(checkPos)){
      if(this.isWrappable){
        var newPos = this.game.wrap(checkPos);
        this.pos = newPos;
      } else {
        this.game.remove(this)
      }
    }
  };

  MovingObject.prototype.setMinorAxis = function() {
    var norm = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    var gamma = 1/Math.sqrt(1 - Math.pow(norm,2)/Math.pow(this.game.velocityLimit,2))

    if (norm === 0){
      warpX = 1;
      warpY = 1;
    } else {
      var xCompSqr = Math.pow(this.vel[0]/norm, 2)
      var yCompSqr = Math.pow(this.vel[1]/norm, 2)
      warpX = Math.sqrt(xCompSqr/Math.pow(gamma,2)+yCompSqr)
      warpY = Math.sqrt(yCompSqr/Math.pow(gamma,2)+xCompSqr)
    }
    if(this.radius*warpX < this.radius*warpY){
      this.minorAxis = this.radius*warpY
    } else {
      this.minorAxis = this.radius*warpX
    }
  }
 
})();


