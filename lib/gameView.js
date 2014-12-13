(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function(){
    this.game = new Asteroids.Game();
    this.game.addAsteroids();
    var canvas = document.getElementById('blah');
    this.ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
  }
  
  GameView.prototype.start = function(){
    setInterval((function(){
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.MOVES = {
    "up": [0, -1],
    "down":[0, 1],
    "left":[-1, 0],
    "right":[1, 0]
  }

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    Object.keys(GameView.MOVES).forEach(function(direction) {
      var velocity = GameView.MOVES[direction];
      key(direction, function(){ship.power(velocity)})
    })

    key("space", function () { ship.fireBullet() });
  }
})();