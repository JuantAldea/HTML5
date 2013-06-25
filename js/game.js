"use strict";

var GameState = Class.extend({
    context: null,

    update: function () {
    },

    init: function (context) {
        this.context = context;
    }
});

var GameStatePaused = GameState.extend({
    update: function () {
        if (!this.context) {
            return;
        }
        var context = this.context;
        if (context.inputEngine) {
            if (context.inputEngine.actions['toggle-pause']) {
                if (Date.now() - context.lastPauseToggle > 100) {
                    context.world.togglePause();
                    context.gameState = context.GAME_STATE_RUNNING;
                    context.lastPauseToggle = Date.now();
                }
            }
        }
    }
});

var GameStateLevelInterlude = GameState.extend({
    update: function () {
        this.context.world.clearBodies();
        this.context.world.update();
        this.context.setup_level(0);
        this.context.gameState = this.context.GAME_STATE_RUNNING;
    }
});

var GameStateRunning = GameState.extend({
    update: function () {
        if (!this.context) {
            return;
        }

        var context = this.context;
        if (context.inputEngine) {
            if (context.inputEngine.actions['toggle-pause']) {
                if (Date.now() - context.lastPauseToggle > 100) {
                    context.world.togglePause();
                    context.gameState = context.GAME_STATE_PAUSED;
                    context.lastPauseToggle = Date.now();
                }
            }

            if (context.inputEngine.actions['fire']) {
                var position = context.player.body.GetPosition();
                var spawnPoint = new b2Vec2(position.x / context.world.scaled_width, position.y / context.world.scaled_height);
                context.harpoonHandler.spawnHarpoon(spawnPoint.x, spawnPoint.y);
            }
            var movement = new b2Vec2(0, 0);

            if (context.inputEngine.actions['move-up']) {

            }

            if (context.inputEngine.actions['move-down']) {
                this.context.world.clearBodies();
            }

            if (context.inputEngine.actions['move-left']) {
                movement.x += -1;
                context.player.left();
            }

            if (context.inputEngine.actions['move-right']) {
                movement.x += 1;
                context.player.right();
            }

            if (movement.x !== 0 || movement.y !== 0) {
                movement.Normalize();
                movement.Multiply(context.player.linear_velocity);
            } else {
                context.player.stop();
            }

            context.player.body.SetLinearVelocity(movement);
        }

        context.harpoonHandler.update();
        context.world.update();

        if (this.context.player.lives < 0){
            this.context.gameState = this.context.GAME_STATE_LOST;
        }else if (this.context.world.aliveBubbles == 0){
            console.log("running -> interlude");
            this.context.gameState = this.context.GAME_STATE_LEVEL_INTERLUDE;
        }
    }
});

var GameStateLost = GameState.extend({
    update: function () {
        if (!this.context) {
            return;
        }
    }
});

var Game = Class.extend({
    context: null,

    world: null,

    player: null,

    inputEngine: new InputEngine(),

    harpoonHandler: new HarpoonHandler(),

    livesWidget: null,

    gameState: null,

    GAME_STATE_RUNNING: null,

    GAME_STATE_PAUSED: null,

    GAME_STATE_LOST: null,

    lastPauseToggle: 0,

    init: function () {
        this.GAME_STATE_PAUSED = new GameStatePaused(this);
        this.GAME_STATE_RUNNING = new GameStateRunning(this);
        this.GAME_STATE_LEVEL_INTERLUDE = new GameStateLevelInterlude(this);
        this.GAME_STATE_LOST = new GameStateLost(this);
        this.gameState = this.GAME_STATE_RUNNING;
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
        this.gameState.update();
        this.world.draw(true);
        this.player.draw();
        this.livesWidget.draw(this.context);
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

    setup_level: function(number){
        var self = this;
        var setup_bubbles = function (bubbles) {
            for (var bubbleIndex = 0; bubbleIndex < bubbles.length; bubbleIndex++) {
                self.world.spawnBubble(bubbles[bubbleIndex]);
            }
        };

        var setup_blocks = function (blocks) {
            for (var i = 0; i < blocks.length; i++) {
                self.world.spawnBlock(blocks[i]);
            }
        };

        var current_level = levels[number];

        setup_bubbles(current_level.bubbles);
        setup_blocks(current_level.blocks);
    },

    start: function () {
        this.setup_draw_debug();
        this.setup_walls();
        this.setup_level(0);
        var self = this;
        window.setInterval(function () {
            self.update();
        }, 1000 / 60);
    }
});


