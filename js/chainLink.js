/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/10/13
 * Time: 12:49 PM
 */

ChainLink = PhysicsObject.extend({

    init: function (x, y, options) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x, y);

        var fixDef = new b2FixtureDef();
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(options.width / 2, options.height / 2);
        fixDef.restitution = options.restitution;
        fixDef.density = options.density;
        fixDef.friction = options.friction;

        this.parent(bodyDef, fixDef)
    }
});