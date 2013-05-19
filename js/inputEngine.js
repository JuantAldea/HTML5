InputEngine = Class.extend({
    bindings: {},
    actions: {},

    mouse: {
        x: 0,
        y: 0
    },

    init: function () {

        this.bind(32, 'fire');
        this.bind(87, 'move-up');
        this.bind(65, 'move-left');
        this.bind(83, 'move-down');
        this.bind(68, 'move-right');

        /*
         this.bind(38, 'move-up');
         this.bind(37, 'move-left');
         this.bind(40, 'move-down');
         this.bind(39, 'move-right');
         */

        var self = this;

        document.getElementById('canvas').addEventListener('touchstart', function (event) {
            self.onMouseDown(event);
        });

        document.getElementById('canvas').addEventListener('touchend', function (event) {
            self.onMouseUp(event);
        });

        document.getElementById('canvas').addEventListener('mousemove', function (event) {
            self.onMouseMove(event);
        });

        document.getElementById('canvas').addEventListener('mousedown', function (event) {
            self.onMouseDown(event);
        });

        document.getElementById('canvas').addEventListener('mouseup', function (event) {
            self.onMouseUp(event);
        });

        document.getElementById('canvas').addEventListener('keydown', function (event) {
            self.onKeyDown(event);
        });

        document.getElementById('canvas').addEventListener('keyup', function (event) {
            self.onKeyUp(event);
        });
    },

    onMouseDown: function (event) {
        this.actions['fire'] = true;
    },

    onMouseUp: function (event) {
        this.actions['fire'] = false;
    },

    onMouseMove: function (event) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    },

    onKeyDown: function (event) {
        var action = this.bindings[event.keyCode];
        if (action) {
            this.actions[action] = true;
        }

    },

    onKeyUp: function (event) {
        var action = this.bindings[event.keyCode];
        if (action !== undefined) {
            this.actions[action] = false;
        }
    },

    bind: function (key, action) {
        for (var keyBind in this.bindings) {
            if (this.bindings[keyBind] == action) {
                delete this.bindings[keyBind];
            }
        }
        this.bindings[key] = action;
    }
});

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}