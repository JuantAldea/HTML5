/**
 * @author Juan Antonio
 */
MovableEntity = Entity.extend({

    velocity_modulus: 0,

    velocity_vector: {
        x: 0,
        y: 0
    },

    acceleration_modulus: 0,

    acceleration_vector: {
        x: 0,
        y: 0
    },

    init: function () {
        this.parent();
    },

    update: function () {
        this.parent();
    }

});
