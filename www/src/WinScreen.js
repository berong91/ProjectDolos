var TMT = TMT || {};

//title screen
TMT.WinScreen = function () {};

TMT.WinScreen.prototype = {
    preload: function () {
		
    },
    create: function () {
        var y = this.game.height/8;
		// Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');
        //this.background.autoScroll(-5, 0);
        
        // Add logo image
        this.logo = this.game.add.sprite(this.game.width /2, y*1.5, 'gameend');
        this.logo.scale.setTo(0.7);
		
        this.logo.anchor.setTo(0.5, 0.5);    
    },
    update: function () {
        
    },
    startClickEvent: function () {
        this.game.state.start('MainMenu');
    },
};