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
var blocks = [];

//Life system.
var life;

//title screen
TMT.Game = function () {};

TMT.Game.prototype = {
    create: function () {
        //set world dimensions
        this.game.width = 480;
        this.game.height = 800;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        var yloc = (this.game.height / 2) - 200

        //Sets the beginning lives to three.
        life = 3;

        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        this.generateBlocks();

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
            if (xloc === 390) {
                xloc = 90;
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
        }
    },
    update: function () {
        //Sounds must be called inside of this function either directly or with another function entirely (except create and preload)

        this.plane.body.velocity.x = 100;
        this.game.physics.arcade.collide(this.plane, row1col2, this.playSound, this.checkTile, this);

        /* Life system, 3 hits and plane is kill.
        if (lifes <= 0)
            this.plane.kill();
        */
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
        this.explosionSound.play();
        if (sprite.frame < 2)
            sprite.frame++;
        else
            sprite.frame = 0;
    },

    //This takes no parameters, makes a sound.
    playSound: function () {
        this.explosionSound.play();
        this.plane.body.velocity.x = -5000;

        /*
        This is the life system. When a plane hits the bad tile. In the update function, if there is 0 or less lives, your plane dies. 
        */
        //life--;
    },
};