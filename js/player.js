State = Class.extend({
    frames: [],
    context: null,
    frameIndex: 0,

    init: function (context) {
        this.context = context;
    },

    draw: function () {
        //var frame = Sprites.frames["left-standing"].frame;
        //this.frameIndex = (this.frameIndex + 1) % (this.frames.length * 5);
        this.frameIndex++;


        //0, 1, 2, 3, 4
        //5, 6, 7, 8, 9
        //10, 11, 12, 13, 14
        var frames = 10;
        this.frameIndex = this.frameIndex < (this.frames.length * frames) ? this.frameIndex : 0
        var p = Math.floor(this.frameIndex / frames);

        var frame = this.frames[p];
        var width = 30 * this.context.size.half_width;
        var height = 30 * this.context.size.half_height;
        var px = this.context.body.GetPosition().x * 30;
        var py = this.context.body.GetPosition().y * 30;
        GameWorld.context.drawImage(RM.resources["sprites"],
            frame.x, frame.y,
            frame.w, frame.h,
            px - width, py - height,
            width * 2, height * 2);
    },

    left: function () {

    },

    right: function () {

    },

    stop: function () {

    }
});

IdleRight = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["right0"].frame);
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_RIGHT_WALKING;
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});

IdleLeft = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["left0"].frame);
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_LEFT_WALKING;
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});

IdleFront = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["left0"].frame);
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_LEFT_IDLE;
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_RIGHT_IDLE;
    }

});

WalkingLeft = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["left0"].frame);
        this.frames.push(Sprites.frames["left1"].frame);
        this.frames.push(Sprites.frames["left2"].frame);
        this.frames.push(Sprites.frames["left3"].frame);
        this.frames.push(Sprites.frames["left4"].frame);
        this.frames.push(Sprites.frames["left5"].frame);
        this.frames.push(Sprites.frames["left6"].frame);
        this.frames.push(Sprites.frames["left7"].frame);
    },

    stop: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_LEFT_IDLE;
    },

    right: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});

WalkingRight = State.extend({
    init: function (context) {
        this.parent(context);
        this.frames.push(Sprites.frames["right0"].frame);
        this.frames.push(Sprites.frames["right1"].frame);
        this.frames.push(Sprites.frames["right2"].frame);
        this.frames.push(Sprites.frames["right3"].frame);
        this.frames.push(Sprites.frames["right4"].frame);
        this.frames.push(Sprites.frames["right5"].frame);
        this.frames.push(Sprites.frames["right6"].frame);
        this.frames.push(Sprites.frames["right7"].frame);
    },

    stop: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_RIGHT_IDLE;
    },

    left: function () {
        this.frameIndex = 0;
        this.context.state = this.context.STATE_FRONT_IDLE;
    }
});


Player = PhysicsObject.extend({

    STATE_FRONT_IDLE: new IdleFront(this),
    STATE_LEFT_IDLE: new IdleLeft(this),
    STATE_RIGHT_IDLE: new IdleRight(this),
    STATE_LEFT_WALKING: new WalkingLeft(this),
    STATE_RIGHT_WALKING: new WalkingRight(this),
    state: null,

    vulnerabilityCD: 2000,
    lastLiveLoss: Date.now(),
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
    velocity: new b2Vec2(0, 0),

    init: function () {
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
        //fixDef.shape = new b2CircleShape();
        //fixDef.shape.SetRadius(GameWorld.scaled_height * 0.05);
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
            var now = Date.now();
            if (now - this.lastLiveLoss >= this.vulnerabilityCD) {
                this.lastLiveLoss = now;
                this.lives--;
                if (this.lives < 0) {
                    GameWorld.togglePause();
                }
                RM.playsound("hit");
            }
        }
    },

    index: 0,

    draw: function () {
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
