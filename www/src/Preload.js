var SpaceHipster = SpaceHipster || {};

//loading the game asset
SpaceHipster.Preload = function () {};

SpaceHipster.Preload.prototype = {
    preload: function () {
        //show loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        // add fade event
        //this.game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);

        //load game asset
        this.load.image('logo', 'asset/images/logo.png');
        this.load.image('space', 'asset/images/space.png');
        this.load.image('pepe', 'asset/images/superpepe.jpg');
        this.load.image('rock', 'asset/images/rock.png');
        this.load.image('playerParticle', 'asset/images/player-particle.png');
        this.load.image('startButton', 'asset/images/start-button.png');

        this.load.spritesheet('playership', 'asset/images/player.png', 12, 12);
        this.load.spritesheet('power', 'asset/images/power.png', 12, 12);

        this.load.audio('collect', 'asset/audio/collect.ogg');
        this.load.audio('explosion', 'asset/audio/explosion.ogg');
    },
    create: function () {
        this.state.start('MainMenu');
    }
};