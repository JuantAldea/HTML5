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
        fixDef.shape = new b2CircleShape(bubble.radius * GameWorld.scaled_height);

        bodyDef.position.x = bubble.position.x;
        bodyDef.position.y = bubble.position.y;

        bodyDef.userData = {};
        bodyDef.userData["name"] = bubble.name ? bubble.name : "bubble";

        this.parent(bodyDef, fixDef);
        //console.log(this);

        this.body.ApplyImpulse(new b2Vec2(bubble.impulse.x, bubble.impulse.y), this.body.GetWorldCenter());

    },

    update: function () {

    },


    split: function () {
        var bubble = {
            radius: 1,
            position: {
                x: 0.5,
                y: 0.5
            },
            impulse: {
                x: 5,
                y: 5
            }
        };
        new Bubble(bubble);
        new Bubble(bubble);
    },

    onTouch: function (otherObject) {
        this.lives -= 1;
        if (this.lives >= 0) {
            this.split();
        }
    }
});
