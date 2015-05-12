var TMT = TMT || {};
var xloc;
var yloc;
var marker;
var currentTile = 0;
var blocks = [];

//Life system.
var life;
var dead = false;

//Time Elapsed variables
var timeStart;
var elapsed;
var text;

var emitter;

//title screen
TMT.Game = function () {};

TMT.Game.prototype = {
    create: function () {
		//Sets the beginning lives to three.
        life = 3;

        this.game.world.setBounds(0, 0, this.game.width, this.game.height);

		timeStart = new Date();
		
        //set grid init position
        xloc = ((this.game.world.width / 2) - 150);
        yloc = (this.game.world.height / 2) - (0.0625 * this.game.world.height);

        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'gamebg');

        // Generate all the blocks
        this.generateBlocks();


        //sprites
        //plane is the object that is moving.
        this.plane = this.game.add.sprite(xloc - 500, blocks[0].y + 100, 'plane1');
        this.plane.scale.setTo(1);
        this.plane.frame = 0;

        //add physics to the sprites
        this.game.physics.arcade.enable(this.plane);
        this.plane.body.overlapWorldBounds = true;

		//This will create text in the top left of the game screen.
		text = this.game.add.text(50, 50, 'Time: 0s' , { fontSize: '32px', fill: '#FFF' });
		
        emitter = this.game.add.emitter(0,0,10);
        emitter.makeParticles('fire');
        emitter.gravity = 200;
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
    update: function() {
    	
		//Timer for the top left of the swcreen.
		//text variable is the created on line 53
		var date = new Date();
		var time = timeStart.getSeconds();
		elapsed = date.getSeconds() - time;
		text.text = 'Time: ' + elapsed + 's';
		
		//Sounds must be called inside of this function either directly or with another function entirely (except create and preload)
		
		this.plane.body.velocity.x = 100;
		this.game.physics.arcade.overlap(this.plane, this.blocks, this.playSound, this.checkTile, this);
	
		
		if (life <= 0) {
            if(!dead)
                this.explosion(this.plane.body.x, this.plane.body.y);
                dead = true;
			this.plane.kill();
        }
    },
    //Checks to see if the tile matches the "air" tile that the plane wants to travel accross. tile.frame 1 is the air tile.
    checkTile: function (plane, tile) {
        if (tile.frame === 1)
            return false;
        else
            return true;
    },
    //This function allows the tiles to cycle between our spritesheet.
    onDown: function (sprite, pointer) {
        switchSound.play();
        if (sprite.frame < 2)
            sprite.frame++;
        else
            sprite.frame = 0;
    },
    //This takes no parameters, makes a sound.
    playSound: function () {
        explosionSound.play();
        this.plane.body.velocity.x = -6000;


        /*
        This is the life system. When a plane hits the bad tile, you lose a life.
        */
        life--;
    },

    //Particle explosion
    explosion: function (x, y) {
        emitter.x = x;
        emitter.y = y;

        //1) boolean for 'explode' (particles generate all at once)
        //2) particle lifespan (ms)
        //3) ignore
        //4) number of particles
        emitter.start(true, 1500, null, 8);
    },
    
};
