Parse.initialize("bck5MqFK8Xm5LK6TBuaSec2LRaVsz9Bff4cV55W2", "iONuVeJEeqF1RCoLXCXBciFxntpUk1k7AFKfshEo");

var x = 0, y = 0, z = 0;
   vx = 0, vy = 0, vz = 0,
   ax = 0, ay = 0, az = 0;
var STARted = false;
var sphere = document.getElementById("sphere");
 var Estrelinhas = Parse.Object.extend("estrelinhas");
 var estrelinha = new Estrelinhas();

if (window.DeviceMotionEvent != undefined) {
   window.ondevicemotion = function(e) {
       ax = e.acceleration.x;
       ay = e.acceleration.y;
       az = e.acceleration.z;

       //e.acceleration
       document.getElementById("accelerationX").innerHTML = ax.toFixed(2);
       document.getElementById("accelerationY").innerHTML = ay.toFixed(2);
       document.getElementById("accelerationZ").innerHTML = az.toFixed(2);

       if ( e.rotationRate ) {
           document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha.toFixed(2);
           document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta.toFixed(2);
           document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma.toFixed(2);
       }
   }

   setInterval(function() {
       // aceleração --> velocidade
       var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
       if (landscapeOrientation) {
           vx = vx + ay;
           vy = vy + ax;
           vz = vz + az;
       } else {
           vy = vy - ay;
           vx = vx + ax;
           vz = vz + az;
       }
       // desaceleração
       decay = .8
       vx = vx * decay;
       vy = vy * decay;
       vz = vz * decay;
       document.getElementById("vx").innerHTML = vx.toFixed(2);
       document.getElementById("vy").innerHTML = vy.toFixed(2);
       document.getElementById("vz").innerHTML = vz.toFixed(2);

       // velocidade --> posição
       y = parseInt(y + vy);
       x = parseInt(x + vx);
       z = parseInt(z + vz);

       boundingBoxCheck();

       sphere.style.top = y + "px";
       sphere.style.left = x + "px";
       if(STARted){
          estrelinha.save({x_value: x, y_value:y, z_value : z, starid: 'estrelinha2'});
       }

   }, 50);
}

function brilha(){
    if(STARted){
        STARted = false;
        document.getElementById("startButton").innerHTML = "Start"
    } else {
        STARted = true;
        document.getElementById("startButton").innerHTML = "Stop"
    }
}


function boundingBoxCheck(){
   if (x<0) { x = 0; vx = -vx; }
   if (y<0) { y = 0; vy = -vy; }
   if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = -vx; }
   if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = -vy; }

}
