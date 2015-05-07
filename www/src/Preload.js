var TMT = TMT || {};

//loading the game asset
TMT.Preload = function () {};

var background;

TMT.Preload.prototype = {
    preload: function () {
        //show loading screen
        background = this.game.add.sprite(this.game.world.centerX, 280, 'logo');
        background.anchor.setTo(0.5);
        this.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);

        var fadePicture = function () {
            this.add.tween(background).to({
                alpha: 0
            }, 2000, Phaser.Easing.Linear.None, true);
        };

        //load game asset
        this.load.image('diamond', 'asset/images/diamond.png');

        this.load.image('space', 'asset/images/space.png');
        this.load.image('pepe', 'asset/images/superpepe.jpg');
        this.load.image('rock', 'asset/images/rock.png');
        this.load.image('startButton', 'asset/images/start-button.png');
        this.load.image('logo', 'asset/images/logo.png');
        this.load.image('jewsDidIt', 'asset/images/towers.png');

        this.load.spritesheet('power', 'asset/images/power.png', 12, 12);
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

        this.load.audio('collect', 'asset/audio/collect.ogg');
        this.load.audio('explosion', 'asset/audio/explosion.ogg');
    },
    create: function () {
        this.state.start('MainMenu');
    },
    render: function () {
        this.game.debug.text("Time until event: " + this.game.time.events.duration, 32, 32);
    }
};