var Point = function(x,y){
    this.x = x;
    this.y = y;
    this.toString = function(){
        return "x:"+this.x+",y:"+this.y;
    };
};

var JStick = function(opts){
    var bind = function(joystick){
        target.addEventListener('mousedown',function(ev){
            if (joystick.enabled && ev.button == 0){
                opts.onactivate();
                joystick.active = true;
                joystick.start = new Point(ev.pageX, ev.pageY);
            }
        });
        document.addEventListener('mouseup', function(ev){
            if (joystick.enabled){
                var wasActive = joystick.active;
                joystick.active = false;
                if (wasActive) opts.onrelease();
            }
        });
        document.addEventListener('mousemove', function(ev){
            if (joystick.enabled){
                joystick.now.x = ev.pageX;
                joystick.now.y = ev.pageY;
                if (joystick.active) opts.ondrag(joystick.now);
            }
        });
    };
    var init = function(joystick){
        var noop = function(){};
        ['onrelease','onactivate','ondrag'].forEach(function(i){ opts[i] || (opts[i] = noop); });
        opts.target || (opts.target = document);
        bind(joystick);
        return joystick;
    };
    var diff = function(dimension){
        return function(sensitivity){
            return (this.now[dimension] - this.start[dimension]) / (sensitivity ? Math.pow(10,sensitivity) : 1);
        }
    };
    return init({
        enabled: true,
        active: false,
        start: new Point(0,0),
        now: new Point(0,0),
        dx: diff('x'),
        dy: diff('y')
    });
};