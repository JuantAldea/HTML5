/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 6/7/13
 * Time: 4:38 AM
 */

var resources = [
    {
        name: "src",
        type: "script",
        url: "js/box2D.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/sprites.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/core.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/levels.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/box2DShortcuts.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/physicsObject.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/bubble.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/block.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/rope.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/harpoonHandler.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/world.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/inputEngine.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/player.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/game.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/main.js"
    },
    {
        name: "src",
        type: "script",
        url: "js/lives.js"
    },
    {
        name: "bg1",
        type: "img",
        url: "./img/background1.png"
    },
    {
        name: "sprites",
        type: "img",
        url: "./img/sprites.png"
    },
    {
        name: "explosion",
        type: "sound",
        url: "./sound/explosion.wav"
    },
    {
        name: "bounce",
        type: "sound",
        url: "./sound/bounce.wav"
    },
    {
        name: "hit",
        type: "sound",
        url: "./sound/hit.wav"
    },
    {
        name: "heart",
        type: "img",
        url: "./img/heart.png"
    }
];

window.onload = function () {
    var request = new XMLHttpRequest();
    request.open('GET', "js/resourceManager.js", true);
    request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var file = document.createElement('script');
            file.setAttribute("type", "text/javascript");
            file.innerHTML = this.responseText;
            document.getElementsByTagName("head")[0].appendChild(file);
            RM.loadResources(resources);
        }
    }
    request.send();
}
