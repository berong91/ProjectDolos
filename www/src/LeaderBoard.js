var TMT = TMT || {};
//title screen
TMT.LeaderBoard = function () {};

var arr = [];

TMT.LeaderBoard.prototype = {
    preload: function () {
    },
    create: function () {
        // Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');
        this.background.autoScroll(-5, 0);
        
        // Add logo image
        this.readBoardData();
        
        
    },
    update: function () {        
        if (arr.length > 0){
            // Add text title, player and score
            this.game.add.text(this.game.width / 2 - 30, 64 + i * 32, 'Top 10',
            { font: "32px Arial", fill: this.generateHexColor(), stroke: '#000000', strokeThickness: 4 });
            this.game.add.text(this.game.width / 2 - 250, 64 + i * 32, 'Player',
            { font: "32px Arial", fill: this.generateHexColor(), stroke: '#000000', strokeThickness: 4 });
            this.game.add.text(this.game.width / 2 + 150, 64 + i * 32, 'Score', 
            { font: "32px Arial", fill: this.generateHexColor(), stroke: '#000000', strokeThickness: 4 });
            
            // add all array data
            for (var i = 0; i < arr.length; i++)
            {
                this.game.add.text(this.game.width / 2 - 250, 64 + i * 32, arr[i][0], 
                { font: "32px Arial", fill: this.generateHexColor(), stroke: '#000000', strokeThickness: 4 });
                this.game.add.text(this.game.width / 2 + 150, 64 + i * 32, arr[i][1], 
                { font: "32px Arial", fill: this.generateHexColor(), stroke: '#000000', strokeThickness: 4 });
            }
            arr = [];
            
            // Add leader board button
            this.backButton = this.game.add.button(this.game.width / 2, 500, 'backUp', this.backClickEvent, this);
            this.backButton.anchor.setTo(0.5, 0.8);
        }
    },
    readBoardData: function() {
        $.ajax({
            type: "GET",
            url: "test.php",
            data: "",
            dataType:'json',
            success: function(data) {
                for (i = 0; i < data.length; i++){
                    arr[i] = $.map(data[i], function(el) { return el; });
                }        
                // console.log(data);
                // console.log(arr);
            },
            error: function(xhr, status, error) {
                // check status && error
                alert(xhr + "\n" +status + "\n" + error );
            },
        });
    },
    generateHexColor: function () { 
        return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
    },
    backClickEvent: function(){
        this.game.state.start('MainMenu');
    }
};                  