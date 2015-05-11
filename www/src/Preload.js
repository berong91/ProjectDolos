var TMT = TMT || {};

//loading the game asset
TMT.Preload = function () {};

// Global variables for game music
var bgSound;
var explosionSound;
var switchSound;

TMT.Preload.prototype = {
    preload: function () {
        //load game asset
        this.load.image('background', 'asset/images/background.png');
        this.load.image('gamebg', 'asset/images/BG 480x800.png');
        this.load.image('startButton', 'asset/images/start-button.png');
        this.load.image('logo', 'asset/images/logo.png');

        this.load.spritesheet('terrain', 'asset/images/terrain.png', 100, 100);
        this.load.spritesheet('plane1', 'asset/images/spritesheets/plane100.png', 100, 100);
        this.load.spritesheet('plane2', 'asset/images/spritesheets/plane200.png', 100, 100);
        this.load.spritesheet('plane3', 'asset/images/spritesheets/plane300.png', 100, 100);
        this.load.spritesheet('boat1', 'asset/images/spritesheets/boat100.png', 100, 100);
        this.load.spritesheet('boat2', 'asset/images/spritesheets/boat200.png', 100, 100);
        this.load.spritesheet('boat3', 'asset/images/spritesheets/boat300.png', 100, 100);
        this.load.spritesheet('train1', 'asset/images/spritesheets/train100.png', 100, 100);
        this.load.spritesheet('train2', 'asset/images/spritesheets/train200.png', 100, 100);
        this.load.spritesheet('train3', 'asset/images/spritesheets/train300.png', 100, 100);

        this.load.audio('switch', 'asset/audio/switch.wav');
        this.load.audio('explosion', 'asset/audio/explosion.ogg');
        this.load.audio('bgsound', 'asset/audio/flea.mp3');
    },
    create: function () {
        //show loading screen
        this.background = this.game.add.sprite(this.game.world.centerX, 280, 'background');
        this.background.anchor.setTo(0.5);

        // Load all music
        bgSound = this.add.audio('bgsound');
        explosionSound = this.game.add.audio('explosion');
        switchSound = this.game.add.audio('switch');
        this.sound.setDecodedCallback([bgSound, explosionSound, switchSound], this.startBgMusic, this);
    },
    update: function () {

    },
    startBgMusic: function () {
        bgSound.loopFull(0.6);
        this.state.start('MainMenu');
    }
};