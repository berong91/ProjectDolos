var SpaceHipster = SpaceHipster || {};

//title screen
SpaceHipster.MainMenu = function () {};

SpaceHipster.MainMenu.prototype = {
    create: function () {
        //set world dimensions
        this.game.world.setBounds(0, 0, 300, 200);

        // Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
        this.background.autoScroll(-20, 0);

        // Add logo image
        this.logo = this.game.add.sprite(this.game.width /2 , 300, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);

        // Add start button
        this.startButton = this.game.add.button(this.game.width / 2, 700, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5, 0.8);

    },
    update: function () {
        if (!!this.ready) {
            this.game.state.start('MainMenu');
        }
    },
    startClick: function () {
        this.game.state.start('Game');
    }
};