var TMT = TMT || {};
//title screen
TMT.Achievements = function () {};

var arr = [];
var texts = [];
var handtime;
var desttime;
var harmtime;
TMT.Achievements.prototype = {
	preload: function () {},
	create: function () {
		
		handtime = '';
		desttime = '';
		harmtime = '';
		
		// Set background and give background speed in x
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');

		this.foregroundF();

		// Add back button
		this.backButton = this.game.add.button(this.game.width / 2, this.game.height * 0.9, 'backUp', this.backClickEvent, this);
		this.backButton.events.onInputDown.add(this.touchDown, this);
		this.backButton.anchor.setTo(0.5, 0.8);
		this.backButton.scale.set(0.5, 0.5);
		

		if(3 > 0) {
		//if (arr.length > 0) {
			// Add text title: player and score
			this.achievements = this.game.add.text(this.game.width * 0.5, this.game.height * 0.1, 'Achievements', {
				font: "25px Arial",

				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});

			this.achievements.anchor.setTo(0.5, 0.5);
			
			this.name = this.game.add.text(this.game.width * 0.12, this.game.height * 0.18, 'Name:', {
				font: "25px Arial",

				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});

			this.name.anchor.setTo(0, 0.5);
			
			this.description = this.game.add.text(this.game.width * 0.88, this.game.height * 0.18, 'Description:', {
				font: "25px Arial",

				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});
			this.description.anchor.setTo(1, 0.5);
			
			// add all data
				this.nohands = this.game.add.text(this.game.width * 0.12, this.game.height * 0.3, 'No Hands!', {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.nohands.anchor.setTo(0, 0.5);
				this.destructin = this.game.add.text(this.game.width * 0.12, this.game.height * 0.5, 'Vehicular \nDestruction!',{
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.destructin.anchor.setTo(0, 0.5);
			    this.unharmed = this.game.add.text(this.game.width * 0.12, this.game.height * 0.7, 'Unharmed!', {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.unharmed.anchor.setTo(0, 0.5);
			this.readBoardData();
			// add all data
            for (var i = 0; i < arr.length; i++)
            {//arr[i][1]
                if (arr[i][0] === $('#Name').val()){

					if (arr[i][1] === 'nohands'){
						NOHANDS = true;
						handtime = arr[i][2];
					}
					if (arr[i][1] === 'destruction'){
						VEHICULARDESTRUCTION = true;
						desttime = arr[i][2];
					}
					if (arr[i][1] === 'unharmed'){
						UNHARMED = true;
						harmtime = arr[i][2];
					}
				}
			}
			
			var unharmed;
			var vehicular;
			var nohands;
			var nope = 'Not yet achieved';
			UNHARMED = VEHICULARDESTRUCTION = NOHANDS = true;
			if(UNHARMED)
				unharmed = 'You spared a \nvehicle\'s life';
			else
				unharmed = nope;

			if(VEHICULARDESTRUCTION)
				vehicular = 'You murdered a \nvehicle!';
			else
				vehicular = nope;

			if(NOHANDS)
				nohands = 'You didn\'t touch any \ntiles for a round';
			else
				nohands = nope;

			//console.log('read data' + arr.length);
			this.textval1 = this.game.add.text(this.game.width * 0.9, this.game.height * 0.7, unharmed + '\n' + harmtime, {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.textval1.anchor.setTo(1, 0.25);
			this.textval2 = this.game.add.text(this.game.width * 0.9, this.game.height * 0.5, vehicular+ '\n' + desttime, {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.textval2.anchor.setTo(1, 0.25);
			this.textval3 = this.game.add.text(this.game.width * 0.9, this.game.height * 0.3, nohands+ '\n' + handtime, {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.textval3.anchor.setTo(1, 0.25);
			arr = [];
		}
		
	},

	touchDown: function () {
		if (this.game.input.pointer1.isDown) {
			this.backButton.loadTexture('backDown');
		}
		this.backButton.loadTexture('backDown');
	},
	getData: function() {
			
	},
	
	foregroundF: function() {
		this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'foregroundScores');
		console.log("FG loaded");
	},	
	
	/*
	    This ajax method will set a GET request to server and receive back a JSON data.
	    Then it convert JSON data into JavaScript array. 
	*/
	readBoardData: function () {
		$.ajax({
			type: "GET",
			url: "getAchievements.php",
			data: "",
			dataType: 'json',
			success: function (data) {
				for (var i = 0; i < data.length; i++) {
					arr[i] = $.map(data[i], function (el) {
						return el;
					});
				}
				 //console.log(data);
				 //console.log(arr);
			},
			error: function (xhr, status, error) {
				// check status && error
				alert(xhr + "\n" + status + "\n" + error);
			},
		});
	},
	
	// Generate a random color code
	generateHexColor: function () {
		return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
	},//
	// Event for Back Button
	backClickEvent: function () {
		handtime = '';
		desttime = '';
		harmtime = '';
		arr = [];
		this.game.state.start('MainMenu');
	}
};