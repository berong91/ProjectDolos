var TMT = TMT || {};

//title screen
TMT.LevelSelect = function () {};

TMT.LevelSelect.prototype = {
    preload: function () {
        
    },
    create: function () {
        // Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');
        this.background.autoScroll(-20, 0);
        
        // Add logo image
        this.logo = this.game.add.sprite(this.game.width / 2, 155, 'SelectLogo');
        this.tutbutt = this.game.add.sprite(this.game.width / 2, 250, 'tutorial');
        this.lev1butt = this.game.add.sprite(this.game.width / 2, 300, 'level1');
        this.lev2butt = this.game.add.sprite(this.game.width / 2, 350, 'level2');
        this.lev3butt = this.game.add.sprite(this.game.width / 2, 400, 'level3');
        this.lev4butt = this.game.add.sprite(this.game.width / 2, 450, 'level4');
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
		startClickEvent: function () {
        this.game.state.start('Game');
		},
};