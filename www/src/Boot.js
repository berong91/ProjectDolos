var TMT = TMT || {};

// Global variables for game music
var bgSound;
var level;
var explosionSound;
var switchSound;
var initialized = false;

TMT.Boot = function () {};

//setting game configuration and loading the asset for the loading screen
TMT.Boot.prototype = {
    preload: function () {
        //asset we'll use in the loading screen
        this.load.image('background', 'asset/images/background.png');
        this.load.audio('switch', 'asset/audio/switch.wav');
        this.load.audio('explosion', 'asset/audio/explosion.ogg');
        this.load.audio('bgsound', 'asset/audio/flea.mp3');
    },
    create: function () {
        
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#000';
        
/*        //device options
        if (!initialized) {
            if (!this.game.device.desktop) {
                mobile = true;
                this.game.stage.fullScreenScaleMode = Phaser.StageScaleMode.EXACT_FIT;
                this.game.stage.scale.startFullScreen();
            }
        initialized = true;
        }*/

        //scaling options   
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;     
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 960;
        this.scale.maxHeight = 1600;

        //set scale of the game
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //show loading screen
        this.background = this.game.add.sprite(this.game.world.centerX, 280, 'background');
        this.background.anchor.setTo(0.5);
        this.background.alpha = 0;
        
        // Add dissappear event for loading screen
        this.game.add.tween(this.background).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.finish, this);
        
        // Load all music
        bgSound = this.add.audio('bgsound');
        explosionSound = this.game.add.audio('explosion');
        switchSound = this.game.add.audio('switch');
        this.sound.setDecodedCallback([bgSound, explosionSound, switchSound], this.startBgMusic, this);
        this.finish();
        //this.game.time.events.add(Phaser.Timer.SECOND * 5, this.finish, this);
    },
    // This method will be load when all music are loaded
    startBgMusic: function(){
        bgSound.loopFull(0.6);
    },
    // When finish, go to Preload state
    finish: function() {
        this.state.start('Preload');
    }
};