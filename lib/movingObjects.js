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
    this.velocityLimit = 10;
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
    var sumRadii = this.radius + otherObject.radius
    var distance = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2))
    return sumRadii >= distance
  };
  
  MovingObject.prototype.move = function() {
    this.pos[0] += 0.5*this.vel[0]
    this.pos[1] += 0.5*this.vel[1]
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
 
})();


