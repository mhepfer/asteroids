(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(){
    this.game = new Asteroids.Game();
    this.game.addAsteroids();
    var canvas = document.getElementById('blah');
    this.ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    this.restart = false
  }

  // document.getElementById('start').onclick = function(){
  //   this.start();
  // }
  
  GameView.prototype.start = function(){
    if(this.game.gameOver()){
      this.game.lives = 3;
    }
    //display start button, on start button run code below
    this.nIntervId = setInterval((function(){
      this.game.step();
      this.game.draw(this.ctx);
      if(this.game.gameOver()){
        console.log("GameOver")
        console.log(this.game.score)
        this.stop()
      }
    }).bind(this), 20);

    if(!this.restart){
      this.bindKeyHandlers();
      // this.addStop();
    }
  };

  GameView.prototype.stop = function() {
    clearInterval(this.nIntervId)
    document.getElementById("SplashScreen").innerHTML = "<div id='restartScreen'><p>GAME OVER</p>" + '<input id="RestartButton" type="button" value="Restart" /></div>'
    document.getElementById("RestartButton").onclick = function () {
      gameView.game.lives = 3;
      gameView.game.score = 0;
      gameView.start()
      document.getElementById("restartScreen").remove();
    }
    this.restart = true
  }

  GameView.MOVES = {
    "up": -1, // send ship along current heading
    "down": 1, // send ship in reverse of current heading
    "left": -1, // -10 degrees
    "right": 1 // +10 degrees
  }

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    var that = this
    Object.keys(GameView.MOVES).forEach(function(direction) {
      var velocity = GameView.MOVES[direction];
      key(direction, function(){ship.power(direction, velocity, that.ctx)})
    })

    key("space", function () { ship.fireBullet() });
    key("s", function() { ship.stop() });
    key("c", function() {gameView.game.shipFrame = !gameView.game.shipFrame})
  };

  // GameView.prototype.addStop = function(){
  //   var ship = this.game.ship
  //   // key("s", function() { 
  //   //   ship.stop()
  //   // })
  // }

})();