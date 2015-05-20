var TMT = TMT || {};

TMT.MainMenu = function () {};

TMT.MainMenu.prototype = {
    preload: function () {
        
    },
    create: function () {
		this.game.input.addPointer();
        // Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, 480, 800, 'peaks');
        //this.background.autoScroll(-20, 0);
        
        // Add logo image
        this.logo = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.25, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        
        // Add start button
        this.startButton = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.65, 'startButton', this.startClickEvent, this);
		this.startButton.events.onInputDown.add(this.touchDown, this);
        this.startButton.anchor.setTo(0.5, 0.8);
        
        // Add leader board button
        this.boardButton = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.82, 'board', this.boardClickEvent, this);
        this.boardButton.anchor.setTo(0.5, 0.8);
        
       
        //this.addButton = this.game.add.button(0, 0, 'startButton', this.addClickEvent, this);
    },
    update: function () {
		//this.game.input.onDown.add(this.startPressHold, this);
        if (!!this.ready) {
            this.game.state.start('MainMenu');
        }
    },
	touchDown: function() {
		if(this.game.input.pointer1.isDown) {
			this.startButton.loadTexture('startDown');
		}
		this.startButton.loadTexture('startDown');
	},
    startClickEvent: function () {
        this.game.state.start('LevelSelect');
    },
    boardClickEvent: function() {
        this.game.state.start('LeaderBoard');
    },
};