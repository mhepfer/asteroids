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


    if(!this.restart){
      console.log("binding keys?")
      key('space', this.preventScroll);
      // this.addStop();
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
      this.checkKeys();
    }).bind(this), 30);
  };

  GameView.prototype.stop = function() {
    clearInterval(this.nIntervId)
    document.getElementById("SplashScreen").innerHTML = "<div id='restartScreen'><p>GAME OVER</p>" + '<input id="RestartButton" class="button" type="button" value="Restart" /></div>'
    document.getElementById("RestartButton").onclick = function () {
      gameView.game.lives = 3;
      gameView.game.score = 0;
      gameView.start()
      document.getElementById("restartScreen").remove();
    }
    this.restart = true
  }

  // GameView.MOVES = {
  //   "up": -1, // send ship along current heading
  //   "down": 1, // send ship in reverse of current heading
  //   "left": -1, // -10 degrees
  //   "right": 1 // +10 degrees
  // }

  // GameView.prototype.bindKeyHandlers = function() {
  //   var ship = this.game.ship;
  //   var game = this.game
  //   var that = this
  //   Object.keys(GameView.MOVES).forEach(function(direction) {
  //     var velocity = GameView.MOVES[direction];
  //     key(direction, function(){ship.power(direction, velocity, that.ctx)})
  //   })

  //   key("space", function () { ship.fireBullet() });
  //   key("s", function() { ship.stop() });
  //   key("c", function() { game.changeFrame() });
  // };

  GameView.MOVES = {
    "up": -1, // send ship along current heading
    "down": 1, // send ship in reverse of current heading
    "left": -1, // -10 degrees
    "right": 1, // +10 degrees
  }

  GameView.prototype.checkKeys = function() {
    var ship = this.game.ship;
    var game = this.game
    var that = this

    // w = 87, a = 65, s = 83, d = 68
    // up = 38, down = 40, left = 37, right = 39
    // space = 32, s = 83, c = 67

    var keys = key.getPressedKeyCodes();

    if(keys.indexOf(87) != -1 || keys.indexOf(38) != -1 ){ //up
      var direction = "up"
      var velocity = GameView.MOVES[direction];
      ship.power(direction, velocity, that.ctx)
    }

    if(keys.indexOf(83) != -1 || keys.indexOf(40) != -1 ){ //down
      var direction = "down"
      var velocity = GameView.MOVES[direction];
      ship.power(direction, velocity, that.ctx)
    }

    if(keys.indexOf(37) != -1 || keys.indexOf(65) != -1 ){ //left
      var direction = "left"
      var velocity = GameView.MOVES[direction];
      ship.power(direction, velocity, that.ctx)
    }

    if(keys.indexOf(39) != -1 || keys.indexOf(68) != -1 ){ //right
      var direction = "right"
      var velocity = GameView.MOVES[direction];
      ship.power(direction, velocity, that.ctx)
    }

    if(keys.indexOf(32) != -1 ){
      ship.fireBullet();
    }
    if(keys.indexOf(83) != -1 ){
      ship.stop();
    }
    if(keys.indexOf(67) != -1 ){
      game.changeFrame();
    }

  };

  GameView.prototype.preventScroll = function(event){
    console.log("space")
    event.preventDefault();
  }




})();