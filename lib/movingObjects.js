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
  };
  
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
  
  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]
    var checkPos = [this.pos[0], this.pos[1]];
    this.pos = this.game.wrap(checkPos);
  };
 
})();


