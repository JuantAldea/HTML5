InputEngine = Class.extend({
    bindings: {},
    actions: {},

    mouse: {
        x: 0,
        y: 0
    },

    init: function () {
        this.bind(87, 'move-up');
        this.bind(65, 'move-left');
        this.bind(83, 'move-down');
        this.bind(68, 'move-right');

        var self = this;
        document.getElementById('canvas').addEventListener('mousemove', function (event) {
            self.onMouseMove(event);
        });

        document.getElementById('canvas').addEventListener('keydown', function (event) {
            self.onKeyDown(event);
        });

        document.getElementById('canvas').addEventListener('keyup', function (event) {
            self.onKeyUp(event);
        });
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
