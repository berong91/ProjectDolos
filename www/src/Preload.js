var SpaceHipster = SpaceHipster || {};

//loading the game asset
SpaceHipster.Preload = function () {};

SpaceHipster.Preload.prototype = {
    preload: function () {
        //show loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        //load game asset
        this.load.image('space', 'asset/images/space.png');
        this.load.image('rock', 'asset/images/rare_pepe.jpg');
        this.load.spritesheet('playership', 'asset/images/player.png', 12, 12);
        this.load.spritesheet('power', 'asset/images/power.png', 12, 12);
        this.load.image('playerParticle', 'asset/images/player-particle.png');
        this.load.audio('collect', 'asset/audio/collect.ogg');
        this.load.audio('explosion', 'asset/audio/explosion.ogg');
    },
    create: function () {
        this.state.start('MainMenu');
    }
};