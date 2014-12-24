(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util = {}
  
  Util.inherits = function (childObj, parentObj) {
    function Surrogate(){};
    Surrogate.prototype = parentObj.prototype;
    childObj.prototype = new Surrogate(); 
  }
  
  Util.randomVec = function(game){
    // vx^2 + vy^2 = norm^2, norm should be less than speed limit
    // sqrt(vx^2 + vy^2) < velocityMax
   var vx = (Math.random()*(game.velocityLimit*0.5));
   // var norm = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
   var vyMax = Math.sqrt(Math.pow(game.velocityLimit, 2) - Math.pow(vx, 2))
   var vy = 0.5*(Math.random()*vyMax);
   return [vx, vy];
  }
  
})();