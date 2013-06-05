/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/10/13
 * Time: 1:57 PM
 */

Block = PhysicsObject.extend({
    half_width: 0,
    half_height: 0,

    init: function (block) {
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(block.half_size.width * GameWorld.scaled_width, block.half_size.height * GameWorld.scaled_height);
        this.half_height = block.half_size.height;
        this.half_width = block.half_size.width;
        var bodyDef = new b2BodyDef();
        bodyDef.type = block.type == 'kinematic' ? b2Body.b2_kinematicBody : block.type == 'dynamic' ? b2Body.b2_dynamicBody : b2Body.b2_staticBody;
        //bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = block.position.x;
        bodyDef.position.y = block.position.y;
        block.object = this;

        var color = Math.floor((Math.random() * 10) % Sprites.blocks.length);

        block.sprite = block.sprite ? block.sprite : Sprites.frames[[Sprites.blocks[color]]];

        bodyDef.userData = block;

        this.parent(bodyDef, fixDef);

        var self = this;

        self.body.ShouldCollide = function (other) {
            for (var jn = self.body.m_jointList; jn; jn = jn.next) {
                if (jn.other == other)
                    if (jn.joint.m_collideConnected == false) {
                        return false;
                    }
            }
            var otherData = other.GetUserData();
            if (otherData["parentRope"]) {

            }
            return true;
        };
    },

    onCollision: function () {
    },

    destroy: function () {
    },

    draw: function (ctx) {
        var px = this.body.GetPosition().x * 30;
        var py = this.body.GetPosition().y * 30;
        var sprite = this.bodyDef.userData.sprite;
        var half_height = this.half_height * 30 * GameWorld.scaled_height;
        var half_width = this.half_width * 30 * GameWorld.scaled_width;
        var frame = sprite.frame;
        ctx.drawImage(RM.resources["sprites"], frame.x, frame.y,
            frame.w, frame.h,
            px - half_width, py - half_height,
            half_width * 2, half_height * 2);
    }
});
