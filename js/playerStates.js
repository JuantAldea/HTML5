/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 6/7/13
 * Time: 5:17 AM
 */

"use strict";

var State = Class.extend({
    frames: [],
    context: null,
    frameIndex: 0,
    framesPerSprite: 10,

    init: function (context) {
        this.context = context;
    },

    draw: function () {
        this.frameIndex++;
        if (this.context.invulnerable && this.frameIndex % 4 != 0) {
            //frame skip
            return;
        }

        this.frameIndex = this.frameIndex < (this.frames.length * this.framesPerSprite) ? this.frameIndex : 0
        var p = Math.floor(this.frameIndex / this.framesPerSprite);

        var frame = this.frames[p];
        var width = 30 * this.context.size.half_width;
        var height = 30 * this.context.size.half_height;
        var px = this.context.body.GetPosition().x * 30;
        var py = this.context.body.GetPosition().y * 30;
        GameWorld.context.drawImage(RM.resources["sprites"],
            frame.x, frame.y,
            frame.w, frame.h,
            px - width, py - height,
            width * 2, height * 2);
    },

    left: function () {

    },

    right: function () {

    },

    stop: function () {

    }
});

var IdleRight = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["right0"].frame);
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_RIGHT_WALKING;
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});

var IdleLeft = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["left0"].frame);
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_LEFT_WALKING;
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});

var IdleFront = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["left0"].frame);
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_LEFT_IDLE;
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_RIGHT_IDLE;
    }

});

var WalkingLeft = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["left0"].frame);
        this.frames.push(Sprites.frames["left1"].frame);
        this.frames.push(Sprites.frames["left2"].frame);
        this.frames.push(Sprites.frames["left3"].frame);
        this.frames.push(Sprites.frames["left4"].frame);
        this.frames.push(Sprites.frames["left5"].frame);
        this.frames.push(Sprites.frames["left6"].frame);
        this.frames.push(Sprites.frames["left7"].frame);
    },

    stop: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_LEFT_IDLE;
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});

var WalkingRight = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["right0"].frame);
        this.frames.push(Sprites.frames["right1"].frame);
        this.frames.push(Sprites.frames["right2"].frame);
        this.frames.push(Sprites.frames["right3"].frame);
        this.frames.push(Sprites.frames["right4"].frame);
        this.frames.push(Sprites.frames["right5"].frame);
        this.frames.push(Sprites.frames["right6"].frame);
        this.frames.push(Sprites.frames["right7"].frame);
    },

    stop: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_RIGHT_IDLE;
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});