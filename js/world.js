"use strict";
var World = Class.extend({
    paused: false,

    canvas: null,
    context: null,

    width: window.innerWidth,

    height: window.innerHeight,

    scale: 30.0,

    scaled_width: 0,

    scaled_height: 0,

    world: null,

    gravity: null,

    bodiesToDestroy: [],
    lastStep: Date.now(),

    newBubbles: [],
    bubbles: [],
    blocks: [],
    player: null,

    init: function () {
        this.gravity = new b2Vec2(0, 20);
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scaled_width = this.width / this.scale;
        this.scaled_height = this.height / this.scale;
        this.world = new b2World(this.gravity, false);
        var self = this;
        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.BeginContact = function (contact) {
            function compare(type1, type2, obj1, obj2) {
                return type1 == obj1 && type2 == obj2 || type1 == obj2 && type2 == obj1;
            }

            var uDA = contact.m_fixtureA.GetBody().GetUserData();
            var uDB = contact.m_fixtureB.GetBody().GetUserData();
            uDA = uDA['name'];
            uDB = uDB['name'];
            if (uDA != null && uDB != null) {
                if (compare("rope", "block", uDA, uDB)) {
                    //NOP
                }
            }
        };

        listener.EndContact = function (contact) {
            function compare(type1, type2, obj1, obj2) {
                return type1 == obj1 && type2 == obj2 || type1 == obj2 && type2 == obj1;
            }

            var uDA = contact.m_fixtureA.GetBody().GetUserData();
            var uDB = contact.m_fixtureB.GetBody().GetUserData();
            uDA = uDA['name'];
            uDB = uDB['name'];

            if (uDA != null && uDB != null) {
                if (compare("block", "rope", uDA, uDB)) {
                    //NOP
                }
            }
        };

        listener.PostSolve = function (contact, impulse) {
            function compare(type1, type2, obj1, obj2) {
                return type1 == obj1 && type2 == obj2 || type1 == obj2 && type2 == obj1;
            }

            var uDA = contact.m_fixtureA.GetBody().GetUserData();
            var uDB = contact.m_fixtureB.GetBody().GetUserData();
            if (uDA != null && uDB != null) {
                uDA = uDA['name'];
                uDB = uDB['name'];
                if (compare("rope", "bubble", uDA, uDB)) {

                }
            }
        };

        listener.PreSolve = function (contact, oldManifold) {
            function compare(type1, type2, obj1, obj2) {
                return type1 == obj1 && type2 == obj2 || type1 == obj2 && type2 == obj1;
            }

            if (!contact.IsTouching()) {
                return;
            }

            var uDA = contact.m_fixtureA.GetBody().GetUserData();
            var uDB = contact.m_fixtureB.GetBody().GetUserData();
            if (uDA != null && uDB != null) {
                uDA = uDA['name'];
                uDB = uDB['name'];
                if (compare("rope", "rope", uDA, uDB)) {
                    contact.SetEnabled(false);
                } else if (compare("rope", "player", uDA, uDB)) {
                    contact.SetEnabled(false);
                } else if (compare("player", "bubble", uDA, uDB)) {
                    self.player.onCollision("bubble");

                    contact.SetEnabled(false);
                    //} else if (compare("player", "block-floor", uDA, uDB)) {
                    //} else if (compare("rope", "block", uDA, uDB)) {
                    //} else if (compare("rope", "bubble", uDA, uDB)) {
                } else {
                    contact.m_fixtureA.GetBody().GetUserData().object.onCollision(uDB);
                    contact.m_fixtureB.GetBody().GetUserData().object.onCollision(uDA);
                    //contact.SetEnabled(false);
                }
            }

        };

        this.world.SetContactListener(listener);
    },

    CreateBody: function (bodyDef) {
        return this.world.CreateBody(bodyDef);
    },

    DestroyBody: function (body) {
        if (this.bodiesToDestroy.indexOf(body) == -1) {
            this.bodiesToDestroy.push(body);
        }
    },

    spawnBubble: function (bubble) {
        this.newBubbles.push(bubble);
    },

    spawnBlock: function (block) {
        this.blocks.push(new Block(block));
    },

    togglePause: function () {
        this.paused = !this.paused;
    },

    update: function () {
        if (!this.paused) {
            var currentTime = Date.now();
            var dt = currentTime - this.lastStep;
            var steps = Math.floor(dt / 16.667);
            this.lastStep += steps * 16.667;

            for (var i = 0; i < steps; i++) {
                this.world.Step(1.0 / 60.0, 10, 10);
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.world.ClearForces();

            for (var i = 0; i < this.newBubbles.length; i++) {
                this.bubbles.push(new Bubble(this.newBubbles[i]));
            }

            this.newBubbles = [];


            for (var i = 0; i < this.bodiesToDestroy.length; i++) {
                this.bubbles.erase(this.bodiesToDestroy[i].GetUserData().object);
                this.world.DestroyBody(this.bodiesToDestroy[i]);
            }

            this.bodiesToDestroy = [];

            if (this.bubbles.length == 0) {
                this.togglePause();
            }
        }
    },

    draw: function (debug) {
        this.context.drawImage(RM.resources["bg1"], 0, 0, this.canvas.width, this.canvas.height)
        for (var i = 0; i < this.bubbles.length; i++) {
            this.bubbles[i].draw(this.context);
        }

        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw(this.context);
        }

        if (debug) {
            this.world.DrawDebugData();
        }
    }
});
