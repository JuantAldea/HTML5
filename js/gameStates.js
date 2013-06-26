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
        this.context.setup_level(1);
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