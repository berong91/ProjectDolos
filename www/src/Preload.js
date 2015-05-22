var TMT = TMT || {};

//loading the game asset
TMT.Preload = function () {};

TMT.Preload.prototype = {
    preload: function () {
        //load game asset
        this.load.image('gamebg', 'asset/images/BG 480x800.png');
		this.load.image('vborder', 'asset/images/vborder.png');
		this.load.image('hborder', 'asset/images/hborder.png');
        this.load.image('startButton', 'asset/images/buttons/startUp.png');
        this.load.image('startDown', 'asset/images/buttons/startDown.png');
        this.load.image('board', 'asset/images/buttons/highScoresUp.png');
        this.load.image('board1', 'asset/images/buttons/highScoresDown.png');
		this.load.image('achieve', 'asset/images/buttons/acheivementsUp.png');
        this.load.image('achieve1', 'asset/images/buttons/acheivementsDown.png');
        this.load.image('soundOnUp', 'asset/images/buttons/soundOnUp.png');
        this.load.image('soundOnDown', 'asset/images/buttons/soundOnDown.png');
        this.load.image('soundOffUp', 'asset/images/buttons/soundOffUp.png');
        this.load.image('soundOffDown', 'asset/images/buttons/soundOffDown.png');
		this.load.image('pauseDown', 'asset/images/buttons/pauseDown.png');
		this.load.image('pauseUp', 'asset/images/buttons/pauseUp.png');
		this.load.image('foreground','asset/images/bg_fg.png');
        
        this.load.image('logo', 'asset/images/fancy.png');
        this.load.image('fire', 'asset/images/fire.png');
        this.load.image('backUp', 'asset/images/buttons/backUp.png');
        this.load.image('backDown', 'asset/images/buttons/backDown.png');
        this.load.image('continueDown', 'asset/images/buttons/continueDown.png');
        this.load.image('continueUp', 'asset/images/buttons/continueUp.png');
        this.load.image('SelectLogo', 'asset/images/SorryChris/SelectLogo.png');
        this.load.image('level1', 'asset/images/SorryChris/level1.png');
        this.load.image('level2', 'asset/images/SorryChris/level2.png');
        this.load.image('level3', 'asset/images/SorryChris/level3.png');
        this.load.image('level4', 'asset/images/SorryChris/level4.png');
        this.load.image('lose', 'asset/images/SorryChris/lose.png');
		this.load.image('win', 'asset/images/SorryChris/win.png');
        this.load.image('tutorial', 'asset/images/SorryChris/tutorial.png');
        this.load.image('peaks', 'asset/images/bgSmall.png');
		this.load.image('rules', 'asset/images/rules.png');
		this.load.image('rules2', 'asset/images/rules2.png');
		this.load.image('rules3', 'asset/images/rules3.png');
       
        this.load.spritesheet('progress', 'asset/images/progress.png', 400, 40);
        this.load.spritesheet('terrain', 'asset/images/spritesheets/terrain100.png', 100, 100);
        this.load.spritesheet('plane1', 'asset/images/spritesheets/plane100.png', 100, 100);
        this.load.spritesheet('boat1', 'asset/images/spritesheets/boat100.png', 100, 100);
        this.load.spritesheet('train1', 'asset/images/spritesheets/train100.png', 100, 100);
		this.load.spritesheet('glow1', 'asset/images/spritesheets/glow100.png', 100, 100);
    },
    create: function () {
    },
    update: function () {
        /// When we finish loading all game asset, go to MainMenu state
        this.state.start('MainMenu');
    }
};