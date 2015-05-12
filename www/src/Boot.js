var TMT = TMT || {};

TMT.Boot = function () {};

//setting game configuration and loading the asset for the loading screen
TMT.Boot.prototype = {
    preload: function () {
        //asset we'll use in the loading screen
        this.load.image('background', 'asset/images/background.png');
    },
    create: function () {
		//set scale of the game
		this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
		
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#000';

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //show loading screen
        this.background = this.game.add.sprite(this.game.world.centerX, 280, 'background');
        this.background.anchor.setTo(0.5);
        this.background.alpha = 0;
        
        this.game.add.tween(this.background).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.finish, this);
    },
    finish: function(){
        this.state.start('Preload');
    }
};