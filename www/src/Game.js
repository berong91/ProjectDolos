var SpaceHipster = SpaceHipster || {};
var xloc = 0;
var yloc = 0;

//title screen
SpaceHipster.Game = function () {};

SpaceHipster.Game.prototype = {
    create: function () {
        //set world dimensions
        this.game.world.setBounds(0, 0, 600, 600);

        //background
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        this.generateAsteriods();
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
            asteriod = this.asteroids.create(xloc, yloc, 'rock');
            xloc += 160;
            if(xloc % 480 == 0){
                xloc = 0;
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
};
