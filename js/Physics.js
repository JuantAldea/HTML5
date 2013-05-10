Vec2 = Box2D.Common.Math.b2Vec2;
BodyDef = Box2D.Dynamics.b2BodyDef;
Body = Box2D.Dynamics.b2Body;
FixtureDef = Box2D.Dynamics.b2FixtureDef;
Fixture = Box2D.Dynamics.b2Fixture;
World = Box2D.Dynamics.b2World;
MassData = Box2D.Collision.Shapes.b2MassData;
PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
CircleShape = Box2D.Collision.Shapes.b2CircleShape;
DebugDraw = Box2D.Dynamics.b2DebugDraw;
RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

PhysicsEngine = Class.extend({
    world: null,
    PHYSICS_LOOP_HZ: 1.0 / 60.0,

    init: function (gravity, sleep) {
        this.world = new World(gravity, sleep);
    },

    update: function () {
        var start = Date.now();
        this.world.Step(this.PHYSICS_LOOP_HZ, 10, 10);
        this.world.ClearForces();
        return (Date.now() - start);
    },

    registerBody: function (bodyDef) {
        return this.world.CreateBody(bodyDef);
    },

    addBody: function (entityDef) {
        var bodyDef = new BodyDef();
        bodyDef.type = entityDef.type == 'static' ? Body.b2_staticBody : Body.b2_dynamicBody;
        bodyDef.position.x = entityDef.x;
        bodyDef.position.y = entityDef.y;

        var body2 = this.registerBody(bodyDef);
        var fixture = new FixtureDef();
        if (entityDef.useBouncyFixture) {
            fixture.density = 1.0;
            fixture.friction = 0.0;
            fixture.restitution = 1.0;
        }
        fixture.shape = new PolygonShape();
        fixture.shape.SetAsBox(entityDef.halfWidth, entityDef.halfHeight);
        body2.CreateFixture(fixture);
        return body2;
    },

    removeBody: function (obj) {
        this.world.DestroyBody(obj);
    }
});
