var TMT = TMT || {};
var level = -1;

TMT.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

TMT.game.state.add('Boot', TMT.Boot);
TMT.game.state.add('Preload', TMT.Preload);
TMT.game.state.add('MainMenu', TMT.MainMenu);
TMT.game.state.add('Game', TMT.Game);

//TMT.game.state.add('Level', TMT.Level);
//TMT.game.state.add('Generator', TMT.Generator);

TMT.game.state.start('Boot');