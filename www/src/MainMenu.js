var TMT = TMT || {};

//title screen
TMT.MainMenu = function () {};

TMT.MainMenu.prototype = {
    preload: function () {

    },
    create: function () {
        // Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'gamebg');
        this.background.autoScroll(-20, 0);

        // Add logo image
        this.logo = this.game.add.sprite(this.game.width / 2, 155, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);

        // Add start button
        this.startButton = this.game.add.button(this.game.width / 2, 400, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5, 0.8);

    },
    update: function () {
        if (!!this.ready) {
            this.game.state.start('MainMenu');
        }
    },
    startClick: function () {
        this.game.state.start('Game');
    },
    render: function () {
        this.game.debug.text("Time until event: " + this.game.time.events.duration, 32, 32);
    }
};