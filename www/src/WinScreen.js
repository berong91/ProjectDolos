var TMT = TMT || {};

//titlescreen
TMT.WinScreen = function () {};

var name;
var y;

TMT.WinScreen.prototype = {
	preload: function () {
		this.generateRandomName();
	},
	create: function () {
		y = this.game.height / 8;

		//Setbackgroundandgivebackgroundspeedinx
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');
		//this.background.autoScroll(-5,0);

		//Addlogoimage
		this.logo = this.game.add.sprite(this.game.width / 2, this.game.height * 0.2, 'win');
		this.logo.scale.setTo(0.7);
		this.logo.anchor.setTo(0.5, 0.5);

		// Add back button
		this.backButton = this.game.add.button(this.game.width / 2, this.game.height * 0.7, 'backUp', this.backClickEvent, this);
		this.backButton.events.onInputDown.add(this.touchDown, this);
		this.backButton.anchor.setTo(0.5, 0.8);
		this.backButton.scale.set(0.5, 0.5);
	},
	update: function () {
		if (name || name.length !== 0) {
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
			this.addClickEvent(name, (postScore+bonus));
			level = -99;
			name = "";
			postScore = 0;

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
	addClickEvent: function (name, postScore) {
        $('#Name').val(name);
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
	/*
	    This method get a random name from https://randomuser.me/ API.
	    */
	generateRandomName: function () {
		$.ajax({
			url: 'http://api.randomuser.me/',
			dataType: 'json',
			success: function (data) {
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

// This method will capitalize the first char of each word of input string
function capitalizeFirstChar(str) {
	return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});
}