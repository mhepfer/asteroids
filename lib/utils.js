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
  
  Util.randomVec = function(length){
   var vx = ((Math.random()*21) - 10);
   var vy = ((Math.random()*21) - 10);
   return [vx, vy];
  }
  
})();