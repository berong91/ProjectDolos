var TMT = TMT || {};

//titlescreen
TMT.LoseScreen = function () {};

var y;

TMT.LoseScreen.prototype = {
	preload: function () {},
	create: function () {
		y = this.game.height / 8;

		//Setbackgroundandgivebackgroundspeedinx
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');
		//this.background.autoScroll(-5,0);

		//Addlogoimage
		this.logo = this.game.add.sprite(this.game.width / 2, this.game.height * 0.2, 'lose');
		this.logo.scale.setTo(0.7);
		this.logo.anchor.setTo(0.5, 0.5);

		// Add back button
		this.backButton = this.game.add.button(this.game.width / 2, this.game.height * 0.7, 'backUp', this.backClickEvent, this);
		this.backButton.events.onInputDown.add(this.touchDown, this);
		this.backButton.anchor.setTo(0.5, 0.8);
		this.backButton.scale.set(0.5, 0.5);

		this.game.add.text(this.game.width * 0.15 , this.game.height * 0.35, 'Hello ' + name, {
			font: "32px Arial",
			fill: this.generateHexColor(),
			stroke: '#000000',
			strokeThickness: 4
		});
		this.game.add.text(this.game.width * 0.15, this.game.height * 0.4, 'Your Score is: ' + postScore + ' \n+ bonus: ' + bonus, {
			font: "32px Arial",
			fill: this.generateHexColor(),
			stroke: '#000000',
			strokeThickness: 4
		});
		this.game.add.text(this.game.width * 0.15, this.game.height * 0.6, 'Total: ' + (postScore + bonus), {
			font: "32px Arial",
			fill: this.generateHexColor(),
			stroke: '#000000',
			strokeThickness: 4
		});
		this.addClickEvent(name, postScore);
		if (UNHARMED)
			this.achieveEvent(name, 'unharmed');
		if (VEHICULARDESTRUCTION)
			this.achieveEvent(name, 'destruction');
		if (NOHANDS)
			this.achieveEvent(name, 'nohands');
		level = -99;
		postScore = 0;
	},
	update: function () {
		if (NOHANDS) {
			this.game.add.text(this.game.width * 0.15 , this.game.height * 0.7, 'Look mom, No hands!\nYou didn\'t touch any tiles \nthat round', {
				font: "20px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});
		}
		if (VEHICULARDESTRUCTION) {
			this.game.add.text(this.game.width * 0.15 , this.game.height * 0.9, 'Vehicular Destruction!\nYou murdered a vehicle!', {
				font: "20px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});
		}
		if (UNHARMED) {
			this.game.add.text(this.game.width * 0.15 , this.game.height * 0.8, 'UNHARMED!\nYou spared a vehicle\'s life!', {
				font: "20px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});
		}
	},
	touchDown: function() {
		if(this.game.input.pointer1.isDown) {
			this.backButton.loadTexture('backDown');
		}
		this.backButton.loadTexture('backDown');
	},
	startClickEvent: function () {
		VEHICULARDESTRUCTION = false;
		NOHANDS = false;
		UNHARMED = false;
		this.game.state.start('MainMenu');
	},
	backClickEvent: function () {
		VEHICULARDESTRUCTION = false;
		NOHANDS = false;
		UNHARMED = false;
		this.game.state.start('MainMenu');
	},
	achieveEvent: function (name1, achieve) {        
        $.ajax({
            url: "postAchievements.php",
            type: "POST",
            //NAME = username
			//description
			//achieve
			data: "Name=" + name1 + "&description=asdasd" + "&achieve=" + achieve,
            success: function( data ) {

            },
            error: function(xhr, status, error) {
                // check status && error
                alert(xhr + "\n" +status + "\n" + error );
            },
        });
    },
	addClickEvent: function (name1, postScore) {
        $('#Name').val(name1);
        $('#Score').val(postScore);
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
    },
	generateHexColor: function () {
		return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
	}
};
