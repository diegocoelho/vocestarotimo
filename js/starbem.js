var alpha = 0, beta = 0, gamma = 0;
var STARted = false;
var sphere = document.getElementById("sphere");
var estrelinha = Parse.Object.extend("estrelinhas");

if (window.DeviceOrientationEvent != undefined) {
   window.addEventListener('deviceorientation', function(e) {
      console.log(e);
       alpha = e.alpha == null ? null : e.alpha.toFixed(2); //alpha é null em laptops
       beta = e.beta.toFixed(2);
       gamma = e.gamma.toFixed(2);

       document.getElementById("alpha").innerHTML = alpha;
       document.getElementById("beta").innerHTML = beta;
       document.getElementById("gamma").innerHTML = gamma;
   });

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
