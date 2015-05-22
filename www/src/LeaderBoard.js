var TMT = TMT || {};
//title screen
TMT.LeaderBoard = function () {};

var arr = [];

TMT.LeaderBoard.prototype = {
	preload: function () {},
	create: function () {
		// Set background and give background speed in x
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'peaks');
		this.foregroundF();

		// Read leadere board data and put it in array arr
		this.readBoardData();

		// Add back button
		this.backButton = this.game.add.button(this.game.width / 2, this.game.height * 0.9, 'backUp', this.backClickEvent, this);
		this.backButton.events.onInputDown.add(this.touchDown, this);
		this.backButton.anchor.setTo(0.5, 0.8);
		this.backButton.scale.set(0.5, 0.5);
	},
	update: function () {
		/*
		    If arr array has data, then we draw text into the page.
		*/
		if (arr.length > 0) {
			// Add text title: player and score
			this.top10 = this.game.add.text(this.game.width / 2, this.game.height * 0.1, 'Top 10', {
				font: "25px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 5
			});
			this.top10.anchor.setTo(0.5, 0.5);
			this.player = this.game.add.text(this.game.width * 0.2, this.game.height * 0.1, 'Player', {
				font: "25px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 5
			});
			this.player.anchor.setTo(0.5, 0.5);
			this.score = this.game.add.text(this.game.width * 0.8, this.game.height * 0.1, 'Score', {
				font: "25px Arial",
				fill: this.generateHexColor(),
				stroke: '#000000',
				strokeThickness: 4
			});
			this.score.anchor.setTo(0.5, 0.5);


			this.textGroup = this.game.add.group();
			// add all data
			for (var i = 0; i < arr.length; i++) {
				this.names = this.game.add.text(this.game.width * 0.03, 64 + i * 32, arr[i][0], {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.names.anchor.setTo(0, 0.5);
				this.scores = this.game.add.text(this.game.width * 0.8, 64 + i * 32, arr[i][1], {
					font: "20px Arial",
					fill: this.generateHexColor(),
					stroke: '#000000',
					strokeThickness: 4
				});
				this.scores.anchor.setTo(0, 0.5);
				this.textGroup.add(this.names, false);
				this.textGroup.add(this.scores, false);
			}
			this.textGroup.y = this.game.world.height * 0.1;
			this.textGroup.x = this.game.width * 0.08;
			arr = [];
		}
	},

	foregroundF: function () {
		this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'foregroundScores');
		console.log("FG loaded");
	},
	touchDown: function () {
		if (this.game.input.pointer1.isDown) {
			this.backButton.loadTexture('backDown');
		}
		this.backButton.loadTexture('backDown');
	},
	/*
	    This ajax method will set a GET request to server and receive back a JSON data.
	    Then it convert JSON data into JavaScript array. 
	*/
	readBoardData: function () {
		$.ajax({
			type: "GET",
			url: "test.php",
			data: "",
			dataType: 'json',
			success: function (data) {
				for (i = 0; i < data.length; i++) {
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
	},
	// Event for Back Button
	backClickEvent: function () {
		this.game.state.start('MainMenu');
	}
};