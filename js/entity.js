/**
 * @author Juan Antonio
 */

Entity = Class.extend({
    position: {
        x: 0,
        y: 0
    },

    size: {
        width: 0,
        height: 0
    },

    init: function (position, size) {
        if (position) {
            this.position.x = position.x;
            this.position.y = position.y;
        }
        if (size) {
            this.size.x = size.x;
            this.size.y = size.y;
        }
    },

    update: function () {
        console.log("Entity update");
    },

    apply_input: function () {
    },

    on_spawn: function () {
    },

    on_kill: function () {
    },

    before_collision: function () {
    },

    on_collision: function () {
    },

    after_collision: function () {
    },

    draw: function () {
    }
});
