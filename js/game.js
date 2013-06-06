Game = Class.extend({

    world: null,

    player: null,

    inputEngine: null,

    harpoonHandler: new HarpoonHandler(),

    init: function () {

    },

    load_level: function (number) {
        var current_level = levels[number];
        this.setup_bubbles(current_level.bubbles);
        this.setup_blocks(current_level.blocks);
    },

    setup_bubbles: function (bubbles) {
        for (var bubbleIndex = 0; bubbleIndex < bubbles.length; bubbleIndex++) {
            GameWorld.spawnBubble(bubbles[bubbleIndex]);
        }
    },

    setup_blocks: function (blocks) {
        for (var i = 0; i < blocks.length; i++) {
            GameWorld.spawnBlock(blocks[i]);
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
                height: 0.003
            },
            destroyable: false,
            type: 'static',
            name: "block"
        });

        //floor
        new Block({
            position: {
                x: 0.5,
                y: 1
            },
            half_size: {
                width: 0.5,
                height: 0.003
            },
            destroyable: false,
            type: 'static',
            name: "block-floor"
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
            type: 'static',
            name: "block-floor"
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
            type: 'static',
            name: "block-floor"
        });
    },

    setup_draw_debug: function () {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(this.world.canvas.getContext("2d"));
        debugDraw.SetDrawScale(this.world.scale);
        debugDraw.SetFillAlpha(0);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.world.SetDebugDraw(debugDraw);
    },

    update: function () {
        if (this.inputEngine) {
            if (this.inputEngine.actions['fire']) {
                var position = this.player.body.GetPosition();
                var spawnPoint = new b2Vec2(position.x / GameWorld.scaled_width, position.y / GameWorld.scaled_height);
                this.harpoonHandler.spawnHarpoon(spawnPoint.x, spawnPoint.y);
            }

            var movement = new b2Vec2(0, 0);

            if (this.inputEngine.actions['move-up']) {

            }

            if (this.inputEngine.actions['move-down']) {

            }

            if (this.inputEngine.actions['move-left']) {
                movement.x += -1;
                this.player.left();
            }

            if (this.inputEngine.actions['move-right']) {
                movement.x += 1;
                this.player.right();
            }

            if (movement.x !== 0 || movement.y !== 0) {
                movement.Normalize();
                movement.Multiply(self.player.linear_velocity);
            } else {
                this.player.stop();
            }

            this.player.body.SetLinearVelocity(movement);
        }

        this.harpoonHandler.update();
        this.world.update();
        this.world.draw(true);
        this.player.draw();
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
