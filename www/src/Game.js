var SpaceHipster = SpaceHipster || {};
var xloc = 50;
var yloc = 0;
var marker;
var currentTile = 0;

//title screen
SpaceHipster.Game = function () {};

SpaceHipster.Game.prototype = {
    create: function () {
        //set world dimensions
        this.game.world.setBounds(0, 0, 600, 600);

        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        this.generateAsteriods();
        
		//sounds ADD THE DIFFERENT TYPE OF SOUNDS HERE
		//refer to update function on how to use sounds
        this.explosionSound = this.game.add.audio('explosion');
    },

    generateAsteriods: function () {
        this.asteroids = this.game.add.group();
        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 160, 160);
        
        //enable physics in them
        this.asteroids.enableBody = true;

        //phaser's random number generator
        var numAsteroids = 9;
        var asteriod;

        for (var i = 0; i < numAsteroids; i++) {
            //add sprite
            asteriod = this.asteroids.create(xloc, yloc, 'pepe');
            
            xloc += 160;
            if(xloc === 530){
                xloc = 50;
                yloc += 160;    
            }
            
            asteriod.scale.setTo(1);
            
            //physics properties
            asteriod.body.velocity.x = 0;
            asteriod.body.velocity.y = 0;
            asteriod.body.immovable = true;
            asteriod.body.collideWorldBounds = true;
            
        }
    },
    update: function() {
    	//Sounds must be called inside of this function either directly or with another function entirely (except create and preload)
		//this.playSound();
    }
	
	/*playSound: function() {
		//this.explosionSound.play()
	}*/
};

