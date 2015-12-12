Parse.initialize("bck5MqFK8Xm5LK6TBuaSec2LRaVsz9Bff4cV55W2", "iONuVeJEeqF1RCoLXCXBciFxntpUk1k7AFKfshEo");

var x = 0, y = 0,z = 0;
    vx = 0, vy = 0,vz = 0,
    ax = 0, ay = 0, az = 0;

var sphere = document.getElementById("sphere");
var Estrelinhas = Parse.Object.extend("estrelinhas");
var estrelinha = new Estrelinhas();

if (window.DeviceMotionEvent != undefined) {
    window.ondevicemotion = function(e) {
        ax = event.accelerationIncludingGravity.x * 5;
        ay = event.accelerationIncludingGravity.y * 5;
        e.acceleration
        document.getElementById("accelerationX").innerHTML = e.acceleration.x;
        document.getElementById("accelerationY").innerHTML = e.acceleration.y;
        document.getElementById("accelerationZ").innerHTML = e.acceleration.z;

        if ( e.rotationRate ) {
            document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
            document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
            document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
        }
    }

    setInterval( function() {
        var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
        if ( landscapeOrientation) {
            vx = vx + ay;
            vy = vy + ax;
            vz = vz + az;

        } else {
            vy = vy - ay;
            vx = vx + ax;
            vz = vz + az;
        }
        vx = vx * 0.98;
        vy = vy * 0.98;
        vz = vz * 0.98;
        document.getElementById("vx").innerHTML = vx;
        document.getElementById("vy").innerHTML = vy;
        document.getElementById("vz").innerHTML = vz;
        y = parseInt(y + vy);
        x = parseInt(x + vx);
        z = parseInt(z + vz);
        //estrelinha.save({x_value: x, y_value:y, z_value : z});
        boundingBoxCheck();

        sphere.style.top = y + "px";
        sphere.style.left = x + "px";

    }, 25);
}


function boundingBoxCheck(){
    if (x<0) { x = 0; vx = -vx; }
    if (y<0) { y = 0; vy = -vy; }
    if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = -vx; }
    if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = -vy; }

}
