(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function(pos, game){
    this.game = game;
    Asteroids.MovingObject.call(this, {
        COLOR:'#ffa662',
        RADIUS:10,
        pos:pos,
        vel:[0,0]
      }
    );
  }
  
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse){
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var posx = this.pos[0] + this.radius;
    var posy = this.pos[1] + this.radius;
    var bullet = new Asteroids.Bullet([posx, posy], this.vel, this.game);
    this.game.bullets.push(bullet);
  }
  
})();