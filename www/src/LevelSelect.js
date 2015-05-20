var TMT = TMT || {};

//title screen
TMT.LevelSelect = function () {};

TMT.LevelSelect.prototype = {
    preload: function () {
        
    },
    create: function () {
        var y = this.game.height/8;
        // Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');
        //this.background.autoScroll(-5, 0);
        
        // Add logo image
        this.logo = this.game.add.sprite(this.game.width /2, y*1.5, 'SelectLogo');
        this.logo.scale.setTo(0.7);
        this.tutbutt = this.game.add.sprite(this.game.width /2, y*2.5, 'tutorial');
        this.tutbutt.scale.setTo(1.5);
        this.lev1butt = this.game.add.sprite(this.game.width /2, y*3.5, 'level1');
        this.lev2butt = this.game.add.sprite(this.game.width /2, y*4.5, 'level2');
        this.lev3butt = this.game.add.sprite(this.game.width /2, y*5.5, 'level3');
        this.lev4butt = this.game.add.sprite(this.game.width /2, y*6.5, 'level4');
        this.tutbutt.anchor.setTo(0.5, 0.5);
        this.lev1butt.anchor.setTo(0.5, 0.5);
        this.lev2butt.anchor.setTo(0.5, 0.5);
        this.lev3butt.anchor.setTo(0.5, 0.5);
        this.lev4butt.anchor.setTo(0.5, 0.5);
        this.logo.anchor.setTo(0.5, 0.5);

        this.tutbutt.inputEnabled = true;
        this.lev1butt.inputEnabled = true;
        this.lev2butt.inputEnabled = true;
        this.lev3butt.inputEnabled = true;
        this.lev4butt.inputEnabled = true;
        this.tutbutt.events.onInputDown.add(this.tutorialclickevent, this);
        this.lev1butt.events.onInputDown.add(this.leveloneclickevent, this);
        this.lev2butt.events.onInputDown.add(this.leveltwoclickevent, this);
        this.lev3butt.events.onInputDown.add(this.levelthreeclickevent, this);
        this.lev4butt.events.onInputDown.add(this.levelfourclickevent, this);
        
        // Add back button
        this.backButton = this.game.add.button(this.game.width / 2, y*7.5, 'backUp', this.backClickEvent, this);
		this.backButton.events.onInputDown.add(this.touchDown, this);
        this.backButton.anchor.setTo(0.5, 0.8);
        this.backButton.scale.set(0.5, 0.5);
    },
    tutorialclickevent: function () {
        level = 0;
        this.game.state.start('Game');
    },
    leveloneclickevent: function () {
        level = 1;
        this.game.state.start('Game');
    },
    leveltwoclickevent: function () {
        level = 2;
        this.game.state.start('Game');
    },
    levelthreeclickevent:function () {
        level = 3;
        this.game.state.start('Game');
    },
    levelfourclickevent: function () {
        level = 4;
        this.game.state.start('Game');
    },
    update: function () {
        
    },
	touchDown: function() {
		if(this.game.input.pointer1.isDown) {
			this.backButton.loadTexture('backDown');
		}
		this.backButton.loadTexture('backDown');
	},
    startClickEvent: function () {
        this.game.state.start('Game');
    },
    backClickEvent: function(){
        this.game.state.start('MainMenu');
    }
};