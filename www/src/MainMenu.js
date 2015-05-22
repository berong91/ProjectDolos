var TMT = TMT || {};

var music = true;

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
		this.startButton.events.onInputDown.add(this.startDown, this);
        this.startButton.anchor.setTo(0.5, 0.8);
        
        // Add leader board button
        this.boardButton = this.game.add.button(this.game.world.width * 0.3, this.game.world.height * 0.82, 'board', this.boardClickEvent, this);
		this.boardButton.events.onInputDown.add(this.scoresDown, this);
        this.boardButton.anchor.setTo(0.5, 0.8);
		
		//Add achievement button
		this.achieveButton = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.82, 'achieve', this.achieveClickEvent, this);
		this.achieveButton.events.onInputDown.add(this.achieveDown, this);
        this.achieveButton.anchor.setTo(0.5, 0.8);

        //Add mute button
        this.muteButton = this.game.add.button(this.game.world.width * 0.7, this.game.world.height * 0.82, 'soundOnUp', this.muteClickEvent, this);
        this.muteButton.events.onInputDown.add(this.muteDown, this);
        this.muteButton.anchor.setTo(0.5, 0.8);
        
       
        //this.addButton = this.game.add.button(0, 0, 'startButton', this.addClickEvent, this);
    },
    update: function () {
		//this.game.input.onDown.add(this.startPressHold, this);
        if (!!this.ready) {
            this.game.state.start('MainMenu');
        }
    },
	scoresDown: function() {
		if(this.game.input.pointer1.isDown) {
			this.boardButton.loadTexture('board1');
		}
		this.boardButton.loadTexture('board1');
	},
	achieveDown: function() {
		if(this.game.input.pointer1.isDown) {
			this.achieveButton.loadTexture('achieve1');
		}
		this.achieveButton.loadTexture('achieve1');
	},
	startDown: function() {
		if(this.game.input.pointer1.isDown) {
			this.startButton.loadTexture('startDown');
		}
		this.startButton.loadTexture('startDown');
	},
    muteDown: function() {
        if (music === true) {
            if(this.game.input.pointer1.isDown) {
                this.muteButton.loadTexture('soundOnDown');
            }
            this.muteButton.loadTexture('soundOnDown');
        } else {
            if(this.game.input.pointer1.isDown) {
                this.muteButton.loadTexture('soundOffDown');
            }
            this.muteButton.loadTexture('soundOffDown');
        }
    },
    startClickEvent: function () {
        this.game.state.start('LevelSelect');
    },
    boardClickEvent: function() {
        this.game.state.start('LeaderBoard');
    },
	achieveClickEvent: function() {
        this.game.state.start('Achievements');
    },
    muteClickEvent: function() {
        if(music === true) {
            bgSound.stop();
            music = false;
            this.muteButton.loadTexture('soundOffUp');
        } else {
            bgSound.loopFull(0.6);
            music = true;
            this.muteButton.loadTexture('soundOnUp');
        }
    }
};