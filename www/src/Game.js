var TMT = TMT || {};

//Grid variables 
var xloc;
var yloc;
var rows;
var cols;

//vehicle speed
var trainSpeed;
var planeSpeed;
var boatSpeed;

var blocks = [];
var vehicles = [];

//Time Elapsed variables
var count;
var MAXTIME;
var text;

//Score text
var scoreText;

//emitter for the explosion for vehicle collisions
var emitter;

//Scale for the entire game
var theScale;

//title screen
TMT.Game = function () {};

TMT.Game.prototype = {

    
    create: function () {
        
        //Game level modifier.
        this.adjustLevel(level);

        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'peaks');
		this.background.autoScroll(-20, 0);

        // Generate all the blocks
        this.generateBlocks();
        
        //adding the loading bar sprite
        this.progbar = this.game.add.sprite(xloc, this.game.height * 0.85, 'progress');
        this.progbar.scale.setTo((theScale*3)/400);
        
        //attempt at making vehicles group
        this.vehicles = this.game.add.group();
        this.vehicles.enableBody = true;
        this.generatePlane();
        this.generateBoat();
        this.generateTrain();
        
        //This will create text in the top left of the game screen.
        text = this.game.add.text(xloc/2, yloc/4, 'Time: ' + MAXTIME + '' , { fontSize: this.game.world.width/15+ 'px', fill: '#ffffff' });
        text.stroke = '#000000';
        text.strokeThickness = 6;
        
        count = MAXTIME;
        var counter= setInterval(timer, 1000); 
        
		/*
			This will run a timer that will update the text in the top 
			left of the game screen to reflect the time left in the 
			timer. (Inside of create function)
		*/
		function timer(){
        	count--;
        	text.text = 'Time: ' + count;
        	if(count<=0){
            	text.text = 'Time\'s up!';
        	}
		}
		
		//Allows the game to access the explosion animation.
        emitter = this.game.add.emitter(0,0,10);
        emitter.makeParticles('fire');
        emitter.gravity = 200;
        
        //code snippet to test the gameEnd UI
        this.gameEnd();
    },
    /*
		This will allow the game to dynamically adjust it's grid 
		according to level. Level initially starts off at -1 but will 
		be changed according to the level select.
	*/
	adjustLevel: function(level) {
	
		//Sets the dimensions of the game to the dimensions of the 
		//"canvas" which is your entire game window.
		this.game.world.setBounds(0, 0, this.game.width, this.game.height);
		
		//level = -1;
		if (level === -1) {
			MAXTIME = 20;
			theScale = 75;
			
			//vehicle speed
			planeSpeed = this.game.width/10;
			boatSpeed = this.game.width/15;
			trainSpeed = this.game.width/12;
			
			//set grid init position and grid elements
			xloc = this.game.world.width/2 - (theScale * 1.5);
			yloc = this.game.world.height / 3;
			rows = cols = 3;
		}
		if (level === 0) {
			
			//adjust variables here
			MAXTIME = 30;
			theScale = 70;
			rows = 1;
			cols = 3;
			
			//vehicle speed
			planeSpeed = theScale * 1.1;
			boatSpeed = theScale * 0.75;
			trainSpeed = theScale * 0.9;
			
			//set grid init position
			xloc = this.game.world.width/2 - (theScale * (cols/2));
			yloc = this.game.world.height/2 - (theScale * (rows/2));
		}
		if (level === 1) {
			MAXTIME = 20;
			theScale = 75;
			
			//vehicle speed
			planeSpeed = this.game.width/10;
			boatSpeed = this.game.width/15;
			trainSpeed = this.game.width/12;
			
			//set grid init position and grid elements
			xloc = this.game.world.width/2 - (theScale * 1.5);
			yloc = this.game.world.height / 3;
			rows = cols = 3;
		}
	
	},
	/*
		Create a plane. For now, only creates one plane as referenced 
		by this.plane
	*/
    generatePlane: function () {
        //Display setting for the plane.
        this.plane = this.vehicles.create(xloc - 150, yloc + theScale, 'plane1', 2);
        this.plane.scale.setTo(theScale/100);
        this.plane.frame = 0;
        
        this.plane.life = 3;
        this.plane.dead = false;
        this.plane.moving = false;
        
        //add physics to the new plane.
        this.game.physics.arcade.enable(this.plane);
        this.plane.body.overlapWorldBounds = true;
        this.plane.body.width = this.plane.body.width / 2;
        this.plane.body.height = this.plane.body.height / 2;
    },
    /*
        Create a boat. For now, only creates one boat as referenced by
        this.boat
    */
    generateBoat: function () {    
        //Display settings for the boat.
        this.boat = this.vehicles.create(xloc - 100, yloc, 'boat1', 2);
        this.boat.scale.setTo(theScale/100);
        this.boat.frame = 0;

        this.boat.life = 3;
        this.boat.dead = false;
        this.boat.moving = false;
        
        //add physics to the new boat.
        this.game.physics.arcade.enable(this.boat);
        this.boat.body.overlapWorldBounds = true;
        this.boat.body.width = this.boat.body.width / 2;
        this.boat.body.height = this.boat.body.height / 2;
    },
    /*
        Create train. For now, only creates one train as referenced by
        this.train
    */
    generateTrain: function () {
        //Display settings for the train.
        this.train = this.vehicles.create(xloc - 150, yloc + (theScale*2), 'train1', 2);
        this.train.scale.setTo(theScale/100);
        this.train.frame = 0;

        this.train.life = 3;
        this.train.dead = false;
        this.train.moving = false;
        
        //Add physics to the new train.
        this.game.physics.arcade.enable(this.train);
        this.train.body.overlapWorldBounds = true;
        this.train.body.width = this.train.body.width / 2;
        this.train.body.height = this.train.body.height / 2;
    },

    enableMoving: function(vehicle) {
        vehicle.moving = true;    
    },
    
    // Generate all blocks
    generateBlocks: function () {
        this.blocks = this.game.add.group();

        //enable physics in them
        this.blocks.enableBody = true;

        //phaser's random number generator
        var numBlocks = cols * rows;
        var current;

        var col = 1;
        var x = xloc;
        var y = yloc;
        for (var i = 0; i < numBlocks; i++) {
            //add sprite
            current = this.blocks.create(x, y, 'terrain');

            //x location of next tile is the next scaled tile.
            x += theScale;
            
            //If the number of current columns match the desired amount 
            //of columns, switch the x back and move the y position. 
            if (col++ === cols) {
                x = xloc;
                y += theScale;
                col = 1;
            }

            //Change the scale of the tile from 100px.
            current.scale.setTo(theScale / 100);

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
        1)time progress bar 
        2)vehicle unmodified speed
        3)vehicle life points will be check within the overlap function
        4)vehicle overlap with tiles
    */
    update: function() {
        //method that will be later refined to show progress better.
        this.progressBar();
        
        //Sounds must be called inside of this function either directly
        //or with another function entirely (except create and preload)
        
        //Checks whether or not the vehicle has been "allowed to move."
        if(this.plane.moving)
            this.plane.body.velocity.x = planeSpeed;
        if(this.boat.moving)
            this.boat.body.velocity.x = boatSpeed;
        if(this.train.moving)
            this.train.body.velocity.x = trainSpeed;
        
        //Overlap that allows all members of vehicles to interact with 
        //tiles.
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
        var percent = Math.floor(count / MAXTIME * 100);
        switch(percent) {
            case 100: this.progbar.frame = 10;
            break;
            case 90: this.progbar.frame = 9;
            break;
            case 80: this.progbar.frame = 8;
            break;
            case 70: this.progbar.frame = 7;
            break;
            case 60: this.progbar.frame = 6;
            break;
            case 50: this.progbar.frame = 5;
            break;
            case 40: this.progbar.frame = 4;
            break;
            case 30: this.progbar.frame = 3;
            break;
            case 20: this.progbar.frame = 2;
            break;
            case 10: this.progbar.frame = 1;
            break;
            case 0: this.progbar.frame = 0;
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
    onDown: function (tile, pointer) {
        if (!this.train.moving){
            setTimeout(this.enableMoving(this.train), 300000000);
            setTimeout(this.enableMoving(this.plane), 300000);
            setTimeout(this.enableMoving(this.boat), 23400);
        }
        switchSound.play();
        if (tile.frame < 2)
            tile.frame++;
        else
            tile.frame = 0;
    },
    
    /*
        This function will always be called whenever ANY vehicle hits
        the wrong tile. Will check to see if the vehicle has died.
    */
    playSound: function (vehicle, tile) {
        //right, down, left, up
        explosionSound.play();
        switch(vehicle.frame){
            case 0: //vehicle is going right
                vehicle.body.x = vehicle.body.x - 100;
                break;
            case 1: //vehicle is going down
                vehicle.body.y = vehicle.body.y - 100;
                break;
            case 2: //vehicle is going left
                vehicle.body.x = vehicle.body.x + 100;
                break;
            case 3: //vehicle is going up
                vehicle.body.y = vehicle.body.x + 100;
                break;
        }
        vehicle.life--;
        
        //Check to see if any vehicles have died recently.
        this.lifeCheck(vehicle);
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
    
	postScore: function () {
        $('#Name').val("Guest");
        $('#Score').val(count);
        $("#actionForm").serialize();
        
        $("form").on("submit", function (e) {
            e.preventDefault();            
            $.ajax({
                url: "sql.php",
                type: "POST",
                data: $("#actionForm").serialize(),
                success: function( data ) {
                    console.log("Success");
                },
            });
        });   
        $("form").submit();
        return false;
    },
	gameEnd: function() {
		/* Examples for tomorrow to use.
		
		startClickEvent: function () {
        	this.game.state.start('Game');
    	},
			this.startButton = this.game.add.button(this.game.width / 2, 400, 'startButton', this.startClickEvent, this);
		
		*/
		
		var menu = this.game.add.sprite(this.game.world.width /2 - 150, this.game.height * 0.4, 'continueUp');
		var retry = this.game.add.sprite(this.game.world.width /2 - 150, this.game.height * 0.4+105, 'backUp');
		var result = this.game.add.text(this.game.world.width /2 - 150, yloc*0.50, 'Result is PANTS' , { fontSize: this.game.world.width/10+ 'px', fill: '#F00' });
	}
	
};
