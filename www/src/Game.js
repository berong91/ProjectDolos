var TMT = TMT || {};
var pause2;
var lol;
//Grid variables 
var xloc;
var yloc;
var rows;
var cols;

var rules;

//vehicle speed
var trainSpeed;
var planeSpeed;
var boatSpeed;

var blocks = [];
var vehicles = [];
var glows = [];
var v = 0;

//Time Elapsed variables
var counter;
var count;
var MAXTIME;
var text;
var countStart;

var pauseclickevent = false;

//timer is kill or no
var stoptime = false;

//Score text
var scoreText;

//emitter for the explosion for vehicle collisions
var emitter;

//Scale for the entire game
var theScale;

var counter;

//number of times vehicles have been kill
var death = 0;

//title screen
TMT.Game = function() {};

TMT.Game.prototype = {
    create: function() {
        
        //Game level modifier.
        this.adjustLevel(level);
        
        //background
        this.background = this.game.add.tileSprite(0, 0, 480, 800, 'peaks');
        //this.background.autoScroll(-2, 0);
        
        // Generate all the blocks
        this.generateBlocks();
        
        this.spawnVehicles(level);
        
        //adding the loading bar sprite
        this.progbar = this.game.add.sprite(this.game.world.width / 2, this.game.height * 0.85, 'progress');
        this.progbar.anchor.setTo(0.5, 0.5);
        this.progbar.scale.setTo((theScale * 3) / 400);
        
        //This will create text in the top left of the game screen.
        text = this.game.add.text(this.game.world.height * 0.05, this.game.world.height * 0.05, 'Time: ' + MAXTIME + '', {
            fontSize: this.game.world.width / 15 + 'px',
            fill: '#ffffff'
        });
        text.stroke = '#000000';
        text.strokeThickness = 6;
        
        count = MAXTIME;
        /*this.pauseButton = this.game.add.sprite(this.game.world.width * 0.9, this.game.world.height * 0.05, 'pauseUp');
            this.pauseButton.anchor.setTo(0.5, 0.5);
            this.pauseButton.inputEnabled = true;
        this.pauseButton.events.onInputDown.add(this.overlayrules, this); */
        
        
        // Add leader board button
        this.backButton = this.game.add.button(this.game.world.width * 0.9, this.game.world.height * 0.13, 'backUp', this.backClickEvent, this);
        this.backButton.anchor.setTo(0.5, 0.8);
        this.backButton.scale.set(0.3, 0.3);
        
        this.overlayrules();
        
        if (stoptime === false) {
            this.timing();
        }
        
        if (pauseclickevent === true) {
            console.log('in pause');
            this.game.input.onDown.add(this.pauseClickEvent, this);
        }
        //Allows the game to access the explosion animation.
        emitter = this.game.add.emitter(0, 0, 10);
        emitter.makeParticles('fire');
        emitter.gravity = 200;
        
        //code snippet to test the gameEnd UI
        //this.gameEnd();
    },
	//pulled out the timing function out of create and put it here
    timing: function() {
        counter = setInterval(timer, 1000);
        /*
			This will run a timer that will update the text in the top 
			left of the game screen to reflect the time left in the 
			timer. (Inside of create function)
        */
        
        function timer() {
            lol = 'timer ran';
            console.log(lol);
            count--;
            text.text = 'Time: ' + count;
            if (count <= 0) {
                text.text = 'Time\'s up!';
            }
        }
    },
    
    
    /*
        Clears all variables so levels can be restarted without a problem.
    */
    backClickEvent: function() {
        this.vehicles = null;
        this.background = null;
        this.blocks = null;
        this.progbar = null;
        vehicles = [];
        v = 0;
        text = null;
        count = null;
        clearInterval(counter);
        counter = null;
        level = -99;
        this.game.state.start('MainMenu');
    },
    spawnGlows: function() {
		
    },
	
	/*
    	Spawn vehicle events that is adjusted by the level selected.
    */
    spawnVehicles: function(level) {
        
        //attempt at making vehicles group
        this.vehicles = this.game.add.group();
        this.vehicles.enableBody = true;
        if (level === 0) {
            console.log(vehicles.length);
			this.generateVehicle(xloc - 100, yloc, 0, 'boat1');
			console.log(vehicles.length);
            } else if (level === 1) {
            this.generateVehicle(xloc - 100, yloc, 0, 'boat1');
            this.generateVehicle(xloc + (theScale * 2) + 100, yloc + (theScale * 2), 2, 'train1');
            this.generateVehicle(xloc - 100, yloc + theScale, 0, 'plane1');
            } else if (level === 2) {
            this.generateVehicle(xloc - 100, yloc, 0, 'boat1');
            this.generateVehicle(xloc + (theScale * 2) + 100, yloc + (theScale * 2), 2, 'train1');
            this.generateVehicle(xloc - 100, yloc + theScale, 0, 'plane1');
            for (var i = 0; i < vehicles.length; i++) {
                this.vehicleWait(vehicles[i], i * 5);
            }
        }
    },
    /*
    	"Kills" the vehicle and gives it a time when to appear.
    */
    vehicleWait: function(vehicle, wait) {
        vehicle.releaseTime = MAXTIME - wait;
        vehicle.kill();
    },
    /*
    	Checks the timer on when a vehicle should revive.
    */
    vehicleRelease: function(vehicle) {
        if (count <= vehicle.releaseTime)
        vehicle.revive();
    },
    /*
        This will allow the game to dynamically adjust its grid 
        according to level. Level initially starts off at -1 but will 
        be changed according to the level select. All level adjustments 
        will be made here!
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
            planeSpeed = this.game.width / 10;
            boatSpeed = this.game.width / 15;
            trainSpeed = this.game.width / 12;
            
            //set grid init position and grid elements
            xloc = this.game.world.width / 2 - (theScale * 1.5);
            yloc = this.game.world.height / 3;
            rows = cols = 3;
        }
        if (level === 0) {
            
            //adjust variables here
            MAXTIME = 10;
            theScale = 70;
            rows = 1;
            cols = 1;
            
            //vehicle speed
            planeSpeed = theScale * 1.1;
            boatSpeed = theScale * 0.75;
            trainSpeed = theScale * 0.9;
            
            //set grid init position
            xloc = this.game.world.width / 2 - (theScale * (cols / 2));
            yloc = this.game.world.height / 2 - (theScale * (rows / 2));
        }
        if (level === 1) {
            MAXTIME = 20;
            theScale = 75;
            
            //vehicle speed
            planeSpeed = this.game.width / 10;
            boatSpeed = this.game.width / 15;
            trainSpeed = this.game.width / 12;
            
            //set grid init position and grid elements
            xloc = this.game.world.width / 2 - (theScale * 1.5);
            yloc = this.game.world.height / 3;
            rows = cols = 3;
        }
        
        if (level === 2) {
            MAXTIME = 30;
            theScale = 75;
            
            //vehicle speed
            planeSpeed = this.game.width / 10;
            boatSpeed = this.game.width / 15;
            trainSpeed = this.game.width / 12;
            
            //set grid init position and grid elements
            xloc = this.game.world.width / 2 - (theScale * 1.5);
            yloc = this.game.world.height / 3;
            rows = cols = 3;
            
        }
        
    },
    generateVehicle: function(x, y, frame, type) {
        //Display setting for the plane.
        vehicles[v] = this.vehicles.create(x, y, type, frame);
        vehicles[v].scale.setTo(theScale / 100);
        
        vehicles[v].life = 3;
        vehicles[v].dead = false;
        vehicles[v].moving = true;
        vehicles[v].isHit = false;
        
        //add physics to the new plane.
        this.game.physics.arcade.enable(vehicles[v]);
        vehicles[v].body.overlapWorldBounds = true;
        vehicles[v].body.width = vehicles[v].body.width / 2;
        vehicles[v].body.height = vehicles[v].body.height / 2;
        v++;
    },
    
    enableMoving: function(vehicle) {
        vehicle.moving = true;
    },
    
    // Generate all blocks
    generateBlocks: function() {
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
    },
	//function to stop timer clearly ... Jesus
    stopTimer: function() {
        clearInterval(counter);
    },
	//do I need to explain myself?
    startTimer: function() {
        stoptime = false;
        this.timing();
    },
	//used as an event function for when the user wants to dispose of the rules overlay image
    overlayclickevent: function() {
        console.log("overlayclickevent");
		rules.kill();
		if(this.game.paused === true){
			this.pause();
			this.startTimer();
        }
    },
	//main function for overlaying rules on screen before the game starts
	//simply shows rules to user if level is 0 or in other words tutorial
    overlayrules: function() {
        if (level === 0) {
            stoptime = true;
            this.gamepause();
            rules = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'rules');
            rules.anchor.setTo(0.5, 0.5);
            rules.inputEnabled = true;
			this.game.input.onDown.add(this.overlayclickevent, this);
        }
    },
	//you are a big boy you know whats up
    gamepause: function() {
        this.pause();
        this.stopTimer();
    },
	//the name
    pause: function() {
        lol = 'in pause';
		console.log(lol);
        if (this.game.paused === false) {
            lol = 'game paused';
            this.game.paused = true;
			console.log(lol);
            return true;
        }
        if (this.game.paused === true) {
            lol = 'game unpaused';
            this.game.paused = false;
			console.log(lol);
            return false;
        }
        return null;
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
        //checks if the time is 0
        this.TimeCheck();
        //Overlap that allows all members of vehicles to interact with 
        //tiles.
        this.game.physics.arcade.overlap(this.vehicles, this.blocks, this.playSound, this.checkTile, this);
		
        // Check if there are alive vehicles
		if(vehicles.length > 0){
            // Special condition for lv 0
            if (level === 0){
                if(blocks[0].frame === 0) {
                    vehicles[0].body.velocity.x = boatSpeed;
                    } else if(blocks[0].frame !== 0) {
                    vehicles[0].body.velocity.x = 0;
                }
            } else {    
                //Checks whether or not the vehicle has been "allowed to move."
                for (var i = 0; i < vehicles.length; i++) {
                    this.vehicleRelease(vehicles[i]);
                    if (vehicles[i].moving) {
                        if (vehicles[i].key === 'plane1') {
                            vehicles[i].body.velocity.x = planeSpeed;
                            } else if (vehicles[i].key === 'boat1') {
                            vehicles[i].body.velocity.x = boatSpeed;
                            } else if (vehicles[i].key === 'train1') {
                            vehicles[i].body.velocity.x = -1 * trainSpeed;
                        }
                    } else
                    this.Hit(vehicles[i]);
                }
            }
        }
    },
    /*
        Checks the life of all the vehicles to see whether or not they
        have recently died. Called by the update method.
    */
    lifeCheck: function(vehicle) {
        //Life logic function
        if (vehicle.life <= 0) {
            if (!vehicle.dead)
            this.explosion(vehicle);
            vehicle.dead = true;
            vehicle.kill();
            death++;
            return false;
        }
        return true;
    },
    
    /*
        Updates the progress bar that will represent the time remaining
        until the player wins the level.
    */
    progressBar: function() {
        var percent = Math.floor(count / MAXTIME * 100);
        switch (percent) {
            case 100:
            this.progbar.frame = 10;
            break;
            case 90:
            this.progbar.frame = 9;
            break;
            case 80:
            this.progbar.frame = 8;
            break;
            case 70:
            this.progbar.frame = 7;
            break;
            case 60:
            this.progbar.frame = 6;
            break;
            case 50:
            this.progbar.frame = 5;
            break;
            case 40:
            this.progbar.frame = 4;
            break;
            case 30:
            this.progbar.frame = 3;
            break;
            case 20:
            this.progbar.frame = 2;
            break;
            case 10:
            this.progbar.frame = 1;
            break;
            case 0:
            this.progbar.frame = 0;
            break;
        }
    },
    
    TimeCheck: function() {
        if (count === 0) {
            this.vehicles = null;
            this.background = null;
            this.blocks = null;
            this.progbar = null;
            text = null;
            count = null;
            clearInterval(counter);
            counter = null;
            var sum = 0;
            for (var i = 0; i < vehicles.length; i++)
            sum += (vehicles[i].life * 100);
            postScore = sum;
            vehicles = [];
            v = 0;
            if (death === 0){
                this.game.state.start('WinScreen');
                }else{
                this.game.state.start('LoseScreen');
            }
        }
    },
    
    /*
        This function is called by the game physics overlap.
        Takes a vehicle and a tile. Check to see if the vehicle matches 
        the correct tile.
    */
    checkTile: function(vehicle, tile) {
        if (vehicle.key === 'boat1') {
            if (tile.frame === 0) //boat travels over water
            return false;
            else
            return true;
            } else if (vehicle.key === 'plane1') {
            if (tile.frame === 1) //plane travels over air
            return false;
            else
            return true;
            } else if (vehicle.key === 'train1') {
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
    onDown: function(tile, pointer) {
        
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
    playSound: function(vehicle, tile) {
        //right, down, left, up
        if (!vehicle.isHit) {
            explosionSound.play();
            vehicle.life--;
            vehicle.thecountDown = count;
            vehicle.moving = false;
            vehicle.holdx = vehicle.body.velocity.x;
            vehicle.holdy = vehicle.body.velocity.y;
            vehicle.body.velocity.y = 0;
            vehicle.body.velocity.x = 0;
            vehicle.isHit = true;
        }
        //Check to see if any vehicles have died recently.
        this.lifeCheck(vehicle);
        
    },
    /*
        Fixed hit.
    */
    Hit: function(vehicle) {
        if (count === (vehicle.thecountDown - 3)) {
            vehicle.isHit = false;
            vehicle.body.velocity.x = vehicle.holdx;
            vehicle.body.velocity.y = vehicle.holdy;
            vehicle.holdx = vehicle.holdy = 0;
            this.enableMoving(vehicle);
        }
    },
    /*
        Explosion graphic that will happen to whichever vehicle that
        reaches 0 life. Takes a vehicle as its parameter.
    */
    explosion: function(vehicle) {
        emitter.x = vehicle.body.x;
        emitter.y = vehicle.body.y;
        
        //1) boolean for 'explode' (particles generate all at once)
        //2) particle lifespan (ms)
        //3) ignore
        //4) number of particles
        emitter.start(true, 1500, null, 8);
    },
    /* Post the score to the website. */
    /*postScore: function () {
        $('#Name').val("Guest");
        $('#Score').val(count);
        $('#Level').val(level);
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
    },*/
    /* Get the score from the website. */
    /*getScore: function () {           
        $.ajax({
        url: "test.php",
        type: "GET",
        dataType: "json"
        success: function( data ) {
        console.log("Success");
        },
        });
    },*/
    
    gameEnd: function() {
        /* Examples for tomorrow to use.
            
            startClickEvent: function () {
            this.game.state.start('Game');
            },
            this.startButton = this.game.add.button(this.game.width / 2, 400, 'startButton', this.startClickEvent, this);
            
        */
        
        var menu = this.game.add.sprite(this.game.world.width / 2 - 150, this.game.height * 0.4, 'continueUp');
        var retry = this.game.add.sprite(this.game.world.width / 2 - 150, this.game.height * 0.4 + 105, 'backUp');
        var result = this.game.add.text(this.game.world.width / 2 - 150, yloc * 0.50, 'Result is PANTS', {
            fontSize: this.game.world.width / 10 + 'px',
            fill: '#F00'
        });
    }
    
};        