/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/18/13
 * Time: 2:27 PM
 */

RopeComponent = Block.extend({
    parentRope: null,

    init: function (properties, rope) {
        this.parentRope = rope;
        properties["parentRope"] = rope;
        properties["type"] = "rope";
        this.parent(properties);

        var self = this;

        self.body.ShouldCollide = function (other) {
            var otherData = other.GetUserData();
            if (otherData != null) {
                if (otherData.type == "rope") return false;
                if (otherData.type == "player") return false;
            }

            for (var jn = self.body.m_jointList; jn; jn = jn.next) {
                if (jn.other == other)
                    if (jn.joint.m_collideConnected == false) {
                        return false;
                    }
            }
            // self.parentRope.destroy();
            return true;
        };
    }
});

Rope = Class.extend({
    bodies: [],
    x: 0,
    y: 0,
    fragmentLength: 0,
    count: 0,
    properties: {},
    markedForDestruction: false,
    speed: 1,

    init: function (position) {
        var height = 0.01
        this.x = position.x;
        this.y = position.y;
        this.y -= 0.02
            this.properties = {
                position: {
                    x: this.x,
                    y: this.y
                },
                half_size: {
                    width: 0.001,
                    height: height
                },
                destroyable: false,
                parentRope: this
            };

        this.bodies.push(new RopeComponent(this.properties, this));
    },

    update: function () {

        if (this.bodies.length == 0) {
            return;
        }

        this.properties.position.y = this.y - this.bodies.length * 2 * this.properties.half_size.height;

        if (this.properties.position.y > 0) {
            this.bodies.push(new RopeComponent(this.properties, this));
        }
    },

    destroy: function () {

        if (this.markedForDestruction) {
            return;
        }

        this.markedForDestruction = true;
        for (var i = 0; i < this.bodies.length; i++) {
            GameWorld.DestroyBody(this.bodies[i].body);
        }
        this.bodies = [];
        harpoon = null;
    },

    onTouch: function () {
        this.destroy();
    }
});