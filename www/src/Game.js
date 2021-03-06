var TMT = TMT || {};
var pause2;
var lol;
//Grid variables 
var xloc;
var yloc;
var rows;
var cols;

var rules;
var scoreSum = 0;
var rules2;
var evthap = 0;

//used for NOHANDS achievement
var tileClicks = 0;

//vehicle speed
var trainSpeed;
var planeSpeed;
var boatSpeed;

var blocks = [];
var vehicles = [];
var glows = [];
var glowEvents = [];
var incoming = [];
var lastSpawn = [];
var g = 0;
var v = 0;
var i = 0;

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
TMT.Game = function () {};

TMT.Game.prototype = {
	create: function () {
		console.log(NOHANDS);
		//Game level modifier.
		this.adjustLevel(level);

		//background
		this.background = this.game.add.tileSprite(0, 0, 480, 800, 'peaks');
		//this.background.autoScroll(-2, 0);

		this.foreground = this.game.add.tileSprite(0, 0, 480, 800, 'foreground');

		// Generate all the blocks
		this.generateBlocks();

		this.generateGlows();

		this.generateIncomingVehicles();

		this.spawnVehicles(level);

		this.createBorders();

		//adding the loading bar sprite
		this.progbar = this.game.add.sprite(this.game.world.width / 2, this.game.height * 0.9, 'progress');
		this.progbar.anchor.setTo(0.5, 0.5);
		this.progbar.scale.setTo((theScale * 3) / 400);

		//This will create text in the top left of the game screen.
		text = this.game.add.text(this.game.world.width * 0.05, this.game.world.height * 0.05, 'Time: ' + MAXTIME + '', {
			fontSize: this.game.world.width / 15 + 'px',
			fill: '#ffffff'
		});
		text.stroke = '#000000';
		text.strokeThickness = 6;

		scoreText = this.game.add.text(this.game.world.width * 0.05, this.game.world.height * 0.1, 'Score: ' + scoreSum + '', {
			fontSize: this.game.world.width / 15 + 'px',
			fill: '#ffffff'
		});
		scoreText.stroke = '#000000';
		scoreText.strokeThickness = 6;

		count = MAXTIME;
		/*this.pauseButton = this.game.add.sprite(this.game.world.width * 0.9, this.game.world.height * 0.05, 'pauseUp');
		    this.pauseButton.anchor.setTo(0.5, 0.5);
		    this.pauseButton.inputEnabled = true;
		this.pauseButton.events.onInputDown.add(this.overlayrules, this); */

		// Add leader board button
		this.backButton = this.game.add.button(this.game.world.width * 0.9, this.game.world.height * 0.05, 'backUp', this.backClickEvent, this);
		this.backButton.events.onInputDown.add(this.touchDown, this);
		this.backButton.anchor.setTo(0.5, 0.5);
		this.backButton.scale.set(0.3, 0.3);

		this.overlayrules();

		if (stoptime === false) {
			this.timing();
		}

		if (pauseclickevent === true) {
			this.game.input.onDown.add(this.pauseClickEvent, this);
		}
		//Allows the game to access the explosion animation.
		emitter = this.game.add.emitter(0, 0, 10);
		emitter.makeParticles('fire');
		emitter.gravity = 200;

	},
	//pulled out the timing function out of create and put it here
	timing: function () {
		counter = setInterval(timer, 1000);
		/*
			This will run a timer that will update the text in the top 
			left of the game screen to reflect the time left in the 
			timer. (Inside of create function)
        */
		function timer() {
			count--;
			text.text = 'Time: ' + count;
			if (count <= 0) {
				text.text = 'Time\'s up!';
			}
		}
	},
	/*
		Creates the borders where the vehicles will be destroyed
		upon collision.
	*/
	createBorders: function () {
		this.borders = this.game.add.group();
		//enable physics in them
		this.borders.enableBody = true;
		var borders = [];

		borders[0] = this.borders.create(this.game.world.width / 2 - 300, this.game.world.height / 2 - 240, 'vborder');
		borders[1] = this.borders.create(this.game.world.width / 2 + 300, this.game.world.height / 2 - 240, 'vborder');
		borders[2] = this.borders.create(0, this.game.world.height / 2 - 300, 'hborder');
		borders[3] = this.borders.create(0, this.game.world.height / 2 + 300, 'hborder');

		for (var q = 0; q < borders.length; q++) {
			borders[q].body.immovable = true;
			borders[q].body.collideWorldBounds = true;
			borders[q].alpha = 0;
		}
	},

	/*
	    Clears all variables so levels can be restarted without a problem.
	*/
	backClickEvent: function () {
		this.vehicles = null;
		this.background = null;
		this.blocks = null;
		this.progbar = null;
		evthap = 0;
		vehicles = [];
		v = 0;
		text = null;
		count = null;
		clearInterval(counter);
		counter = null;
		level = -99;
		glows = [];
		g = 0;
		glowEvents = [];
		incoming = [];
		i = 0;
		death = 0;
		UNHARMED = false;
		VEHICULARDESTRUCTION = false;
		NOHANDS = false;
		scoreSum = 0;
		scoreText = null;
		this.game.state.start('MainMenu');
	},

	/*
		Sets up all the incoming vehicles in the top-right of the screen.
		They will not show up until they are called by the glowEvent.
	*/
	generateIncomingVehicles: function () {
		//var vtype = ['plane1', 'train1', 'boat1'];
		incoming[0] = this.game.add.sprite(xloc + (theScale * cols) , yloc - theScale/1.5, 'boat1', 3);
		incoming[0].scale.setTo(theScale / 150);
		incoming[0].kill();
		incoming[1] = this.game.add.sprite(xloc + (theScale * cols), yloc - theScale/1.5, 'plane1', 3);
		incoming[1].scale.setTo(theScale / 150);
		incoming[1].kill();
		incoming[2] = this.game.add.sprite(xloc + (theScale * cols), yloc - theScale/1.5, 'train1', 3);
		incoming[2].scale.setTo(theScale / 150);
		incoming[2].kill();
	},
	/*
		Sets up all the glow sprites on the grid and then "kills" them.
	*/
	generateGlows: function () {
		//phaser's random number generator
		var numGlows = cols * rows;
		var current;

		var col = 1;
		var x = xloc;
		var y = yloc;
		for (var i = 0; i < numGlows; i++) {
			//add sprite
			current = this.game.add.sprite(x, y, 'glow1');
			current.animations.add('pulse', [0, 1, 2, 3], 10, true);

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
			glows[i] = current;

			//Initializes blank map
			glows[i].frame = 0;
			glows[i].kill();
		}
	},

	/*
		Gives the glow a starting and end time.
	*/
	prepareGlow: function (glow, vehicle, start, end) {
		var t = 0;
		console.log(vehicle.key + " frame: " + vehicle.frame);
		if (vehicle.key === 'plane1') {
			t = 1;
		} else if (vehicle.key === 'boat1') {
			t = 0;
		} else if (vehicle.key === 'train1') {
			t = 2;
		}
		glowEvents[g] = {
			sprite: glow,
			display: incoming[t],
			frame: vehicle.frame,
			startTime: MAXTIME - start,
			endTime: MAXTIME - end,
			activated: false,
		};
		g++;

	},

	/*
		Checks to see if the count has reached a certain time. If the
		glow.startTime is reached, it starts glowing. Otherwise it
		stops glowing.
	*/
	checkGlowEvent: function (glowEvent) {
		if (glowEvent.activated) {
			if (count <= glowEvent.endTime) {
				glowEvent.activated = false;
				glowEvent.sprite.animations.stop();
				glowEvent.sprite.kill();
				glowEvent.display.kill();
			}
		} else {
			if (count === glowEvent.startTime) {
				glowEvent.sprite.revive();
				glowEvent.display.revive();
				glowEvent.display.frame = glowEvent.frame;
				glowEvent.sprite.animations.play('pulse');
				glowEvent.activated = true;
			}
		}
	},

	/*
		Randomly spawns a vehicle on a predetermined tile. No conflict-checking yet.
	*/
	randomSpawn: function () {

		var rnd, veh;
		var vtype = ['plane1', 'train1', 'boat1'];

		//Grid cell locations
		var south = [
			[xloc+(theScale/2), (yloc - 150)+(theScale/2)], //south[0][0] and south[0][1]
			[xloc + theScale+(theScale/2), (yloc - 150)+(theScale/2)], //south[1][0] and south[1][1]
			[xloc + (2 * theScale)+(theScale/2), (yloc - 150)+(theScale/2)] //south[2][0] and south[2][1]
		];

		var east = [
			[xloc - 150+(theScale/2), yloc+(theScale/2)], // etc...
			[xloc - 150+(theScale/2), yloc + theScale+(theScale/2)],
			[xloc - 150+(theScale/2), yloc + (2 * theScale)+(theScale/2)]
		];


		var north = [
			[xloc+(theScale/2), yloc + (2 * theScale) + 150+(theScale/2)],
			[xloc + theScale+(theScale/2), yloc + (2 * theScale) + 150+(theScale/2)],
			[xloc + (2 * theScale)+(theScale/2), yloc + (2 * theScale) + 150+(theScale/2)]
		];

		var west = [
			[xloc + (2 * theScale) + 150+(theScale/2), yloc+(theScale/2)],
			[xloc + (2 * theScale) + 150+(theScale/2), yloc + theScale+(theScale/2)],
			[xloc + (2 * theScale) + 150+(theScale/2), yloc + (2 * theScale)+(theScale/2)]
		];

		veh = this.game.rnd.integerInRange(1, 4);
		rnd = this.game.rnd.integerInRange(0, 2);

		//prevents spawning in the same square as last spawn
		while ((veh === (lastSpawn[0])) && rnd === lastSpawn[1]) {
			rnd = this.game.rnd.integerInRange(0, 2);
		}

		//prevents spawning in the opposite row/column as last spawn
		while (((veh === (lastSpawn[0])) || veh === (lastSpawn[0] + 2) || veh === (lastSpawn[0] - 2)) && rnd === lastSpawn[1]) {
			rnd = this.game.rnd.integerInRange(0, 2);
		}

		switch (veh) {
		case 1:
			this.generateVehicle(south[rnd][0], south[rnd][1], 1, vtype[this.game.rnd.integerInRange(0, 2)]);
			console.log("Going south");
			lastSpawn[0] = veh;
			lastSpawn[1] = rnd;
			break;
		case 2:
			this.generateVehicle(east[rnd][0], east[rnd][1], 0, vtype[this.game.rnd.integerInRange(0, 2)]);
			console.log("Going east");
			lastSpawn[0] = veh;
			lastSpawn[1] = rnd;
			break;
		case 3:
			this.generateVehicle(north[rnd][0], north[rnd][1], 3, vtype[this.game.rnd.integerInRange(0, 2)]);
			console.log("Going north");
			lastSpawn[0] = veh;
			lastSpawn[1] = rnd;
			break;
		case 4:
			this.generateVehicle(west[rnd][0], west[rnd][1], 2, vtype[this.game.rnd.integerInRange(0, 2)]);
			console.log("Going west");
			lastSpawn[0] = veh;
			lastSpawn[1] = rnd;
			break;
		}

	},

	/*
    	Spawn vehicle events that is adjusted by the level selected.
    */
	spawnVehicles: function (level) {
		//attempt at making vehicles group
		this.vehicles = this.game.add.group();
		this.vehicles.enableBody = true;

		if (level === 0) {
			this.generateVehicle(xloc - 150+(theScale/2), yloc+(theScale/2), 0, 'boat1');

		} else if (level === 1) {
			for (var p = 0; p < 4; p++)
				this.randomSpawn();

			for (var k = 0; k < vehicles.length; k++) {
				this.vehicleWait(vehicles[k], (1 + k) * 5);
				this.takeVehicleInfo(vehicles[k], 5);
			}
		} else if (level === 2) {
			for (var p = 0; p < 8; p++)
				this.randomSpawn();

			for (var k = 0; k < vehicles.length; k++) {
				this.vehicleWait(vehicles[k], (1 + k) * 4);
				this.takeVehicleInfo(vehicles[k], 4);
			}
		} else if (level === 3) {
			for (var p = 0; p < 12; p++)
				this.randomSpawn();

			for (var k = 0; k < vehicles.length; k++) {
				this.vehicleWait(vehicles[k], (1 + k) * 4);
				this.takeVehicleInfo(vehicles[k], 4);
			}
		} else if (level === 4) {
			for (var p = 0; p < 16; p++)
				this.randomSpawn();

			for (var k = 0; k < vehicles.length; k++) {
				this.vehicleWait(vehicles[k], (1 + k) * 3);
				this.takeVehicleInfo(vehicles[k], 3);
			}
		}
	},
	/*
		Takes a vehicles information and transmits that information
		and inserts it into the prepareGlow function.
	*/
	takeVehicleInfo: function (vehicle, glowTime) {
		var start = MAXTIME - (vehicle.releaseTime + glowTime);
		var end = MAXTIME - vehicle.releaseTime;
		var y = vehicle.y;
		var x = vehicle.x;

		var south = [
			[xloc+(theScale/2), (yloc - 150)+(theScale/2)], //south[0][0] and south[0][1]
			[xloc + theScale+(theScale/2), (yloc - 150)+(theScale/2)], //south[1][0] and south[1][1]
			[xloc + (2 * theScale)+(theScale/2), (yloc - 150)+(theScale/2)] //south[2][0] and south[2][1]
		];

		var east = [
			[xloc - 150+(theScale/2), yloc+(theScale/2)], // etc...
			[xloc - 150+(theScale/2), yloc + theScale+(theScale/2)],
			[xloc - 150+(theScale/2), yloc + (2 * theScale)+(theScale/2)]
		];


		var north = [
			[xloc+(theScale/2), yloc + (2 * theScale) + 150+(theScale/2)],
			[xloc + theScale+(theScale/2), yloc + (2 * theScale) + 150+(theScale/2)],
			[xloc + (2 * theScale)+(theScale/2), yloc + (2 * theScale) + 150+(theScale/2)]
		];

		var west = [
			[xloc + (2 * theScale) + 150+(theScale/2), yloc+(theScale/2)],
			[xloc + (2 * theScale) + 150+(theScale/2), yloc + theScale+(theScale/2)],
			[xloc + (2 * theScale) + 150+(theScale/2), yloc + (2 * theScale)+(theScale/2)]
		];

		if (x === east[0][0]) { 
			if (y === east[0][1]) {
				this.prepareGlow(glows[0], vehicle, start, end); 
			} else if (y === east[1][1]) {
				this.prepareGlow(glows[3], vehicle,  start, end);
			} else if (y === east[2][1]) {
				this.prepareGlow(glows[6], vehicle,  start, end);
			} 
		} else if (x === west[0][0]) { 
			if (y === west[0][1]) {
				this.prepareGlow(glows[2], vehicle, start, end); 
			} else if (y === west[1][1]) {
				this.prepareGlow(glows[5], vehicle,  start, end);
			} else if (y === west[2][1]) {
				this.prepareGlow(glows[8], vehicle,  start, end);
			}
		} else if (y === north[0][1]) { 
			if (x === north[0][0]) {
				this.prepareGlow(glows[6], vehicle, start, end); 
			} else if (x === north[1][0]) {
				this.prepareGlow(glows[7], vehicle,  start, end);
			} else if (x === north[2][0]) {
				this.prepareGlow(glows[8], vehicle,  start, end);
			}
		} else if (y === south[0][1]) { 
			if (x === south[0][0]) {
				this.prepareGlow(glows[0], vehicle, start, end); 
			} else if (x === south[1][0]) {
				this.prepareGlow(glows[1], vehicle,  start, end);
			} else if (x === south[2][0]) {
				this.prepareGlow(glows[2], vehicle,  start, end);
			}
		}
	},
	/*
		"Kills" the vehicle and gives it a time when to appear.
	*/
	vehicleWait: function (vehicle, wait) {
		vehicle.releaseTime = MAXTIME - wait;
		vehicle.kill();
	},

	touchDown: function () {
		if (this.game.input.pointer1.isDown) {
			this.backButton.loadTexture('backDown');
		}
		this.backButton.loadTexture('backDown');
	},
	/*
		Checks the timer on when a vehicle should revive.
	*/
	vehicleRelease: function (vehicle) {
		if (!vehicle.dead && !vehicle.success) {
			if (count <= vehicle.releaseTime) {
				vehicle.revive();
			}
		}
	},
	/*
	    This will allow the game to dynamically adjust its grid 
	    according to level. Level initially starts off at -1 but will 
	    be changed according to the level select. All level adjustments 
	    will be made here!
	*/
	adjustLevel: function (level) {

		//Sets the dimensions of the game to the dimensions of the 
		//"canvas" which is your entire game window.
		this.game.world.setBounds(0, 0, this.game.width, this.game.height);

		if (level === 0) {

			//adjust variables here
			MAXTIME = 10;
			theScale = 100;
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
			MAXTIME = 30;
			theScale = 100;

			//vehicle speed
			planeSpeed = theScale * 1.1;
			boatSpeed = theScale * 0.75;
			trainSpeed = theScale * 0.9;

			//set grid init position and grid elements
			xloc = this.game.world.width / 2 - (theScale * 1.5);
			yloc = this.game.world.height / 3;
			rows = cols = 3;
		}

		if (level === 2) {
			MAXTIME = 45;
			theScale = 100;

			//vehicle speed
			planeSpeed = theScale * 1.1;
			boatSpeed = theScale * 0.75;
			trainSpeed = theScale * 0.9;

			//set grid init position and grid elements
			xloc = this.game.world.width / 2 - (theScale * 1.5);
			yloc = this.game.world.height / 3;
			rows = cols = 3;

		}

		if (level === 3) {
			MAXTIME = 55;
			theScale = 100;

			//vehicle speed
			planeSpeed = theScale * 1.2;
			boatSpeed = theScale * 0.8;
			trainSpeed = theScale;

			//set grid init position and grid elements
			xloc = this.game.world.width / 2 - (theScale * 1.5);
			yloc = this.game.world.height / 3;
			rows = cols = 3;

		}

		if (level === 4) {
			MAXTIME = 60;
			theScale = 100;

			//vehicle speed
			planeSpeed = theScale * 1.3;
			boatSpeed = theScale * 0.9;
			trainSpeed = theScale * 1.1;

			//set grid init position and grid elements
			xloc = this.game.world.width / 2 - (theScale * 1.5);
			yloc = this.game.world.height / 3;
			rows = cols = 3;

		}

	},
	generateVehicle: function (x, y, frame, type) {
		//Display setting for the plane.
		vehicles[v] = this.vehicles.create(x, y, type, frame);
		vehicles[v].scale.setTo(theScale / 100);

		vehicles[v].life = 3;
		vehicles[v].dead = false;
		vehicles[v].moving = true;
		vehicles[v].isHit = false;
		vehicles[v].success = false;

		//add physics to the new plane.
		this.game.physics.arcade.enable(vehicles[v]);
		vehicles[v].body.overlapWorldBounds = true;
		vehicles[v].body.setSize(50, 50);
		vehicles[v].anchor.setTo(0.5);
		v++;
	},

	enableMoving: function (vehicle) {
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
	},
	//function to stop timer clearly ... Jesus
	stopTimer: function () {
		clearInterval(counter);
	},
	//do I need to explain myself?
	startTimer: function () {
		stoptime = false;
		this.timing();
	},
	//used as an event function for when the user wants to dispose of the rules overlay image
	overlayclickevent: function () {
		rules.kill();
		if(evthap === 0) {
			rules2 = this.game.add.sprite(this.game.world.width/2, this.game.world.height * 0.485, 'rules');
			rules2.anchor.setTo(0.5, 0.5);
			rules2.inputEnabled = true;
			this.game.input.onDown.add(this.overlayclickeventtwo, this);
			evthap++;
		}
		/* if (this.game.paused === true) {
			this.pause();
			this.startTimer();
		} */
	},

	//used as an event function for when the user wants to dispose of the rules overlay image
	overlayclickeventtwo: function () {
		rules2.kill();
		if(evthap === 1) {
			rules3 = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.5, 'rules3');
			rules3.anchor.setTo(0.5, 0.5);
			rules3.inputEnabled = true;
			this.game.input.onDown.add(this.overlayclickeventthree, this);
			evthap++;
		}
	},
	
	//used as an event function for when the user wants to dispose of the rules overlay image
	overlayclickeventthree: function () {
		rules3.kill();
		if (this.game.paused === true) {
			this.pause();
			this.startTimer();
		}
	},

	//main function for overlaying rules on screen before the game starts
	//simply shows rules to user if level is 0 or in other words tutorial
	overlayrules: function () {
		if (level === 0) {
			stoptime = true;
			this.gamepause();
			rules = this.game.add.sprite(this.game.world.width / 2, this.game.world.height * 0.485, 'rules2');
			rules.anchor.setTo(0.5, 0.5);
			rules.inputEnabled = true;
			this.game.input.onDown.add(this.overlayclickevent, this);
		}
	},
	//you are a big boy you know whats up
	gamepause: function () {
		this.pause();
		this.stopTimer();
	},
	//the name
	pause: function () {
		if (this.game.paused === false) {
			lol = 'game paused';
			this.game.paused = true;
			return true;
		}
		if (this.game.paused === true) {
			lol = 'game unpaused';
			this.game.paused = false;
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
	update: function () {
		this.updateScore();
		//method that will be later refined to show progress better.
		this.progressBar();
		//checks to see if a vehicle hits the border.
		this.game.physics.arcade.collide(this.vehicles, this.borders, this.hitBorder, null, this);
		//checks if the time is 0
		this.TimeCheck();
		//Overlap that allows all members of vehicles to interact with 
		//tiles.
		this.game.physics.arcade.overlap(this.vehicles, this.blocks, this.playSound, this.checkTile, this);

		for (var j = 0; j < glowEvents.length; j++) {
			this.checkGlowEvent(glowEvents[j]);
		}

		// Check if there are alive vehicles
		if (vehicles.length > 0) {
			// Special condition for lv 0
			if (level === 0) {
				if (blocks[0].frame === 0) {
					vehicles[0].body.velocity.x = boatSpeed;
				} else if (blocks[0].frame !== 0) {
					vehicles[0].body.velocity.x = 0;
				}
			} else {
				//Checks whether or not the vehicle has been "allowed to move."
				for (var i = 0; i < vehicles.length; i++) {
					this.vehicleRelease(vehicles[i]);
					if (vehicles[i].moving) {
						if (vehicles[i].key === 'plane1') {
							if (vehicles[i].frame === 0)
								vehicles[i].body.velocity.x = planeSpeed;
							else if (vehicles[i].frame === 1)
								vehicles[i].body.velocity.y = planeSpeed;
							else if (vehicles[i].frame === 2)
								vehicles[i].body.velocity.x = -1 * planeSpeed;
							else if (vehicles[i].frame === 3)
								vehicles[i].body.velocity.y = -1 * planeSpeed;
						} else if (vehicles[i].key === 'boat1') {
							if (vehicles[i].frame === 0)
								vehicles[i].body.velocity.x = boatSpeed;
							else if (vehicles[i].frame === 1)
								vehicles[i].body.velocity.y = boatSpeed;
							else if (vehicles[i].frame === 2)
								vehicles[i].body.velocity.x = -1 * boatSpeed;
							else if (vehicles[i].frame === 3)
								vehicles[i].body.velocity.y = -1 * boatSpeed;
						} else if (vehicles[i].key === 'train1') {
							if (vehicles[i].frame === 0)
								vehicles[i].body.velocity.x = trainSpeed;
							else if (vehicles[i].frame === 1)
								vehicles[i].body.velocity.y = trainSpeed;
							else if (vehicles[i].frame === 2)
								vehicles[i].body.velocity.x = -1 * trainSpeed;
							else if (vehicles[i].frame === 3)
								vehicles[i].body.velocity.y = -1 * trainSpeed;
						}
					} else
						this.Hit(vehicles[i]);
				}
			}
		}

		if (death === 3) {
			count = 0;
		}
	},
	/*
	    Checks the life of all the vehicles to see whether or not they
	    have recently died. Called by the update method.
	*/
	lifeCheck: function (vehicle) {
		//Life logic function
		if (vehicle.life <= 0) {
			if (!vehicle.dead) {
				this.explosion(vehicle);
				vehicle.dead = true;
				vehicle.kill();
				VEHICULARDESTRUCTION = true;
				death++;
				return false;
			}
		}
		return true;
	},

	/*
	    Updates the progress bar that will represent the time remaining
	    until the player wins the level.
	*/
	progressBar: function () {
		var percent = Math.floor(count / MAXTIME * 100);
		switch (percent) {
case 100:
this.progbar.frame = 99;
break;
case 99:
this.progbar.frame = 99;
break;
case 98:
this.progbar.frame = 98;
break;
case 97:
this.progbar.frame = 97;
break;
case 96:
this.progbar.frame = 96;
break;
case 95:
this.progbar.frame = 95;
break;
case 94:
this.progbar.frame = 94;
break;
case 93:
this.progbar.frame = 93;
break;
case 92:
this.progbar.frame = 92;
break;
case 91:
this.progbar.frame = 91;
break;
case 90:
this.progbar.frame = 90;
break;
case 89:
this.progbar.frame = 89;
break;
case 88:
this.progbar.frame = 88;
break;
case 87:
this.progbar.frame = 87;
break;
case 86:
this.progbar.frame = 86;
break;
case 85:
this.progbar.frame = 85;
break;
case 84:
this.progbar.frame = 84;
break;
case 83:
this.progbar.frame = 83;
break;
case 82:
this.progbar.frame = 82;
break;
case 81:
this.progbar.frame = 81;
break;
case 80:
this.progbar.frame = 80;
break;
case 79:
this.progbar.frame = 79;
break;
case 78:
this.progbar.frame = 78;
break;
case 77:
this.progbar.frame = 77;
break;
case 76:
this.progbar.frame = 76;
break;
case 75:
this.progbar.frame = 75;
break;
case 74:
this.progbar.frame = 74;
break;
case 73:
this.progbar.frame = 73;
break;
case 72:
this.progbar.frame = 72;
break;
case 71:
this.progbar.frame = 71;
break;
case 70:
this.progbar.frame = 70;
break;
case 69:
this.progbar.frame = 69;
break;
case 68:
this.progbar.frame = 68;
break;
case 67:
this.progbar.frame = 67;
break;
case 66:
this.progbar.frame = 66;
break;
case 65:
this.progbar.frame = 65;
break;
case 64:
this.progbar.frame = 64;
break;
case 63:
this.progbar.frame = 63;
break;
case 62:
this.progbar.frame = 62;
break;
case 61:
this.progbar.frame = 61;
break;
case 60:
this.progbar.frame = 60;
break;
case 59:
this.progbar.frame = 59;
break;
case 58:
this.progbar.frame = 58;
break;
case 57:
this.progbar.frame = 57;
break;
case 56:
this.progbar.frame = 56;
break;
case 55:
this.progbar.frame = 55;
break;
case 54:
this.progbar.frame = 54;
break;
case 53:
this.progbar.frame = 53;
break;
case 52:
this.progbar.frame = 52;
break;
case 51:
this.progbar.frame = 51;
break;
case 50:
this.progbar.frame = 50;
break;
case 49:
this.progbar.frame = 49;
break;
case 48:
this.progbar.frame = 48;
break;
case 47:
this.progbar.frame = 47;
break;
case 46:
this.progbar.frame = 46;
break;
case 45:
this.progbar.frame = 45;
break;
case 44:
this.progbar.frame = 44;
break;
case 43:
this.progbar.frame = 43;
break;
case 42:
this.progbar.frame = 42;
break;
case 41:
this.progbar.frame = 41;
break;
case 40:
this.progbar.frame = 40;
break;
case 39:
this.progbar.frame = 39;
break;
case 38:
this.progbar.frame = 38;
break;
case 37:
this.progbar.frame = 37;
break;
case 36:
this.progbar.frame = 36;
break;
case 35:
this.progbar.frame = 35;
break;
case 34:
this.progbar.frame = 34;
break;
case 33:
this.progbar.frame = 33;
break;
case 32:
this.progbar.frame = 32;
break;
case 31:
this.progbar.frame = 31;
break;
case 30:
this.progbar.frame = 30;
break;
case 29:
this.progbar.frame = 29;
break;
case 28:
this.progbar.frame = 28;
break;
case 27:
this.progbar.frame = 27;
break;
case 26:
this.progbar.frame = 26;
break;
case 25:
this.progbar.frame = 25;
break;
case 24:
this.progbar.frame = 24;
break;
case 23:
this.progbar.frame = 23;
break;
case 22:
this.progbar.frame = 22;
break;
case 21:
this.progbar.frame = 21;
break;
case 20:
this.progbar.frame = 20;
break;
case 19:
this.progbar.frame = 19;
break;
case 18:
this.progbar.frame = 18;
break;
case 17:
this.progbar.frame = 17;
break;
case 16:
this.progbar.frame = 16;
break;
case 15:
this.progbar.frame = 15;
break;
case 14:
this.progbar.frame = 14;
break;
case 13:
this.progbar.frame = 13;
break;
case 12:
this.progbar.frame = 12;
break;
case 11:
this.progbar.frame = 11;
break;
case 10:
this.progbar.frame = 10;
break;
case 9:
this.progbar.frame = 9;
break;
case 8:
this.progbar.frame = 8;
break;
case 7:
this.progbar.frame = 7;
break;
case 6:
this.progbar.frame = 6;
break;
case 5:
this.progbar.frame = 5;
break;
case 4:
this.progbar.frame = 4;
break;
case 3:
this.progbar.frame = 3;
break;
case 2:
this.progbar.frame = 2;
break;
case 1:
this.progbar.frame = 1;
break;

		}
	},

	TimeCheck: function () {
		if (count === 0) {
			this.vehicles = null;
			this.background = null;
			this.blocks = null;
			this.progbar = null;
			text = null;
			count = null;
			clearInterval(counter);
			counter = null;
			bonus = 0;
			for (var i = 0; i < vehicles.length; i++) {
				if (vehicles[i].success && vehicles[i].life === 3) {
					UNHARMED = true;
					bonus += 200;
				}
			}
			postScore = scoreSum;
			scoreSum = 0;
			vehicles = [];
			v = 0;
			glows = [];
			g = 0;
			glowEvents = [];
			incoming = [];
			i = 0;
			if (death < 3) {
				death = 0;
				evthap = 0;
				this.game.state.start('WinScreen');
			} else {
				if (tileClicks === 0) {
					NOHANDS = true;
					console.log(NOHANDS + 'TileClicks:' + tileClicks);
				}
				tileClicks = 0;
				death = 0;
				evthat = 0;
				this.game.state.start('LoseScreen');
			}
		}
	},

	/*
	    This function is called by the game physics overlap.
	    Takes a vehicle and a tile. Check to see if the vehicle matches 
	    the correct tile.
	*/
	checkTile: function (vehicle, tile) {
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
		Updates the scoreText to reflect the current score.
	*/
	updateScore: function () {
		scoreText.text = 'Score: ' + scoreSum;
	},
	/*
	    This function allows the tiles to cycle between our 
	    spritesheet.
	*/
	onDown: function (tile, pointer) {
		tileClicks++;
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
	hitBorder: function (vehicle, border) {

		if (!vehicle.success) {
			console.log("hit the border.");
			scoreSum += vehicle.life * 100;
			vehicle.kill();
			vehicle.success = true;
		}

	},
	/*
	    Fixed hit.
	*/
	Hit: function (vehicle) {
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
	explosion: function (vehicle) {
		emitter.x = vehicle.body.x;
		emitter.y = vehicle.body.y;

		//1) boolean for 'explode' (particles generate all at once)
		//2) particle lifespan (ms)
		//3) ignore
		//4) number of particles
		emitter.start(true, 1500, null, 8);
	},

	gameEnd: function () {

		var menu = this.game.add.sprite(this.game.world.width / 2 - 150, this.game.height * 0.4, 'continueUp');
		var retry = this.game.add.sprite(this.game.world.width / 2 - 150, this.game.height * 0.4 + 105, 'backUp');
		var result = this.game.add.text(this.game.world.width / 2 - 150, yloc * 0.50, 'Result is PANTS', {
			fontSize: this.game.world.width / 10 + 'px',
			fill: '#F00'
		});
	}

};