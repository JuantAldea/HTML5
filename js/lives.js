/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 6/7/13
 * Time: 2:21 AM
 */
"use strict";
var Lives = Class.extend({
    player: null,

    init: function (player) {
        this.player = player;
    },

    draw: function (context) {
        var py = GameWorld.scaled_height / 2;
        var px = GameWorld.scaled_width / 4;
        for (var i = 0; i < this.player.lives; i++) {
            context.drawImage(RM.resources["heart"], 0, 0, 128, 128,
                px + GameWorld.scaled_width * i * 0.80, py,
                GameWorld.scaled_width * 0.75, GameWorld.scaled_width * 0.75);
        }
    }
});