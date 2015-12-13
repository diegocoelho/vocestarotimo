var x = 0, y = 0, z = 0;
   vx = 0, vy = 0, vz = 0,
   ax = 0, ay = 0, az = 0;
var STARted = false;
var sphere = document.getElementById("sphere");
var estrelinha = Parse.Object.extend("estrelinhas");
var arrayEstrelas = []
// moving average:
var smoothed = {x: 0, y : 0, z : 0}, smoothing = 10;

if (window.DeviceMotionEvent != undefined) {
   window.deviceorientation = function(e) {
       document.getElementById("rotationAlpha").innerHTML = e.alpha.toFixed(2);
       document.getElementById("rotationBeta").innerHTML = e.beta.toFixed(2);
       document.getElementById("rotationGamma").innerHTML = e.gamma.toFixed(2);
   }

   setInterval(function() {
       alpha = document.getElementById("rotationAlpha").innerHTML.toFixed(2);
       beta = document.getElementById("rotationBeta").innerHTML.toFixed(2);
       gamma = document.getElementById("rotationGamma").innerHTML.toFixed(2);
       if(STARted) {
           var estrela = new estrelinha();
           estrela.set('starid', document.getElementById('starname').value);
           estrela.set('alpha_value', alpha);
           estrela.set('beta_value', beta);
           estrela.set('gamma_value', gamma);
           arrayEstrelas.push(estrela);
      }
   }, 50);
}

function brilha(){
    if(STARted){
        STARted = false;
        document.getElementById("startButton").innerHTML = "Start"
        Parse.Object.saveAll(arrayEstrelas);
    } else {
        STARted = true;
        document.getElementById("startButton").innerHTML = "Stop"
    }
}
