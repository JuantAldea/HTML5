"use strict";

var GameWorld = null;

function main() {
    var canvas = document.getElementById('canvas');
    document.getElementById("circular3dG").style.display = "none";
    canvas.style.display = "";
    canvas.focus();
    setTimeout(function () {
        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;
        var s = document.createElement("DIV");
        s.appendChild(document.createTextNode(canvas.width));
        s.appendChild(document.createElement("BR"));
        s.appendChild(document.createTextNode(canvas.height));
        var game = new Game();
        GameWorld = new World();
        var player = new Player();
        GameWorld.player = player;

        game.world = GameWorld;
        game.context = canvas.getContext("2d");
        game.player = player;
        game.livesWidget = new Lives(player);
        game.start();
    }, 50);
};
