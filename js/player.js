Player = PhysicsObject.extend({
    position: {
        x: 0.5,
        y: 0.95
    },
    size: {
        half_width: 0.1,
        half_height: 0.
    },
    linear_velocity: 30,
    velocity: new b2Vec2(0, 0),

    init: function () {
        var fixDef = new b2FixtureDef();
        fixDef.density = 100000000000;
        fixDef.friction = 0;
        fixDef.restitution = 0;
        //fixDef.shape = new b2PolygonShape();
        fixDef.shape = new b2CircleShape();
        fixDef.shape.SetRadius(GameWorld.scaled_height * 0.05);
        //fixDef.shape.SetAsBox(this.size.half_width * GameWorld.scaled_width, this.size.half_height * GameWorld.scaled_height);
        //fixDef.shape.SetAsBox(this.size.half_width, this.size.half_height);

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = this.position.x;
        bodyDef.position.y = this.position.y;
        bodyDef.fixedRotation = true;

        bodyDef.userData = {};
        bodyDef.userData["name"] = "player";

        this.parent(bodyDef, fixDef);

        /*
        var self = this;
        self.body.ShouldCollide = function (other) {
            var otherData = other.GetUserData();
            if (otherData != null) {
                if (otherData.name == "rope") return false;
            }

            if (this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) {
                return false;
            }

            for (var jn = self.body.m_jointList; jn; jn = jn.next) {
                if (jn.other == other)
                    if (jn.joint.m_collideConnected == false) {
                        return false;
                    }
            }
            return true;
        };*/
    }
});

