var TMT = TMT || {};

//loading the game asset
TMT.Preload = function () {};

TMT.Preload.prototype = {
    preload: function () {
        //load game asset
        this.load.image('gamebg', 'asset/images/BG 480x800.png');
        this.load.image('startButton', 'asset/images/buttons/startUp.png');
        this.load.image('logo', 'asset/images/logo.png');
        this.load.image('fire', 'asset/images/fire.png');
		this.load.image('scorebg', 'asset/images/Scorebg.png');
		
        this.load.spritesheet('progress', 'asset/images/progress.png', 400, 40);
        this.load.spritesheet('terrain', 'asset/images/spritesheets/terrain100.png', 100, 100);
        this.load.spritesheet('plane1', 'asset/images/spritesheets/plane100.png', 100, 100);
        this.load.spritesheet('plane2', 'asset/images/spritesheets/plane200.png', 100, 100);
        this.load.spritesheet('plane3', 'asset/images/spritesheets/plane300.png', 100, 100);
        this.load.spritesheet('boat1', 'asset/images/spritesheets/boat100.png', 100, 100);
        this.load.spritesheet('boat2', 'asset/images/spritesheets/boat200.png', 100, 100);
        this.load.spritesheet('boat3', 'asset/images/spritesheets/boat300.png', 100, 100);
        this.load.spritesheet('train1', 'asset/images/spritesheets/train100.png', 100, 100);
        this.load.spritesheet('train2', 'asset/images/spritesheets/train200.png', 100, 100);
        this.load.spritesheet('train3', 'asset/images/spritesheets/train300.png', 100, 100);
    },
    create: function () {
    },
    update: function () {
        this.state.start('MainMenu');
    }
};