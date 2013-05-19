InputEngine = Class.extend({
    bindings: {},
    actions: {},

    mouse: {
        x: 0,
        y: 0
    },

    init: function () {
        //this.bind(87, 'move-up');
        this.bind(32, 'move-up');
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
        document.getElementById('canvas').addEventListener('mousemove', function (event) {
            self.onMouseMove(event);
        });

        document.getElementById('canvas').addEventListener('touchstart', function (event) {
            self.onMouseDown(event);
        });

        document.getElementById('canvas').addEventListener('touchend', function (event) {
            self.onMouseUp(event);
        });

        document.getElementById('canvas').addEventListener('mousedown', function (event) {
            self.onMouseDown(event);
        });

        document.getElementById('canvas').addEventListener('mouseup', function (event) {
            self.onMouseUp(event);
        });

        document.getElementById('canvas').addEventListener('keydown', function (event) {
            console.log(event.keyCode);
            self.onKeyDown(event);
        });

        document.getElementById('canvas').addEventListener('keyup', function (event) {
            self.onKeyUp(event);
        });
    },

    onMouseDown: function(event){
        this.actions['move-up'] = true;
    },

    onMouseUp: function(event){
        this.actions['move-up'] = false;
    },
    onKeyDown: function (event) {
        var action = this.bindings[event.keyCode];
        if (action) {
            this.actions[action] = true;
        }
    },


    onMouseMove: function (event) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
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