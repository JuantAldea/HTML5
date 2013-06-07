/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/31/13
 * Time: 7:48 PM
 */
"use strict";

var ResourceManager = function () {
    this.resources = {};
    this.scripts = {};
    this.audioContext = null;
    this.pendingResources = 0;
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new webkitAudioContext();
    } catch (e) {
        alert('Web Audio API is not supported in this browser');
    }
}


ResourceManager.prototype.loadResources = function (resources) {
    this.pendingResources = resources.length;
    var resource = {};
    for (var i = 0; i < resources.length; i++) {
        resource = resources[i];
        this.loadResource(resource.name, resource.type, resource.url);
    }
}

ResourceManager.prototype.playSound = function (name) {
    var source = this.audioContext.createBufferSource();
    source.buffer = this.resources[name];
    source.connect(this.audioContext.destination);
    source.start(0);
}

ResourceManager.prototype.loadResource = function (name, type, url) {
    if (this.resources[name] === undefined) {
        if (type == "img") {
            this.loadImage(name, url);
        } else if (type == "sound") {
            this.loadSound(name, url, this);
        } else if (type == "script") {
            this.loadScript(url);
        }
    } else {
        this.loadFinished();
    }
}

ResourceManager.prototype.xhrGet = function (reqUri, callback, type, name) {
    var request = new XMLHttpRequest();
    request.open('GET', reqUri, true);
    request.responseType = type;
    request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(name, this);
        }
    }
    request.send();
}

ResourceManager.prototype.loadImage = function (name, url) {
    this.resources[name] = new Image();
    var img = this.resources[name];
    var self = this;
    img.onload = function () {
        self.loadFinished();
    }
    img.src = url;
}

ResourceManager.prototype.loadSound = function (name, url, context) {
    var self = this;
    this.xhrGet(
        url,
        function (name, response) {
            self.audioContext.decodeAudioData(
                response.response,
                function (decoded) {
                    self.resources[name] = decoded;
                    self.loadFinished();
                },
                function (msg) {
                    console.log(msg);
                }
            )
        },
        'arraybuffer',
        name
    );
}

ResourceManager.prototype.loadScript = function (url) {
    var self = this;
    this.xhrGet(
        url,
        function (name, response) {
            self.scripts[name] = response.response;
            self.loadFinished();
        },
        '',
        url
    );
}

ResourceManager.prototype.loadFinished = function () {
    this.pendingResources--;
    if (this.pendingResources == 0) {
        this.loadCompleted();
    }
}

ResourceManager.prototype.loadCompleted = function () {
    for (var i = 0; i < resources.length; i++) {
        if (resources[i].type == "script") {
            break;
            var file = document.createElement('script');
            file.setAttribute("type", "text/javascript");
            file.innerHTML = this.scripts[resources[i].url];
            document.getElementsByTagName("head")[0].appendChild(file);
        }
    }

    main();
}
//resources = JSON.parse(JSON.stringify(resources));

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

var RM = new ResourceManager();

RM.loadResources(resources);
