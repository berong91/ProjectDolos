var TMT = TMT || {};
//title screen
TMT.Achievements = function () {};

var arr = [];

TMT.Achievements.prototype = {
	preload: function () {},
	create: function () {
		var handtime = '';
		var desttime = '';
		var harmtime = '';
		
		// Set background and give background speed in x
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');


		// Add back button
		this.backButton = this.game.add.button(this.game.width / 2, this.game.height * 0.9, 'backUp', this.backClickEvent, this);
		this.backButton.events.onInputDown.add(this.touchDown, this);
		this.backButton.anchor.setTo(0.5, 0.8);
		this.backButton.scale.set(0.5, 0.5);
		
		if(3 > 0) {
		//if (arr.length > 0) {
			// Add text title: player and score
			this.game.add.text(this.game.width / 2 - 80, 64, 'Achievements', {
				font: "25px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 5
			});
			this.game.add.text(this.game.width / 2 - 200, 64 + 1 * 32, 'Name', {
				font: "25px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 5
			});
			this.game.add.text(this.game.width / 2, 64 + 1 * 32, 'Description', {
				font: "25px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});
			// add all data
				this.game.add.text(this.game.width / 2 - 200, this.game.height * 0.3, 'No Hands!', {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.game.add.text(this.game.width / 2 - 200, this.game.height * 0.5, 'Vehicular \nDestruction!',{
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
			this.game.add.text(this.game.width / 2 - 200, this.game.height * 0.7, 'Unharmed!', {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
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
			//UNHARMED = VEHICULARDESTRUCTION = NOHANDS = true;
			if(UNHARMED)
				unharmed = 'You spared a vehicle\'s life!';
			else
				unharmed = nope;
			
			if(VEHICULARDESTRUCTION)
				vehicular = 'You murdered a vehicle!';
			else
				vehicular = nope;
			
			if(NOHANDS)
				nohands = 'You didn\'t touch any \ntiles that round';
			else
				nohands = nope;
				
			this.game.add.text(this.game.width / 2, this.game.height * 0.3, unharmed + '\n' + harmtime, {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
			this.game.add.text(this.game.width / 2, this.game.height * 0.5, vehicular+ '\n' + desttime, {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
			this.game.add.text(this.game.width / 2, this.game.height * 0.7, nohands+ '\n' + handtime, {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
			arr = [];
		}
	},
	update: function () {
		/*
		    If arr array has data, then we draw text into the page.
		*/
		
	},

	touchDown: function () {
		if (this.game.input.pointer1.isDown) {
			this.backButton.loadTexture('backDown');
		}
		this.backButton.loadTexture('backDown');
	},
	getData: function() {
			
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
				// console.log(data);
				// console.log(arr);
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
		this.game.state.start('MainMenu');
	}
};