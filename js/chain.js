Harpoon = Class.extend({
    body: null,

    bodyDef: null,

    fixture: null,

    speed: 0,

    init: function (x, y, speed) {
        this.bodyDef = new b2BodyDef();
        this.bodyDef.type = b2Body.b2_dynamicBody;
        this.bodyDef.position.x = 5;
        this.bodyDef.position.y = 25;
        this.body = GameWorld.CreateBody(this.bodyDef);

        this.fixture = new b2FixtureDef();
        this.fixture.density = 10000;
        this.fixture.friction = 1;
        this.fixture.restitution = 0;
        this.fixture.shape = new b2PolygonShape();
        this.fixture.shape.SetAsBox(1, 1);

        this.body.CreateFixture(this.fixture);
        this.body.SetLinearVelocity(new b2Vec2(0, -25));
        this.speed = speed;
    },

    update: function () {
        if (this.body && this.fixture) {
            this.body.DestroyFixture(this.fixture);
        }

        //this.fixture = new b2FixtureDef();
        //this.fixture.density = 10000;
        //this.fixture.friction = 1;
        //this.fixture.restitution = 0;
        //this.fixture.shape = new b2PolygonShape();
        //var position = this.body.GetPosition();
        //this.fixture.shape.SetAsBox(1, position.y);
        //this.body.CreateFixture(this.fixture);

        console.log(this.body.GetPosition());
    }
});

