/**
 * Author: Juan Antonio Aldea Armenteros
 * Date: 5/31/13
 * Time: 7:48 PM
 */

ResourceManager = Class.extend({
    resources: {},
    audioContext: null,
    pendingResources: 0,

    init: function () {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new webkitAudioContext();
        } catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    },

    loadResources: function (resources) {
        this.pendingResources = resources.length;
        var resource = {};
        for (var i = 0; i < resources.length; i++) {
            resource = resources[i];
            this.loadResource(resource.name, resource.type, resource.url);
        }
    },

    playsound: function (name) {
        var source = this.audioContext.createBufferSource(); // creates a sound source
        source.buffer = this.resources[name];                    // tell the source which sound to play
        source.connect(this.audioContext.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
    },

    loadResource: function (name, type, url) {
        if (this.resources[name] === undefined) {
            if (type == "img") {
                this.loadImage(name, url);
            } else if (type == "sound") {
                this.loadSound(name, url, this);
            } else if (type == "script") {
                this.xhrGet(url, this.loadScript, null, name);
            }
        } else {
            this.loadFinished();
        }
    },

    xhrGet: function (reqUri, callback, type, name) {
        var request = new XMLHttpRequest();
        request.open('GET', reqUri, true);
        request.responseType = type;
        var self = this;
        request.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(name, self, this);
            }
        }
        request.send()
    },

    loadImage: function (name, url) {
        this.resources[name] = new Image();
        var img = this.resources[name];
        var self = this;
        img.onload = function () {
            self.loadFinished();
        }
        img.src = url;
    },

    loadSound: function (name, url, context) {
        this.xhrGet(
            url,
            function (name, context, response) {
                context.audioContext.decodeAudioData(
                    response.response,
                    function (decoded) {
                        context.resources[name] = decoded;
                        context.loadFinished();
                    },
                    function (msg) {
                        console.log(msg)
                    }
                )
            },
            'arraybuffer',
            name
        );
    },

    loadScript: function (name, context) {
        // NOP
    },

    loadFinished: function () {
        this.pendingResources--;
        if (this.pendingResources == 0) {
            console.log(this.resources);
            this.loadCompleted();
        }
    },

    loadCompleted: function () {
        this.playsound("hit");
    }
});

var RM = new ResourceManager();

var resources = [
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
    }
];

resources = JSON.parse(JSON.stringify(resources));
RM.loadResources(resources);
