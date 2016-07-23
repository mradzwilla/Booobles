var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload(){
  game.load.spritesheet('redBubble', 'assets/redBubble.png')
  game.load.spritesheet('yellowBubble', 'assets/yellowBubble.png')
  game.load.spritesheet('blueBubble', 'assets/blueBubble.png')
  game.load.spritesheet('greenBubble', 'assets/greenBubble.png')
  game.load.spritesheet('purpleBubble', 'assets/purpleBubble.png')
  game.load.spritesheet('orangeBubble', 'assets/orangeBubble.png')
  game.load.spritesheet('tealBubble', 'assets/tealBubble.png')
  game.load.image('menuScreen', 'assets/mainMenu.png')

  game.stage.backgroundColor = '#C8FDF8' 
  game.state.add("mainMenu", mainMenu)
  game.state.add("myGame", myGame)
  game.state.add("replayMenu", replayMenu)
  // game.state.start(mainMenu, "mainMenu")
}

function create(){
  game.state.start('mainMenu')
}

var myGame = {

  create: function(){
    game.stage.backgroundColor = '#C8FDF8' 
    circleCount = 1
    score = 0
    // score = 1240
    level = 1
    timeLeft = 5
    bubbles = game.add.group();
    currentColor = ''
    pickThisColor = ''
    currentColorDisplay = game.add.graphics(12.5,14)
    // currentColorDisplay.beginFill(0xFF3300);
    // currentColorDisplay.lineStyle(3, 0x000000, 1);
    // currentColorDisplay.drawRect(0, 0, 100, 100)

    timeDisplay = game.add.text(50,50, timeLeft)
    scoreDisplay = game.add.text(15, 130, 'Score: '+ score)

    greenBubble = {
      sprite: 'greenBubble',
      colorCode: '26d514'
    }

    purpleBubble = {
      sprite: 'purpleBubble',
      colorCode: 'bc12b6'
    }

    orangeBubble = {
      sprite: 'orangeBubble',
      colorCode: 'fbae34'
    }    

    tealBubble = {
      sprite: 'tealBubble',
      colorCode: '21d4c1'
    }
    existingBubbles = []
    //bubbleArray contains existing bubbles. Each object contains a sprite and the corresponding color
    //New objects can later be added to the array to increase difficulty
    
    bubbleArray = [
      { sprite: 'redBubble',
        colorCode: 'ff0000'
      },
      { sprite: 'yellowBubble',
        colorCode: 'ebf30a'
      },
      { sprite: 'blueBubble',
        colorCode: '186fe5'
      }
    ]

    function countdown(){
    	timeLeft -= 1
    	// console.log(timeLeft)
      updateTimeDisplay();
    	if (timeLeft == 0){
    		timer.destroy();
        game.state.start('mainMenu')
    	}
    }

    function updateTimeDisplay(){
      timeDisplay.destroy()
      timeDisplay = game.add.text(50,50, timeLeft)
    }

    function updateColor(){
      // currentColorDisplay.kill()
      if (bubbles.length >= 1){
        // var bubbleIdx = game.rnd.integerInRange(0, bubbles.length-1)
        var bubbleIdx = Math.floor(Math.random()*bubbles.length)
        // console.log("update Color" + bubbleIdx)
        var randBubble = bubbles.children[bubbleIdx]
        pickThisColor = randBubble.colorCode
        currentColorDisplay.beginFill("0x"+ randBubble.colorCode);
        currentColorDisplay.drawRect(0, 0, 100, 100)
     }
    }

    function updateScore(){
      scoreDisplay.destroy()
      scoreDisplay = game.add.text(15, 130, 'Score: ' + score)
    }

   	function drawCircles(circleCount){

   		for (i=0; i < circleCount; i++){


      var bubbleIdx = game.rnd.integerInRange(0, bubbleArray.length-1)

      var newBubble = bubbleArray[game.rnd.integerInRange(0, bubbleIdx)]

      var childImage = bubbles.create( game.rnd.integerInRange(50, 750),  game.rnd.integerInRange(50, 550), newBubble.sprite);
      childImage.colorCode = newBubble.colorCode
      childImage.scale.setTo(.5)
      childImage.anchor.setTo(0.5, 1);
      childImage.inputEnabled = true;
      childImage.input.useHandCursor = true;
      childImage.events.onInputDown.add(resetTimer, this);
      existingBubbles.push(childImage)

        if (i == 0){
          currentColorDisplay.beginFill("0x"+newBubble.colorCode);
          currentColorDisplay.drawRect(0, 0, 100, 100)
          pickThisColor = newBubble.colorCode
        }
   		}
   	}

   	drawCircles(circleCount)
    // Create a custom timer
    timer = game.time.create();
    
  	var firstTimer = game.time.events.loop(250, countdown, this)

    timer.start();

    function resetTimer(e){
      // console.log(bubbles.children)
      
      if (e.colorCode == pickThisColor){
        e.destroy()
        bubbles.remove(e)
        // timeLeft = 10
        updateTimeDisplay();
        updateScore();
        updateColor();

        if (score == 1240){
          bubbleArray = [
            { sprite: 'redBubble',
              colorCode: 'ff0000'
            },
            { sprite: 'yellowBubble',
              colorCode: 'ebf30a'
            },
            { sprite: 'blueBubble',
              colorCode: '186fe5'
            }
          ]
        }

        if (score >= 1240){
          timeLeft = 5
        } else {
          timeLeft = 10
          score += circleCount * 2

        }

        if (bubbles.length == 0){
            circleCount += 1

            if (circleCount == 3){
              bubbleArray.push(purpleBubble)
              bubbleArray.push(greenBubble)
            }

            if (circleCount == 11){
              bubbleArray.push(orangeBubble)
              bubbleArray.push(tealBubble)
            }

            drawCircles(circleCount)
        }
      } else {
        console.log("Wow you sux")
      }
  	}
}
}

var mainMenu = {
  create: function(){
    var image = game.add.sprite(0,0,'menuScreen')

    game.input.onDown.add(startNewGame, this);

    function startNewGame(){
      game.state.start('myGame');
    }

  }
}

var replayMenu = {

}
function update(){

}