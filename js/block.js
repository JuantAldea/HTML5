/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/10/13
 * Time: 1:57 PM
 */

Block = PhysicsObject.extend({

    init: function (block) {
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(block.half_size.width * GameWorld.scaled_width, block.half_size.height * GameWorld.scaled_height);

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = block.position.x;
        bodyDef.position.y = block.position.y;

        this.parent(bodyDef, fixDef);
    }
});
