var TMT = TMT || {};

//title screen
TMT.MainMenu = function () {};

TMT.MainMenu.prototype = {
    preload: function () {
        
    },
    create: function () {
        // Set background and give background speed in x
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'gamebg');
        this.background.autoScroll(-20, 0);
        
        // Add logo image
        this.logo = this.game.add.sprite(this.game.width / 2, 155, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        
        // Add start button
        this.startButton = this.game.add.button(this.game.width / 2, 400, 'startButton', this.startClickEvent, this);
        this.startButton.anchor.setTo(0.5, 0.8);
        
        // Add leader board button
        this.boardButton = this.game.add.button(this.game.width / 2 - 100, 520, 'board', this.boardClickEvent, this);
        this.boardButton.anchor.setTo(0.5, 0.8);
        
        // Add leader board button
        this.boardButton1 = this.game.add.button(this.game.width / 2 + 100, 520, 'board1', this.addClickEvent, this);
        this.boardButton1.anchor.setTo(0.5, 0.8);
        
        //this.addButton = this.game.add.button(0, 0, 'startButton', this.addClickEvent, this);
    },
    update: function () {
        if (!!this.ready) {
            this.game.state.start('MainMenu');
        }
    },
    startClickEvent: function () {
        this.game.state.start('LevelSelect');
    },
    boardClickEvent: function() {
        this.game.state.start('LeaderBoard');
    },
    addClickEvent: function () {
        $('#Name').val(prompt());
        $('#Score').val(prompt());
        $('#Level').val(prompt());
        alert($("#actionForm").serialize());
        
        $("form").on("submit", function (e) {
            e.preventDefault();            
            $.ajax({
                url: "sql.php",
                type: "POST",
                data: $("#actionForm").serialize(),
                success: function( data ) {
                    console.log("Success");
                },
                error: function(xhr, status, error) {
                    // check status && error
                    alert(xhr + "\n" +status + "\n" + error );
                },
            });
        });   
        $("form").submit();
        return false;
    }
/*     ,
    readBoardData: function() {
        $.ajax({
            type: "GET",
            url: "test.php",
            data: "",
            dataType:'json',
            success: function(data) {
                var arr = [];                
                for (i = 0; i < data.length; i++){
                    arr[i] = $.map(data[i], function(el) { return el; });
                }                
                
                console.log(arr);
            },
            error: function(xhr, status, error) {
                // check status && error
                alert(xhr + "\n" +status + "\n" + error );
            },
        });
    } */
};