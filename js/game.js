Game = Class.extend({

    world: null,

    player: null,

    inputEngine: null,


    init: function () {

    },

    load_level: function (number) {
        var current_level = levels[number];
        this.setup_bubbles(current_level.bubbles);
        this.setup_blocks(current_level.blocks);
    },

    setup_bubbles: function (bubbles) {
        for (var bubbleIndex = 0; bubbleIndex < bubbles.length; bubbleIndex++) {
            new Bubble(bubbles[bubbleIndex]);
        }
    },

    setup_blocks: function (blocks) {
        for (var i = 0; i < blocks.length; i++) {
            new Block(blocks[i])
        }
    },

    setup_walls: function () {

        //ceiling
        new Block({
            position: {
                x: 0.5,
                y: 0
            },
            half_size: {
                width: 0.5,
                height: 0.01
            },
            destroyable: false,
            type: "block"
        });

        //floor
        new Block({
            position: {
                x: 0.5,
                y: 1
            },
            half_size: {
                width: 0.5,
                height: 0.01
            },
            destroyable: false,
            type: "block-floor"
        });
        //left wall
        new Block({
            position: {
                x: 0,
                y: 0.5
            },

            half_size: {
                width: 0.003,
                height: 0.5
            },

            destroyable: false,
            type: "block-floor"
        });

        new Block({
            position: {
                x: 1,
                y: 0.5
            },

            half_size: {
                width: 0.003,
                height: 0.5
            },

            destroyable: false,
            type: "block-floor"
        });
    },

    setup_draw_debug: function () {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(this.world.canvas.getContext("2d"));
        debugDraw.SetDrawScale(this.world.scale);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.world.SetDebugDraw(debugDraw);
    },

    update: function () {
        if (this.inputEngine) {
            var movement = new b2Vec2(0, 0);
            //var current_velocity = this.player.body.GetLinearVelocity();
            //movement.Add(current_velocity);
            var spawnPoint = this.player.body.GetPosition();
            if (this.inputEngine.actions['move-up']) {
                if (!harpoon) {
                    var spawnPoint = this.player.body.GetPosition();
                    spawnPoint.x /= GameWorld.scaled_width;
                    spawnPoint.y /= GameWorld.scaled_height;;
                    harpoon = new Rope({x: spawnPoint.x, y: spawnPoint.y});
                }
            }

            if (this.inputEngine.actions['move-down']) {
                //if (!harpoon) var harpoon = new Harpoon(5, 5, 5);
            }

            if (this.inputEngine.actions['move-left']) {
                movement.x += -1;
            }

            if (this.inputEngine.actions['move-right']) {
                movement.x += 1;
            }

            if (movement.x !== 0 || movement.y !== 0) {
                movement.Normalize();
                movement.Multiply(self.player.linear_velocity);
            }

            this.player.body.SetLinearVelocity(movement);
        }

        this.world.update();
    },

    start: function () {
        this.setup_draw_debug();
        this.setup_walls();
        this.load_level(0);
        var self = this;
        window.setInterval(function () {
            self.update();
        }, 1000 / 60);
    }
});
