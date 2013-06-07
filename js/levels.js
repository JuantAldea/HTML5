var levels = [];

var level1 = {
    bubbles: [
        {
            lives: 2,
            radius: 0.05,
            position: {
                x: 0.5,
                y: 0.5
            },
            impulse: {
                x: 0,
                y: 1
            }
        },
        {
            lives: 1,
            radius: 0.05,
            position: {
                x: 0.2,
                y: 0.2
            },
            impulse: {
                x: 0,
                y: 1
            }
        }
    ],

    blocks: [
        {
            position: {
                x: 0.3,
                y: 0.3
            },
            half_size: {
                width: 0.1,
                height: 0.01
            },
            destroyable: false,
            type: 'static',
            name: "block"
        },
        {
            position: {
                x: 0.7,
                y: 0.7
            },
            half_size: {
                width: 0.1,
                height: 0.01
            },
            destroyable: false,
            type: 'static',
            name: "block"
        }
    ]
};

levels.push(level1);
