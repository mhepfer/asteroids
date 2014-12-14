(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function(pos, game){
    this.game = game;
    Asteroids.MovingObject.call(this, {
        COLOR:'#ccddff',
        RADIUS:10,
        pos:pos,
        vel:Asteroids.Util.randomVec(5)
      }
    );
  }
  
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }

    if(otherObject instanceof Asteroids.Bullet) {
      this.game.remove(this)
      this.game.remove(otherObject)
      this.game.score += 1;
    }
  }
  
})();