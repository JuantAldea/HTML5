Player = PhysicsObject.extend({
    position: {
        x: 0.5,
        y: 0.9455
    },
    size: {
        half_width: 1,
        half_height: 1
    },
    linear_velocity: 30,
    velocity: new b2Vec2(0, 0),

    init: function () {
        var fixDef = new b2FixtureDef();
        fixDef.density = 100000000000;
        fixDef.friction = 0;
        fixDef.restitution = 0;
        fixDef.shape = new b2PolygonShape();
        //fixDef.shape.SetAsBox(this.size.half_width * GameWorld.scaled_width, this.size.half_height * GameWorld.scaled_height);
        fixDef.shape.SetAsBox(this.size.half_width, this.size.half_height);

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = this.position.x;
        bodyDef.position.y = this.position.y;

        this.parent(bodyDef, fixDef);
    }
});

