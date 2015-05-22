var TMT = TMT || {};

//loading the game www/asset
TMT.Preload = function () {};

TMT.Preload.prototype = {
    preload: function () {
        //load game www/asset
        this.load.image('gamebg', 'www/asset/images/BG 480x800.png');
		this.load.image('vborder', 'www/asset/images/vborder.png');
		this.load.image('hborder', 'www/asset/images/hborder.png');
        this.load.image('startButton', 'www/asset/images/buttons/startUp.png');
        this.load.image('startDown', 'www/asset/images/buttons/startDown.png');
        this.load.image('board', 'www/asset/images/buttons/highScoresUp.png');
        this.load.image('board1', 'www/asset/images/buttons/highScoresDown.png');
		this.load.image('achieve', 'www/asset/images/buttons/acheivementsUp.png');
        this.load.image('achieve1', 'www/asset/images/buttons/acheivementsDown.png');
        this.load.image('soundOnUp', 'www/asset/images/buttons/soundOnUp.png');
        this.load.image('soundOnDown', 'www/asset/images/buttons/soundOnDown.png');
        this.load.image('soundOffUp', 'www/asset/images/buttons/soundOffUp.png');
        this.load.image('soundOffDown', 'www/asset/images/buttons/soundOffDown.png');
		this.load.image('pauseDown', 'www/asset/images/buttons/pauseDown.png');
		this.load.image('pauseUp', 'www/asset/images/buttons/pauseUp.png');
		this.load.image('foreground','www/asset/images/bg_fg.png');
		this.load.image('foregroundScores','www/asset/images/bg_fg_scores.png');
        
        this.load.image('logo', 'www/asset/images/fancy.png');
        this.load.image('fire', 'www/asset/images/fire.png');
        this.load.image('backUp', 'www/asset/images/buttons/backUp.png');
        this.load.image('backDown', 'www/asset/images/buttons/backDown.png');
        this.load.image('continueDown', 'www/asset/images/buttons/continueDown.png');
        this.load.image('continueUp', 'www/asset/images/buttons/continueUp.png');
        this.load.image('SelectLogo', 'www/asset/images/SorryChris/SelectLogo.png');
        this.load.image('level1', 'www/asset/images/SorryChris/level1.png');
        this.load.image('level2', 'www/asset/images/SorryChris/level2.png');
        this.load.image('level3', 'www/asset/images/SorryChris/level3.png');
        this.load.image('level4', 'www/asset/images/SorryChris/level4.png');
        this.load.image('lose', 'www/asset/images/SorryChris/lose.png');
		this.load.image('win', 'www/asset/images/SorryChris/win.png');
        this.load.image('tutorial', 'www/asset/images/SorryChris/tutorial.png');
        this.load.image('peaks', 'www/asset/images/bgSmall.png');
		this.load.image('rules', 'www/asset/images/rules.png');
		this.load.image('rules2', 'www/asset/images/rules2.png');
		this.load.image('rules3', 'www/asset/images/rules3.png');
       
        this.load.spritesheet('progress', 'www/asset/images/progress.png', 400, 40);
        this.load.spritesheet('terrain', 'www/asset/images/spritesheets/terrain100.png', 100, 100);
        this.load.spritesheet('plane1', 'www/asset/images/spritesheets/plane100.png', 100, 100);
        this.load.spritesheet('boat1', 'www/asset/images/spritesheets/boat100.png', 100, 100);
        this.load.spritesheet('train1', 'www/asset/images/spritesheets/train100.png', 100, 100);
		this.load.spritesheet('glow1', 'www/asset/images/spritesheets/glow100.png', 100, 100);
    },
    create: function () {
    },
    update: function () {
        // When we finish loading all game asset, go to MainMenu state
        this.state.start('MainMenu');
    }
};