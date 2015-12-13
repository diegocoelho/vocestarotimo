Parse.initialize("bck5MqFK8Xm5LK6TBuaSec2LRaVsz9Bff4cV55W2", "iONuVeJEeqF1RCoLXCXBciFxntpUk1k7AFKfshEo");

var alpha = 0, beta = 0, gamma = 0;
    total_a = 0; // total acceleration.
var STARted = false;
var sphere = document.getElementById("sphere");
var Estrela = Parse.Object.extend("Estrela");
var arrayEstrelas = [];

if (window.DeviceOrientationEvent != undefined) {
   window.addEventListener('deviceorientation', function(e) {
       alpha = e.alpha;; //alpha é null em laptops
       beta = e.beta;
       gamma = e.gamma;

       document.getElementById("alpha").innerHTML = (alpha == null ? "null" : e.alpha.toFixed(2));
       document.getElementById("beta").innerHTML = beta.toFixed(2);
       document.getElementById("gamma").innerHTML = gamma.toFixed(2);
   });

   setInterval(function() {
     if(STARted) {
       var estrela = new Estrela();
       estrela.set('starid', document.getElementById('starname').value);
       estrela.set('alpha', alpha);
       estrela.set('beta', beta);
       estrela.set('gamma', gamma);
       estrela.set('acceleration', total_a);
       arrayEstrelas.push(estrela);
     }
   }, 50);
} else {
  console.log("Sem suporte para sensor de orientação.");
}

if (window.DeviceMotionEvent != undefined) {
  window.ondevicemotion = function(e) {
    total_a = Math.sqrt(Math.pow(e.acceleration.x, 2) + Math.pow(e.acceleration.y,2) + Math.pow(e.acceleration.z,2));
    document.getElementById("acceleration").innerHTML = total_a.toFixed(1);
  }
}


function brilha(){
    if(STARted){
        STARted = false;
        document.getElementById("startButton").innerHTML = "Start"
        Parse.Object.saveAll(arrayEstrelas, {
            success: function(objs) {
              if(arrayEstrelas.length > 0){
                document.getElementById("status").innerHTML = "Salvamos objetos: " + arrayEstrelas.length;
                arrayEstrelas = [];
              }else{
                document.getElementById("status").innerHTML = "Nada para salvar" + arrayEstrelas;
              }
            },
            error: function(error) {
              document.getElementById("status").innerHTML = error;
            }
        });

    } else {
        STARted = true;
        document.getElementById("startButton").innerHTML = "Stop"
    }
}
