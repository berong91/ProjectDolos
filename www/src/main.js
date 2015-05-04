var SpaceHipster = SpaceHipster || {};

SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

SpaceHipster.game.state.add('Boot', SpaceHipster.Boot);
SpaceHipster.game.state.add('Preload', SpaceHipster.Preload);
SpaceHipster.game.state.add('MainMenu', SpaceHipster.MainMenu);
SpaceHipster.game.state.add('Game', SpaceHipster.Game);
//paceHipster.game.state.add('Level', SpaceHipster.Level);
//SpaceHipster.game.state.add('Generator', SpaceHipster.Generator);

SpaceHipster.game.state.start('Boot');