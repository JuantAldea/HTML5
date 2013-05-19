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
        this.world = new b2World(this.gravity, false);;
    },

    CreateBody: function (bodyDef) {
        return this.world.CreateBody(bodyDef);
    },

    DestroyBody: function (body) {
        this.bodiesToDestroy.push(body);
    },

    update: function () {
        if (harpoon) harpoon.update();
        this.world.Step(1 / 60, 10, 10);
        this.world.DrawDebugData();
        this.world.ClearForces();

        for (var i = 0; i < this.bodiesToDestroy.length; i++) {
            this.world.DestroyBody(this.bodiesToDestroy[i]);
        }
        this.bodiesToDestroy = [];
    }
});
