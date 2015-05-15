var TMT = TMT || {};

//loading the game asset
TMT.Preload = function () {};

TMT.Preload.prototype = {
    preload: function () {
        //load game asset
        this.load.image('gamebg', 'asset/images/BG 480x800.png');
        this.load.image('startButton', 'asset/images/buttons/startUp.png');
        this.load.image('startButton', 'asset/images/buttons/startDown.png');
        this.load.image('board', 'asset/images/buttons/highScoresUp.png');
        this.load.image('board1', 'asset/images/buttons/highScoresDown.png');
        this.load.image('soundOn', 'asset/images/buttons/soundOnUp.png');
        this.load.image('soundOff', 'asset/images/buttons/soundOffUp.png');
        
        this.load.image('logo', 'asset/images/logo.png');
        this.load.image('fire', 'asset/images/fire.png');
        this.load.image('backUp', 'asset/images/buttons/backUp.png');
        this.load.image('backDown', 'asset/images/buttons/backDown.png');
        this.load.image('continueDown', 'asset/images/buttons/continueDown.png');
        this.load.image('continueUp', 'asset/images/buttons/continueUp.png');
        this.load.image('levelselect', 'asset/images/levelselect.png');
        this.load.image('SelectLogo', 'asset/images/SorryChris/SelectLogo.png');
        this.load.image('level1', 'asset/images/SorryChris/level1.png');
        this.load.image('level2', 'asset/images/SorryChris/level2.png');
        this.load.image('level3', 'asset/images/SorryChris/level3.png');
        this.load.image('level4', 'asset/images/SorryChris/level4.png');
        this.load.image('gameend', 'asset/images/SorryChris/gameend.png');
        this.load.image('tutorial', 'asset/images/SorryChris/tutorial.png');
        this.load.image('peaks', 'asset/images/bgSmall.png');
                
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
        // When we finish loading all game asset, go to MainMenu state
        this.state.start('MainMenu');
    }
};