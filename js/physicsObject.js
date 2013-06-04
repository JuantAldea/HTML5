/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/10/13
 * Time: 1:12 PM
 */

PhysicsObject = Class.extend({
    body: null,

    bodyDef: null,

    fixDef: null,

    init: function (bodyDef, fixDef) {
        this.bodyDef = bodyDef;
        this.fixDef = fixDef;
        this.bodyDef.position.x *= GameWorld.scaled_width;
        this.bodyDef.position.y *= GameWorld.scaled_height;
        this.body = GameWorld.CreateBody(this.bodyDef);
        this.body.CreateFixture(this.fixDef);
    },

    getPosition: function () {
        var p = this.body.GetPosition();
        return {
            x: p.x / GameWorld.scaled_width,
            y: p.y / GameWorld.scaled_height
        };
    },

    update: function () {
    },

    onCollision: function () {

    }
})
;