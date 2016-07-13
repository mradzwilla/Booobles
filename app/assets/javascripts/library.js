var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload(){

}

function create(){


    var graphics = game.add.graphics(0, 0);
    var secondsLeft = 5
    var timeDisplay = game.add.text(50,50, secondsLeft)

    function countdown(){
    	secondsLeft -= 1
    	console.log(secondsLeft)
    	if (secondsLeft == 0){
    		game.time.events.stop();
    		console.log('stop timer')
    	}
    }
    // graphics.lineStyle(2, 0xffd900, 1);
	// 0xFF700B

	graphics.beginFill(0xFF0033, 1);
    var circle = graphics.drawCircle(game.world.centerX, game.world.centerY, 500);
   	circle.events.onInputDown.add(listener, this);

    //drawCircle(x,y,diameter)
    circle.anchor.set(0.5)
    circle.inputEnabled = true
    // Create a custom timer
    timer = game.time.create();
    
    // Create a delayed event 1m and 30s from now
	game.time.events.loop(1000, countdown, this)

    // Start the timer
    timer.start();

    function resetTimer(){
	secondsLeft = 7
	}
}

function update(){

}