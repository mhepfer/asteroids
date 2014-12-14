(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Bullet = Asteroids.Bullet = function(pos, vel, game){
    this.game = game;
    Asteroids.MovingObject.call(this, {
        COLOR:'#e13b43',
        RADIUS:2,
        pos: pos,
        vel: vel
      }
    );
  }
  
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith = function(otherObject){
    this.game.remove(this)
    this.game.remove(otherObject)
  }
  
})();