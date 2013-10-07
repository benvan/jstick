var extend = function(a,b){ for (var i in b) a[i] = b[i]; return a; };
var shallowClone = function(o){ return extend({}, o); };
var noop = function(){};

var Point = function(x,y){
    this.x = x;
    this.y = y;
    this.toString = function(){
        return "x:"+this.x+",y:"+this.y;
    };
};


var JStick = function(opts){

    var bind = function(joystick){
        joystick.settings.target.addEventListener('mousedown',function(ev){
            if (joystick.enabled && ev.button == 0){
                joystick.activateAt({x: ev.pageX, y: ev.pageY});
            }
        });
        document.addEventListener('mouseup', function(){
            if (joystick.enabled){
                joystick.release();
            }
        });
        document.addEventListener('mousemove', function(ev){
            if (joystick.enabled){
                joystick.dragTo({x: ev.pageX, y: ev.pageY});
            }
        });
    };

    var diff = function(dimension){
        return function(sensitivity){
            var inversion = (( this.settings.invertY && dimension == 'y') ? -1 : 1);
            return (this.now[dimension] - this.start[dimension])
                   / (sensitivity ? Math.pow(10,sensitivity) : 1) * inversion;
        }
    };

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
        activateAt: function(position){
            this.start = new Point(position.x, position.y);
            this.active = true;
            this.settings.onactivate.apply(joystick);
        },
        release: function(){
            var wasActive = this.active;
            this.active = false;
            if (wasActive) this.settings.onrelease.apply(joystick);
        },
        dragTo: function(position){
            this.now.x = position.x;
            this.now.y = position.y;
            if (this.active) this.settings.ondrag.apply(joystick);
        },
        moveTo: function(offset){
            this.now.x = this.start.x + offset.x;
            this.now.y = this.start.y + (offset.y * (this.settings.invertY ? -1 : 1));
        },
        dx: diff('x'),
        dy: diff('y')
    });

    bind(joystick);

    return joystick;
};
