"use strict";

var Player = PhysicsObject.extend({
    STATE_FRONT_IDLE: new IdleFront(this),
    STATE_LEFT_IDLE: new IdleLeft(this),
    STATE_RIGHT_IDLE: new IdleRight(this),
    STATE_LEFT_WALKING: new WalkingLeft(this),
    STATE_RIGHT_WALKING: new WalkingRight(this),
    state: null,

    vulnerabilityCD: 3000,

    lastLiveLoss: 0,

    lives: 3,

    position: {
        x: 0.5,
        y: 0.95
    },

    size: {
        half_width: 1,
        half_height: 3
    },

    linear_velocity: 10,

    velocity: null,

    invulnerable: false,

    init: function () {
        this.velocity = new b2Vec2(0, 0);
        this.STATE_FRONT_IDLE = new IdleFront(this);
        this.STATE_LEFT_IDLE = new IdleLeft(this);
        this.STATE_RIGHT_IDLE = new IdleRight(this);
        this.STATE_LEFT_WALKING = new WalkingLeft(this);
        this.STATE_RIGHT_WALKING = new WalkingRight(this);
        this.state = this.STATE_FRONT_IDLE;
        var fixDef = new b2FixtureDef();
        fixDef.density = 100000000000;
        fixDef.friction = 0;
        fixDef.restitution = 0;
        this.size.half_width = (GameWorld.scaled_height * 0.05) * 0.51;
        this.size.half_height = GameWorld.scaled_height * 0.05;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(this.size.half_width, this.size.half_height);

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = this.position.x;
        bodyDef.position.y = this.position.y;
        bodyDef.fixedRotation = true;

        bodyDef.userData = {
            name: "player",
            object: this
        };

        this.parent(bodyDef, fixDef);
    },

    onCollision: function (object) {
        if (object == "bubble") {
            if (!this.invulnerable) {
                this.invulnerable = true;
                this.lastLiveLoss = Date.now();
                this.lives--;
                RM.playSound("hit");
            }
        }
    },

    index: 0,

    draw: function () {
        if (this.invulnerable && (Date.now() - this.lastLiveLoss) >= this.vulnerabilityCD) {
            this.invulnerable = false;
        }
        this.state.draw();
    },

    left: function () {
        this.state.left();
    },

    right: function () {
        this.state.right();
    },

    stop: function () {
        this.state.stop();
    }
});
