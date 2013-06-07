/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/19/13
 * Time: 10:01 PM
 */
"use strict";

var HarpoonHandler = Class.extend({
    aliveHarpoons: [],
    lastShootTime: Date.now(),
    cooldown: 300,

    init: function () {

    },

    spawnHarpoon: function (x, y) {
        if (this.aliveHarpoons.length > 2){
            return;
        }

        var now = Date.now();

        if (this.lastShootTime + this.cooldown > now) {
            return;
        }
        this.lastShootTime = now;

        var overlappingHarpoon = false;
        for (var i = 0; i < this.aliveHarpoons.length; i++) {
            if (Math.abs(this.aliveHarpoons[i].x - x) < 0.02) {
                overlappingHarpoon = true;
            }
        }

        if (!overlappingHarpoon) {
            this.aliveHarpoons.push(new Rope({x: x, y: y}));
        }
    },

    update: function () {
        var harpoonsForRemoval = [];
        for (var i = 0; i < this.aliveHarpoons.length; i++) {
            if (!this.aliveHarpoons[i].markedForDestruction) {
                this.aliveHarpoons[i].update();
            } else {
                harpoonsForRemoval.push(this.aliveHarpoons[i]);
            }
        }

        for (var i = 0; i < harpoonsForRemoval.length; i++) {
            this.aliveHarpoons.splice(this.aliveHarpoons.indexOf(harpoonsForRemoval[i]), 1);
        }
    }

});