/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/10/13
 * Time: 1:07 PM
 */

Bubble = PhysicsObject.extend({
    isSplit: false,

    init: function (bubble) {
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0;
        fixDef.restitution = 1.0;

        var bodyDef = new b2BodyDef();
        bodyDef.userData = copy(bubble);
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2CircleShape(bubble.radius * GameWorld.scaled_height);

        bodyDef.position.x = bubble.position.x;
        bodyDef.position.y = bubble.position.y;

        bodyDef.userData.object = this;
        bodyDef.userData.name = bodyDef.userData.name ? bodyDef.userData.name : "bubble";

        var color = Math.floor((Math.random() * 10) % Sprites.bubbles.length);
        bodyDef.userData.sprite = bodyDef.userData.sprite ? bodyDef.userData.sprite : Sprites.frames[[Sprites.bubbles[color]]];

        this.parent(bodyDef, fixDef);

        this.body.ApplyImpulse(new b2Vec2(bodyDef.userData.impulse.x, bodyDef.userData.impulse.y), this.body.GetWorldCenter());
    },

    update: function () {

    },


    split: function () {
        this.isSplit = true;
        var bubble = this.bodyDef.userData;
        var bubble1 = copy(bubble);
        var bubble2 = copy(bubble);
        bubble1.position = this.getPosition();
        bubble1.radius *= 0.5;
        bubble1.impulse.x = -bubble.impulse.x * 0.75;
        bubble1.impulse.y = -bubble.impulse.y * 0.75;
        GameWorld.spawnBubble(bubble1);

        bubble2.position = this.getPosition();
        bubble2.radius *= 0.5;
        bubble2.impulse.x = bubble.impulse.x * 0.75;
        bubble2.impulse.y = -bubble.impulse.y * 0.75;
        GameWorld.spawnBubble(bubble2);
    },

    onCollision: function (other) {
        if (other == "rope" && !this.isSplit) {
            if (this.bodyDef.userData.lives > 0) {
                this.bodyDef.userData.lives--;
                this.split();
            }
            GameWorld.DestroyBody(this.body);
            RM.playsound("explosion");
        }
    },

    draw: function (ctx) {
        var scaledRadius = this.bodyDef.userData.radius * GameWorld.scaled_height * 30;
        var px = this.body.GetPosition().x * 30 - scaledRadius;
        var py = this.body.GetPosition().y * 30 - scaledRadius;
        var sprite = this.bodyDef.userData.sprite;
        ctx.drawImage(RM.resources["sprites"], sprite.frame.x, sprite.frame.y, sprite.frame.w,sprite.frame.h , px, py, scaledRadius * 2, scaledRadius * 2);
    }
});
