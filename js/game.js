"use strict";

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


