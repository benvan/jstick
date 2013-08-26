var Point = function(x,y){
    this.x = x;
    this.y = y;
    this.toString = function(){
        return "x:"+this.x+",y:"+this.y;
    };
};

var JStick = function(opts){

    var extend = function(a,b){ for (var i in b) a[i] = b[i]; return a; };
    var shallowClone = function(o){ return extend({}, o); };

    var bind = function(joystick){
        joystick.settings.target.addEventListener('mousedown',function(ev){
            if (joystick.enabled && ev.button == 0){
                joystick.settings.onactivate.apply(joystick);
                joystick.active = true;
                joystick.start = new Point(ev.pageX, ev.pageY);
            }
        });
        document.addEventListener('mouseup', function(ev){
            if (joystick.enabled){
                var wasActive = joystick.active;
                joystick.active = false;
                if (wasActive) joystick.settings.onrelease.apply(joystick);
            }
        });
        document.addEventListener('mousemove', function(ev){
            if (joystick.enabled){
                joystick.now.x = ev.pageX;
                joystick.now.y = ev.pageY;
                if (joystick.active) joystick.settings.ondrag.apply(joystick);
            }
        });
    };

    var diff = function(dimension){
        return function(sensitivity){
            return (this.now[dimension] - this.start[dimension]) / (sensitivity ? Math.pow(10,sensitivity) : 1) * (( this.settings.invertY && dimension == 'y') ? -1 : 1);
        }
    };

    var noop = function(){};
    var defaults = {
        target: document,
        invertY: true,
        onrelease: noop,
        onactivate: noop,
        ondrag: noop
    };
    var settings = extend(defaults, opts);

    var joystick = extend(this, {
        settings: settings,
        enabled: true,
        active: false,
        start: new Point(0,0),
        now: new Point(0,0),
        dx: diff('x'),
        dy: diff('y')
    });

    bind(joystick);

    return joystick;
};
