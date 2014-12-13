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
  }
})();