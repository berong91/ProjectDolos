var SpaceHipster = SpaceHipster || {};

//title screen
SpaceHipster.Game = function(){};

SpaceHipster.Game.prototype = {
  create: function() {
  	//set world dimensions
    this.game.world.setBounds(0, 0, 1920, 1920);

    //background
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
    this.generateAsteriods();
  },

  generateAsteriods: function() {
    this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;

    //phaser's random number generator
    var numAsteroids = this.game.rnd.integerInRange(150, 200);
    var asteriod;

    for (var i = 0; i < numAsteroids; i++) {
      //add sprite
      asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      asteriod.scale.setTo(this.game.rnd.integerInRange(10, 40)/10);

      //physics properties
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.immovable = true;
      asteriod.body.collideWorldBounds = true;
    }
  },
};

/*
TODO

-audio
-asteriod bounch
*/
