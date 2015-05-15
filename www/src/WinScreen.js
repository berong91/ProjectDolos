varTMT=TMT||{};

//titlescreen
TMT.WinScreen=function(){};

var name;
var y;
TMT.WinScreen.prototype={
    preload:function(){
        this.generateRandomName();
    },
    create:function(){
        y = this.game.height/8;
        
        //Setbackgroundandgivebackgroundspeedinx
        this.background=this.game.add.tileSprite(0,0,this.game.width,this.game.height,'peaks');
        //this.background.autoScroll(-5,0);
        
        //Addlogoimage
        this.logo=this.game.add.sprite(this.game.width/2,y*1.5,'gameend');
        this.logo.scale.setTo(0.7);
        this.logo.anchor.setTo(0.5,0.5);        
    },
    update: function(){
        if(name || name.length !== 0){
            this.game.add.text(this.game.width / 2 - 150, y * 4, 'Hello ' + name,
            { font: "32px Arial", fill: this.generateHexColor(), stroke: '#000000', strokeThickness: 4 });
            name = "";
        }
    },
    startClickEvent:function(){
        this.game.state.start('MainMenu');
    },
    generateRandomName:function(){
        $.ajax({
            url:'http://api.randomuser.me/',
            dataType:'json',
            success:function(data){
                name = 
                capitalizeFirstChar(data.results[0].user.name.title) + ". " + 
                capitalizeFirstChar(data.results[0].user.name.first) + " " + 
                capitalizeFirstChar(data.results[0].user.name.last);
                //console.log(name);
            }
        });
    },
    generateHexColor: function () { 
        return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
    }    
};

function capitalizeFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }                    