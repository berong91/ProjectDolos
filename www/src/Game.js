var TMT = TMT || {};

var xloc;
var yloc;

var blocks = [];
var vehicles = [];

//Time Elapsed variables
var count;
var text;

//emitter for the explosion for vehicle collisions
var emitter;

//title screen
TMT.Game = function () {};

TMT.Game.prototype = {
    create: function () {

		//Sets the dimensions of the game to the dimensions of the 
		//"canvas" which is your entire game window.
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);

        //set grid init position
        xloc = ((this.game.world.width / 2) - 150);
        yloc = (this.game.world.height / 2) - (0.0625 * this.game.world.height);

        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'gamebg');

        // Generate all the blocks
        this.generateBlocks();
		
		//adding the loading bar sprite
		this.progbar = this.game.add.sprite(this.game.world.width/2 - 200, this.game.height * 0.85, 'progress');
		
		//attempt at making vehicles group
		this.vehicles = this.game.add.group();
		this.vehicles.enableBody = true;
        this.generatePlane();
		this.generateBoat();
		this.generateTrain();
		
		//This will create text in the top left of the game screen.
		text = this.game.add.text(50, 50, 'Time remaining: 60 seconds' , { fontSize: '32px', fill: '#FFF' });

        //timer function-starts at 60, decrements one every 1000 ms
        count=60;
        var counter= setInterval(timer, 1000); 
        
		/*
			This will run a timer that will update the text in the top 
			left of the game screen to reflect the time left in the 
			timer. (Inside of create function)
		*/
		function timer(){
        	count--;
        	text.text = 'Time remaining: ' + count + ' seconds';
        	if(count<=0){
            	text.text = 'Time\'s up!';
        	}
		}
		
		//Allows the game to access the explosion animation.
        emitter = this.game.add.emitter(0,0,10);
        emitter.makeParticles('fire');
        emitter.gravity = 200;
		
	

    },
    /*
		Create a plane. For now, only creates one plane as referenced 
		by this.plane
	*/
    generatePlane: function () {
        //Display setting for the plane.
        this.plane = this.vehicles.create(xloc - 500, blocks[0].y + 100, 'plane1', 2);
        this.plane.scale.setTo(1);
        this.plane.frame = 0;
        
		this.plane.life = 3;
		this.plane.dead = false;
		
		//add physics to the new plane.
        this.game.physics.arcade.enable(this.plane);
        this.plane.body.overlapWorldBounds = true;
	},
    /*
		Create a boat. For now, only creates one boat as referenced by
		this.boat
	*/
    generateBoat: function () {	
        //Display settings for the boat.
        this.boat = this.vehicles.create(xloc - 500, blocks[0].y, 'boat1', 2);
        this.boat.scale.setTo(1);
        this.boat.frame = 0;

		this.boat.life = 3;
		this.boat.dead = false;
		
        //add physics to the new boat.
        this.game.physics.arcade.enable(this.boat);
        this.boat.body.overlapWorldBounds = true;
    },
    /*
		Create train. For now, only creates one train as referenced by
		this.train
	*/
    generateTrain: function () {
		//Display settings for the train.
        this.train = this.vehicles.create(xloc - 500, blocks[0].y + 200, 'train1', 2);
        this.train.scale.setTo(1);
        this.train.frame = 0;

		this.train.life = 3;
		this.train.dead = false;
		
        //Add physics to the new train.
        this.game.physics.arcade.enable(this.train);
        this.train.body.overlapWorldBounds = true;
    },

    // Generate all blocks
    generateBlocks: function () {
        this.blocks = this.game.add.group();

        //enable physics in them
        this.blocks.enableBody = true;

        //phaser's random number generator
        var numBlocks = 9;
        var current;

        for (var i = 0; i < numBlocks; i++) {
            //add sprite
            current = this.blocks.create(xloc, yloc, 'terrain');


            xloc += 100;
            if (xloc === ((this.game.world.width / 2) + 150)) {
                xloc = ((this.game.world.width / 2) - 150);
                yloc += 100;
            }

            current.scale.setTo(1);

            //physics properties
            current.body.velocity.x = 0;
            current.body.velocity.y = 0;
            current.body.immovable = true;
            current.body.collideWorldBounds = true;

            //THIS IS WHERE YOU ENABLE MOUSE CLICKS!!!!
            current.inputEnabled = true;
            current.events.onInputDown.add(this.onDown, this);
            blocks[i] = current;

            //Initializes blank map
            blocks[i].frame = 3;
        }
        current = blocks[0];
    },
    
	/*
		Update function that will handle:
		1)time progress bar [will be put into separate function later]
		2)vehicle unmodified speed
		3)vehicle life points (no vehicle currently has its own "life"
		4)vehicle overlap with tiles
	*/
	update: function() {
    	//method that will be later refined to show progress better.
		this.progressBar();
		
		//Check to see if any vehicles have died recently
		this.lifeCheck(this.plane);
		this.lifeCheck(this.boat);
		this.lifeCheck(this.train);
		
		//Sounds must be called inside of this function either directly or with another function entirely (except create and preload)
		
		this.plane.body.velocity.x = 120;
		this.boat.body.velocity.x = 80;
		this.train.body.velocity.x = 100;
		this.game.physics.arcade.overlap(this.vehicles, this.blocks, this.playSound, this.checkTile, this);
		
    },
    /*
		Checks the life of all the vehicles to see whether or not they
		have recently died. Called by the update method.
	*/
	lifeCheck: function(vehicle) {
		//Life logic function
		if (vehicle.life <= 0) {
            if(!vehicle.dead)
                this.explosion(vehicle);
            vehicle.dead = true;
			vehicle.kill();
        }
	},
	
	/*
		Updates the progress bar that will represent the time remaining
		until the player wins the level.
	*/
    progressBar: function() {
		switch(count) {
			case 60: this.progbar.frame = 10;
			break;
			case 54: this.progbar.frame = 9;
			break;
			case 48: this.progbar.frame = 8;
			break;
			case 42: this.progbar.frame = 7;
			break;
			case 36: this.progbar.frame = 6;
			break;
			case 30: this.progbar.frame = 5;
			break;
			case 24: this.progbar.frame = 4;
			break;
			case 18: this.progbar.frame = 3;
			break;
			case 12: this.progbar.frame = 2;
			break;
			case 6: this.progbar.frame = 1;
			break;
			case 0: this.progbar.frame = this.plane.kill();
			break;
		}
	},
	
	/*
		This function is called by the game physics overlap.
        Takes a vehicle and a tile. Check to see if the vehicle matches 
		the correct tile.
	*/
    checkTile: function (vehicle, tile) {
        if (vehicle.key === 'boat1'){
			if (tile.frame === 0) //boat travels over water
				return false;
			else
				return true;
		}
		else if (vehicle.key === 'plane1'){
			if (tile.frame === 1) //plane travels over air
				return false;
			else 
				return true;
		}
		else if (vehicle.key === 'train1'){
			if (tile.frame === 2) //train travels over train tracks
				return false;
			else 
				return true;
		}
	},
    /*
		This function allows the tiles to cycle between our 
		spritesheet.
    */
	onDown: function (sprite, pointer) {
        switchSound.play();
        if (sprite.frame < 2)
            sprite.frame++;
        else
            sprite.frame = 0;
    },
    
	/*
		This function will always be called whenever ANY vehicle hits
		the wrong tile. Can be used for checking all of the vehicles
		lives?
	*/
    playSound: function (vehicle, tile) {
        explosionSound.play();
		vehicle.body.velocity.x = -1000;

		vehicle.life--;
    },
    /*
		Explosion graphic that will happen to whichever vehicle that
		reaches 0 life. Takes a vehicle as its parameter.
	*/
    explosion: function (vehicle) {
        emitter.x = vehicle.body.x;
        emitter.y = vehicle.body.y;

        //1) boolean for 'explode' (particles generate all at once)
        //2) particle lifespan (ms)
        //3) ignore
        //4) number of particles
        emitter.start(true, 1500, null, 8);
    },
    
};
