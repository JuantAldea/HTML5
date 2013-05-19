World = Class.extend({
    canvas: null,

    width: window.innerWidth,

    height: window.innerHeight,

    scale: 30.0,

    scaled_width: 0,

    scaled_height: 0,

    world: null,

    gravity: new b2Vec2(0, 20),

    bodiesToDestroy: [],

    init: function () {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scaled_width = this.width / this.scale;
        this.scaled_height = this.height / this.scale;
        this.world = new b2World(this.gravity, false);

        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.BeginContact = function (contact) {
            //console.log(contact.GetFixtureA().GetBody().GetUserData());
        }
        listener.EndContact = function (contact) {
            //console.log(contact.GetFixtureA().GetBody().GetUserData());
        }
        listener.PostSolve = function (contact, impulse) {

        }
        listener.PreSolve = function (contact, oldManifold) {
            function compare(type1, type2, obj1, obj2) {
                return type1 == obj1 && type2 == obj2 || type1 == obj2 && type2 == obj1;
            }

            var uDA = contact.m_fixtureA.GetBody().GetUserData();
            var uDB = contact.m_fixtureB.GetBody().GetUserData();
            //console.log(uDA.type, uDB.type);
            if (uDA != null && uDB != null) {
                uDA = uDA['name'];
                uDB = uDB['name'];
                //console.log(uDA, uDB);
                if (compare("rope", "rope", uDA, uDB)) {
                    contact.SetEnabled(false);
                } else if (compare("rope", "player", uDA, uDB)) {
                    contact.SetEnabled(false);
                } else if (compare("rope", "bubble", uDA, uDB)) {
                    contact.SetEnabled(false);
                } else if (compare("player", "bubble", uDA, uDB)) {
                    contact.SetEnabled(false);
                }
            }

        }
        this.world.SetContactListener(listener);
    },

    CreateBody: function (bodyDef) {
        return this.world.CreateBody(bodyDef);
    },

    DestroyBody: function (body) {
        this.bodiesToDestroy.push(body);
    },

    update: function () {
        this.world.Step(1 / 60, 10, 10);
        this.world.DrawDebugData();
        this.world.ClearForces();

        for (var i = 0; i < this.bodiesToDestroy.length; i++) {
            this.world.DestroyBody(this.bodiesToDestroy[i]);
        }
        this.bodiesToDestroy = [];
    }
});
