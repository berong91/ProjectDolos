var TMT = TMT || {};
var xloc = 50;
var yloc = 0;
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

//title screen
TMT.Game = function () {};

TMT.Game.prototype = {
    create: function () {
        //set world dimensions
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);

        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        this.generateAsteriods();
        
		//sprites
		//Test for moving a sprite left to right.
		
		
		//plane is the object that is moving.
		this.plane = this.game.add.sprite(this.game.world.centerX/10, this.game.world.centerY/2, 'diamond');
		this.plane.scale.setTo(3);
		
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
			
			/* on-click event
			//THIS IS WHERE YOU ENABLE MOUSE CLICKS!!!!
			asteriod.inputEnabled = true;
            
			//meant for giving rowXcolY variables some values
			//have to hardcode for each rowXcolY... tedious but works
			//!!!CANNOT USE ARRAYS FOR SOME STUPID REASON!!!!
			switch(i) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
				
					//ROW1COL2 POINTS TO THE CURRENT ASTEROID
					row1col2 = asteriod;
					
					//VISIBLE TILE CHANGE FOR EASY VIEWING
					row1col2.frame = 2;
					
					//adds on-click event to a sprite	
//**SPRITE.events.onInputDown.add(this.CLICKFUNCTION, this)**
					row1col2.events.onInputDown.add(this.onDown, this);
					
					break;
				default:
					break;
			}*/
			
        }
    },
    update: function() {
    	//Sounds must be called inside of this function either directly or with another function entirely (except create and preload)
		
		/* movement
		this.plane.body.velocity.x = 0;
		this.game.physics.arcade.collide(this.plane, row1col2, this.playSound, null, this);
		*/
		
    },
		/* on-click event
	onDown: function(sprite, pointer) {
		this.explosionSound.play();
	},
		*/
	playSound: function() {
		this.explosionSound.play();
	},
};

