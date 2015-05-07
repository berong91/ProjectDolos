var TMT = TMT || {};
var xloc = 90;
var yloc = 350;
var marker;
var currentTile = 0;

//These represent the positions of each tile (0 - 9)
//YOU CANNOT USE ARRAYS BECAUSE PHASER HATES ARRAYS
var row0col0;
var row0col1;
var row0col2;
var row1col0;
var row1col1;
var row1col2;
var row2col0;
var row2col1;
var row2col2;

var lifes;

//title screen
TMT.Game = function () {};

TMT.Game.prototype = {
    create: function () {
        //set world dimensions
        this.game.width = 480;
        this.game.height= 800;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        var yloc = (this.game.height/2) - 200

		//Sets the beginning lives to three.
		lifes = 3;
		
        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        this.generateAsteriods();
        
		//sprites
		
		//plane is the object that is moving.
		this.plane = this.game.add.sprite(0, 00, 'plane1');
		this.plane.scale.setTo(1);
		this.plane.frame = 2;
		
		//add physics to the sprites
		this.game.physics.arcade.enable(this.plane);
		this.plane.body.collideWorldBounds = true;
		
		
		//sounds ADD THE DIFFERENT TYPE OF SOUNDS HERE
		//refer to update function on how to use sounds
        this.explosionSound = this.game.add.audio('explosion');
    },

    generateAsteriods: function () {
		this.asteroids = this.game.add.group();
        
        //enable physics in them
        this.asteroids.enableBody = true;

        //phaser's random number generator
        var numAsteroids = 9;
        var asteriod;
        
		for (var i = 0; i < numAsteroids; i++) {
            //add sprite
            asteriod = this.asteroids.create(xloc, yloc, 'terrain');
            
            xloc += 100;
            if(xloc === 390) {
                xloc = 90;
                yloc += 100;    
            }
            
            asteriod.scale.setTo(1);
            
            //physics properties
            asteriod.body.velocity.x = 0;
            asteriod.body.velocity.y = 0;
            asteriod.body.immovable = true;
            asteriod.body.collideWorldBounds = true;
			
			//THIS IS WHERE YOU ENABLE MOUSE CLICKS!!!!
			asteriod.inputEnabled = true;
            
			//meant for giving rowXcolY variables some values
			//have to hardcode for each rowXcolY... tedious but works
			//!!!CANNOT USE ARRAYS FOR SOME STUPID REASON!!!!
			switch(i) {
				case 0:
					//ROW1COL2 POINTS TO THE CURRENT ASTEROID
					row0col0 = asteriod;
					
					//adds on-click event to a sprite	
					//**SPRITE.events.onInputDown.add(this.CLICKFUNCTION, this)**
					row0col0.events.onInputDown.add(this.onDown, this);
					break;
				case 1:
					row0col1 = asteriod;
					row0col1.events.onInputDown.add(this.onDown, this);
					break;
				case 2:
					row0col2 = asteriod;
					row0col2.events.onInputDown.add(this.onDown, this);
					break;
				case 3:
					row1col0 = asteriod;
					row1col0.events.onInputDown.add(this.onDown, this);
					break;
				case 4:
					row1col1 = asteriod;
					row1col1.events.onInputDown.add(this.onDown, this);
					break;
				case 5:
				
					
					row1col2 = asteriod;
					row1col2.events.onInputDown.add(this.onDown, this);
					//make the a tile more recognizable.
					row1col2.frame = 3;
					break;
				case 6:
					row2col0 = asteriod;
					row2col0.events.onInputDown.add(this.onDown, this);
					break;
				case 7:
					row2col1 = asteriod;
					row2col1.events.onInputDown.add(this.onDown, this);
					break;
				case 8:
					row2col2 = asteriod;
					row2col2.events.onInputDown.add(this.onDown, this);
					break;
				default:
					break;
			}
			
        }
    },
    update: function() {
    	//Sounds must be called inside of this function either directly or with another function entirely (except create and preload)
		
		this.plane.body.velocity.x = 100;
		this.game.physics.arcade.collide(this.plane, this.asteroids, this.playSound, this.checkTile, this);
	
		/* Life system, 3 hits and plane is kill.
		if (lifes <= 0)
			this.plane.kill();
		*/
    },
	
	//Checks to see if the tile matches the "air" tile that the plane wants to travel accross. tile.frame 1 is the air tile.
	checkTile: function(plane, tile) {
		if (tile.frame === 1)	
			return false;
		else
			return true;
	},
	
	//This function allows the tiles to cycle between our spritesheet.
	onDown: function(sprite, pointer) {
		this.explosionSound.play();
		if (sprite.frame < 2)
			sprite.frame++;
		else
			sprite.frame = 0;
	},
	
	//This takes no parameters, makes a sound.
	playSound: function() {
		this.explosionSound.play();
		this.plane.body.velocity.x = -5000;
		
		/*
		This is the life system. When a plane hits the bad tile. In the update function, if there is 0 or less lives, your plane dies. 
		*/
		//lifes--;
	},
};

