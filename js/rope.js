/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/18/13
 * Time: 2:27 PM
 */

"use strict";
var RopeComponent = Block.extend({
    parentRope: null,

    init: function (properties, rope) {
        this.parentRope = rope;
        properties.object = rope;
        properties.name = "rope";
        properties.type = "static";

        this.parent(properties);

        var self = this;

        self.body.ShouldCollide = function (other) {
            var otherData = other.GetUserData();
            if (otherData !== null) {
                //if (otherData.name == "rope") return false;
                //if (otherData.name == "player") return false;
            }

            for (var jn = self.body.m_jointList; jn; jn = jn.next) {
                if (jn.other == other)
                    if (jn.joint.m_collideConnected == false) {
                        return false;
                    }
            }
            return true;
        };
    },
    onCollision: function(){
      this.parentRope.onCollision();
    }
});

var Rope = Class.extend({
    bodies: [],
    x: 0,
    y: 0,
    fragmentLength: 0,
    count: 0,
    properties: {},
    markedForDestruction: false,
    speed: 1,
    halfHeight: 0,
    lastExpansionTime: Date.now(),
    expansionTime: 15,
    height: 0.005,

    init: function (position) {
        this.halfHeight = this.height * 2.7;
        this.x = position.x;
        this.y = position.y - this.height;
        //this.y -= 0.02
        this.properties = {
            position: {
                x: this.x,
                y: this.y
            },
            half_size: {
                width: 0.001,
                height: this.height
            },
            destroyable: false,
            object: this
        };
        this.bodies.push(new RopeComponent(this.properties, this));
    },

    update: function () {
        var now = Date.now();
        if (this.lastExpansionTime + this.expansionTime > now){
            return;
        }
        this.lastExpansionTime = now;
        this.properties.position.y = this.y - this.bodies.length * this.halfHeight;
        this.bodies.push(new RopeComponent(this.properties, this));
    },

    destroy: function () {

        if (this.markedForDestruction) {
            return;
        }

        this.markedForDestruction = true;
        for (var i = 0; i < this.bodies.length; i++) {
            GameWorld.DestroyBody(this.bodies[i].body);
            delete this.bodies[i];
        }
        this.bodies = [];
    },

    onCollision: function () {
        this.destroy();
    }
});