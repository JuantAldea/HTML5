var levels = [];

var level1 = {
    bubbles: [
        {
            radius: 1,
            position: {
                x: 0.5,
                y: 0.5
            },
            impulse: {
                x: 5,
                y: 5
            }
        },
        {
            radius: 1,
            position: {
                x: 0.2,
                y: 0.2
            },
            impulse: {
                x: 50,
                y: 50
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
            type: "block"
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
            type: "block"
        }
    ]
};

levels.push(level1);
