var SpaceHipster = SpaceHipster || {};
var xloc = 0;
var yloc = 0;
var marker;
var currentTile = 0;

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
        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 160, 160);
        
        //enable physics in them
        this.asteroids.enableBody = true;

        //phaser's random number generator
        var numAsteroids = 9;
        var asteriod;

        for (var i = 0; i < numAsteroids; i++) {
            //add sprite
            asteriod = this.asteroids.create(xloc, yloc, 'rock');
            
            xloc += 160;
            if((xloc % 480) === 0){
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
    update: function() {
        marker.x = asteroids.getTileX(game.input.activePointer.worldX) *160;
        marker.y = asteroids.getTileY(game.input.activePointer.worldY) *160;
           if(this.game.input.activePointer.justPressed()){
                if(currentTile === asteroid) {
                    
                }
           }
    },
    updateMarker: function() {

    marker.x = currentLayer.getTileX(this.input.activePointer.worldX) * 160;
    marker.y = currentLayer.getTileY(this.input.activePointer.worldY) * 160;

    if (game.input.mousePointer.isDown)
    {
        map.putTile(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), currentLayer);
        // map.fill(currentTile, currentLayer.getTileX(marker.x), currentLayer.getTileY(marker.y), 4, 4,                   currentLayer);
    }

}
};

