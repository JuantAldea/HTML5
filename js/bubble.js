/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/10/13
 * Time: 1:07 PM
 */

Bubble = PhysicsObject.extend({
    lives: 2,

    init: function (bubble) {

        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0;
        fixDef.restitution = 1.0;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2CircleShape(bubble.radius);

        bodyDef.position.x = bubble.position.x;
        bodyDef.position.y = bubble.position.y;

        this.parent(bodyDef, fixDef);

        console.log(this.body.GetWorldCenter());
        this.body.ApplyImpulse(new b2Vec2(bubble.impulse.x, bubble.impulse.y), this.body.GetWorldCenter());

    },

    update: function () {

    },

    onTouch: function (otherObject) {
        this.lives -= 1;
        if (this.lives < 0) {

        }
    }
});
