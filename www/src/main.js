var TMT = TMT || {};
var level = -1;

TMT.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

/* 
    Load all game state into TMT variable.
*/
TMT.game.state.add('Boot', TMT.Boot);
TMT.game.state.add('Preload', TMT.Preload);
TMT.game.state.add('MainMenu', TMT.MainMenu);
TMT.game.state.add('LevelSelect', TMT.LevelSelect);
TMT.game.state.add('LeaderBoard', TMT.LeaderBoard);
TMT.game.state.add('Game', TMT.Game);
TMT.game.state.add('WinScreen', TMT.WinScreen);

//TMT.game.state.add('Generator', TMT.Generator);

// We start our game with Boot state
TMT.game.state.start('Boot');