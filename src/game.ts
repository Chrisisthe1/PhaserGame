/*class SimpleGame
{
	game:Phaser.Game;
	
	constructor()
	{
		// create our phaser game
		// 800 - width
		// 600 - height
		// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
		// 'content' - the name of the container to add our game to
		// { preload:this.preload, create:this.create} - functions to call for our states
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, 'content', { preload:this.preload, create:this.create} );
	}
	
	preload()
	{
		// add our logo image to the assets class under the
		// key 'logo'. We're also setting the background colour
		// so it's the same as the background colour in the image
		this.game.load.crossOrigin = "Anonymous";
		this.game.load.image( 'logo', "assets/test/test.png" );
		this.game.stage.backgroundColor = 0xB20059;
	}
	
	create()
	{
		// add the 'logo' sprite to the game, position it in the
		// center of the screen, and set the anchor to the center of
		// the image so it's centered properly. There's a lot of
		// centering in that last sentence
		var logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
		logo.anchor.setTo( 0.5, 0.5 );
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new SimpleGame();
}*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { 
	preload: preload, 
	create: create, 
	update: update });

function preload() {

    game.load.image('arrow', 'assets/sprites/arrow.png');
    game.load.image('bullet', 'assets/sprites/purple_ball.png');
	game.load.image('ufo', 'assets/sprites/ufo.png');
	
    
}

var sprite = {
	startX: gameProperties.screenWidth * 0.5,
	startY: gameProperties.screenHeight * 0.5,
};

var bullets;
var ufos;

var fireRate = 100;
var nextFire = 0;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#313131';

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.set(0.5);
	
	ufos = game.add.sprite(400,100, 'ufo');
	
	//ufos.scale = 10;

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;

}

function update() {

    sprite.rotation = game.physics.arcade.angleToPointer(sprite);

    if (game.input.activePointer.isDown)
    {
        fire();
    }

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}