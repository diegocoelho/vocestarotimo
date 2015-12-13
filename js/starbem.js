var alpha = beta = gamma = 0;
var STARted = false;
var sphere = document.getElementById("sphere");
var estrelinha = Parse.Object.extend("estrelinhas");
var arrayEstrelas = []
// moving average:
var smoothed = {x: 0, y : 0, z : 0}, smoothing = 10;

if (window.DeviceOrientationEvent != undefined) {
   window.addEventListener('deviceorientation', function(e) {
       alpha = e.alpha.toFixed(2);
       beta = e.beta.toFixed(2);
       gamma = e.gamma.toFixed(2);

       document.getElementById("rotationAlpha").innerHTML = alpha;
       document.getElementById("rotationBeta").innerHTML = beta;
       document.getElementById("rotationGamma").innerHTML = gamma;
   }

   setInterval(function() {
       if(STARted) {
           var estrela = new estrelinha();
           estrela.set('starid', document.getElementById('starname').value);
           estrela.set('alpha_value', alpha);
           estrela.set('beta_value', beta);
           estrela.set('gamma_value', gamma);
           arrayEstrelas.push(estrela);
      }
   }, 50);
} else {
  console.log("Sem suporte");
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
