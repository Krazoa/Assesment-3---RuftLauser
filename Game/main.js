var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var player = new Player();
var keyboard = new Keyboard();


var player = new Player();
var splash = new Splash();
var HpHud = new HpHud();
var ScoreHud = new ScoreHud();
var TitleCloud = new TitleCloud(SCREEN_WIDTH/2 - 260, SCREEN_HEIGHT/2 - 110);
// var Background = new Background();
var lifeIcon = new lifeIcon();
var keyboard = new Keyboard();

//======================================================================================================================================================
//Calculations====================================================================================================================================================
//======================================================================================================================================================

function bound(value, min, max)
{
    if(value < min)
        return min;
    if(value > max)
        return max;
    return value;
};

function cellAtPixelCoord(layer, x,y)
{
    if(x<0 || x>SCREEN_WIDTH || y<0)
        return 1;
        //let the player drop
    else if(y>SCREEN_HEIGHT)
        return 0;
    return cellAtTileCoord(layer, p2t(x), p2t(y));
};

function cellAtTileCoord(layer, tx, ty)
{
    if(tx<0 || tx>=MAP.tw || ty<0)
        return 1;
        //let the player drop
    else if(ty>=MAP.th)
        return 0;
    return cells[layer][ty][tx];
};

function tileToPixle(tile)
{
    return tile * TILE;
};

function pixleToTile(pixle)
{
    return Math.floor(pixle/TILE);
};
//======================================================================================================================================================
//GameStates======================================================================================================================================================
//======================================================================================================================================================

function runGamesplash(deltaTime)
{
    Splash_timer -=deltaTime
    
    //Setting name
    context.fillStyle = "#000000";
    context.font= "12px Agency FB";
    context.fillText("Group 7 (Jordan and Michele)", 2, SCREEN_HEIGHT - 2)
    
    context.fillStyle = "#0000000";
    context.font = "60px Agency FB";
    context.fillText("Group 7", SCREEN_WIDTH/2 - 190, SCREEN_HEIGHT/2)
    
    if(Splash_timer <= 0)
    {
        Gamestate = Gamestate_reset;
    }
}
// var test_timer = 10
function runGameplay(deltaTime)
{
//   test_timer -=deltaTime;

    if(enemies.length > 1)
    {
        for(var i=0; i<enemies.length; i++)
        {
            enemies[i].update(deltaTime,i);
            if (enemies[i].position.y > SCREEN_HEIGHT || enemies[i].position.x > SCREEN_WIDTH || enemies[i].position.x < 0 || enemies[i].position.y < -100) 
            {
                enemies.splice(i, i);
            }
            enemies[i].draw();
        }
    }
    
    
    if(bullets.length > 1)
    {
        for(var i=0; i<bullets.length; i++)
        {
            bullets[i].update(deltaTime);
            bullets[i].draw();
        }
    }
    //cloud intentional to let enemies hide behind it and hit the player unsuspectingly.
    if(clouds.length > 1)
    {
        for(var i=0; i<clouds.length; i++)
        {
            clouds[i].update(deltaTime);
            clouds[i].draw();
        }
    }
    
    addClouds(deltaTime)
    player.update(deltaTime);
    player.draw();
    HpHud.draw();
    ScoreHud.draw();
    DrawScore();
    lifeIcon.update(deltaTime);
    lifeIcon.draw();
    addEnemies(deltaTime);
    RunBulletChecks(deltaTime);
    HUDTimer(deltaTime, GameTimer)
  
    if(keyboard.isKeyDown(keyboard.KEY_S) == true)
    {
        //(vain) attempt to get explosion sprites working
        var g = new Explosion(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
        explosions.push(g);
    }
    console.log(lives)
    //debug kill player
    if(keyboard.isKeyDown(keyboard.KEY_SHIFT) == true)
    {
        player.isDead = true
    }
    
    if(player.isDead == true)
    {
        if(lives == 1)
        {
            Gamestate = Gamestate_over;
        }
        else
        {
            Gamestate = Gamestate_death;
        }
    }
    
    if(score == 2000 && player.isdead == false)
    {
        Gamestate = Gamestate_win;
    }
  
//   context.fillStyle = "#ffffff";
//   context.font= "12px Arial";
//   context.fillText("Test ends in: " + test_timer, 2, SCREEN_HEIGHT - 2)
//   if(test_timer <= 0)
//   {
//       Gamestate = Gamestate_win;
//   }
}

function runGamevalreset(deltaTime)
{
   reset_timer = 3;
   Gamestate = Gamestate_play
   GameTimer = 0;
   bullets.splice(0, bullets.length);
   enemies.splice(0, enemies.length);
   player.isDead = false
   player.position.x = SCREEN_WIDTH / 2
   player.position.y = 415
   
   //Testing variables reset
//    test_timer = 10;
}
function runGamedeath(deltaTime)
{
    
    addClouds(deltaTime)
    
        if(clouds.length > 1)
    {
        for(var i=0; i<clouds.length; i++)
        {
            clouds[i].update(deltaTime);
            clouds[i].draw();
        }
    }
    
    context.fillStyle = "#000000";
    context.font = "24px Arial";
    context.fillText("Press R to respawn.", 100, SCREEN_HEIGHT/2 + 50)
    if(keyboard.isKeyDown(keyboard.KEY_R) == true)
    {
        lives -= 1
        Gamestate = Gamestate_resetvalues;
    }
}

function runGameWin(deltaTime)
{
    context.fillStyle = "#000000";
    context.font = "24px Arial";
    context.fillText("Press R to go back to restart.", 100, SCREEN_HEIGHT/2 + 50)
    if(keyboard.isKeyDown(keyboard.KEY_R) == true)
    {
        Gamestate = Gamestate_reset;
    }
}

function runGameover(deltaTime)
{

    context.fillStyle = "#000000";
    context.font = "24px Agency FB";
    context.fillText("GAME OVER: R to go back to the start screen.", 100, SCREEN_HEIGHT/2 + 50)
    if(keyboard.isKeyDown(keyboard.KEY_R) == true)
    {
        Gamestate = Gamestate_reset;
    }
}
function runGamereset(deltaTime)
{
    
    context.fillStyle = "#000000";
    context.font = "25px Agency FB";
    context.fillText("To Begin:", SCREEN_WIDTH/2 - 80, SCREEN_WIDTH/2)
   
    TitleCloud.draw();
    
        context.fillStyle = "#0000000";
    context.font = "60px Agency FB";
    context.fillText("RuftLauser", SCREEN_WIDTH/2 - 170, SCREEN_HEIGHT/2)
    
    context.fillStyle = "#000000";
    context.font = "25px Agency FB";
    context.fillText("Press 'ENTER'", SCREEN_WIDTH/2 - 100, SCREEN_WIDTH/2 + 30)
    
    if(keyboard.isKeyDown(keyboard.KEY_ENTER) == true)
    {
        Enterstate = true;
    }
    if(Enterstate == true)
    {
        
        lives = 3;
        
        //this is a long and unresonably complex way of doing a single int counter
        //as rounding to 1 will fix the counter at the single intiger and cause it to freeze
        var RoundReset_timer = 3;
        
        reset_timer -= deltaTime
        // console.log(reset_timer)
        
        if(reset_timer < 3 && reset_timer > 2)
        {
            RoundReset_timer = 3;
        }
        if(reset_timer < 2 && reset_timer > 1)
        {
            RoundReset_timer = 2;
        }
        if(reset_timer < 1 && reset_timer > 0)
        {
            RoundReset_timer = 1;
        }
        if(reset_timer <= 0)
        {
            RoundReset_timer = 0;
        }
        
        context.fillStyle = "#000000";
        context.font = "24px Agency FB";
        context.fillText("Game starts " + RoundReset_timer + " seconds", SCREEN_WIDTH/2 - 130, SCREEN_WIDTH/2 + 50)
    }
    if(RoundReset_timer <= 0)
    {
        Gamestate = Gamestate_play;
        Enterstate = 0;
    }
}
//======================================================================================================================================================
//Other Fuctions==================================================================================================================================================
//======================================================================================================================================================

function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
{
	if (y2 + h2 < y1 ||x2 + w2 < x1 || x2 > x1 + w1 || y2 > y1 + h1)
	{
		return false;
	}
	return true;
}

function RunBulletChecks(deltaTime)
{
    
    if (bullets.length > 1) 
    {
    var hit = false;
    for(var i=0; i<bullets.length; i++)
    {
        bullets[i].update(deltaTime);
        if(bullets[i].position.x < 0 || bullets[i].position.s > SCREEN_WIDTH)
        {
            hit = true;
        }
        
        
        for(var j=0; j<enemies.length; j++)
        {
            if(intersects(bullets[i].position.x, bullets[i].position.y, bullets[i].width, bullets[i].height, enemies[j].position.x, enemies[j].position.y, enemies[j].width, enemies[j].height) == true)
            {
                //remove the enemy
                enemies.splice(j, 1);
                hit = true;
                //add kill to score/kill counter
                score += 100;
                // var itemdrop = Math.floor(Math.random()*4)
                // if(itemdrop == 1)
                // {
                //     var itemtype = Math.floor(Math.random()*2)
                //     if(itemtype == 1)
                //     {
                //         var i = new Item(x, y);
                //         items.push(c);
                //         Item.speedupPlayer()
                //     }
                // }
                break;
            }
        }
        if(hit == true)
        {
            //remove the colliding bullet
            bullets.splice(i, 1);
            break;
        }
        if(bullets[i].x > SCREEN_WIDTH)
        {
            bullet.splice(i, 1);
        }
        
        if(intersects(bullets[i].position.x, bullets[i].position.y, bullets[i].width, bullets[i].height, player.position.x, player.position.y, player.width, player.height) == true)
        {
            //remove the enemy
            hit = true;
            player.isDead = true
            break;
        }
        
    }   
    }
}

function initialize()
{
    // musicBackground = new Howl({
    //         urls: ["background.ogg"],
    //         loop: true,
    //         buffer: true,
    //         volume: 0.05
    //     });
        
    // sfxFire = new Howl({
    //    urls: ["fireEffect.ogg"],
    //    buffer: true,
    //    volume: 1,
    //    onend: function()
    //         {
    //             isSfxPlaying = false;
    //         }
    // });
    
    // sfxPlayerDie = new Howl({
    //     urls: ["death.ogg"],
    //     buffer: true,
    //     volume: 1, 
    // });
    
    // // if(Gamestate == 1)
    // // {
    //     musicBackground.play();
    // // }
}

function addEnemies(deltaTime)
{
    //adding enemies
    var spawnTime = Math.floor(Math.random() * 30)
    spawnTime -= deltaTime;
    if(spawnTime <= 0)
    {
        // console.log("enemy spawned")
        var x = Math.floor(Math.random() * (0 + SCREEN_WIDTH))
        var y = -40
        var rot = Math.floor(Math.random() * 10)
        var e = new Enemy(x, y, rot);
        enemies.push(e);
    }
}
function addClouds(deltaTime)
{
    var cloudspawnTime = Math.floor(Math.random()*43)
    cloudspawnTime -=deltaTime;
    if(cloudspawnTime <= 0)
    {
        var x = Math.floor(Math.random() * (0 + SCREEN_WIDTH))
        var y = -200
        var c = new Cloud(x, y, 180);
        clouds.push(c);
    }
}

function run()
{
	context.fillStyle = "#4CA6FF";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();

	// // update the frame counter 
	// fpsTime += deltaTime;
	// fpsCount++;
	// if(fpsTime >= 1)
	// {
	// 	fpsTime -= 1;
	// 	fps = fpsCount;
	// 	fpsCount = 0;
	// }		
		
	// // draw the FPS
	// context.fillStyle = "#ffffff";
	// context.font="14px Arial";
	// context.fillText("FPS: " + fps, 5, 20, 100);
    
    // Game State Manager
    switch(Gamestate)
    {
        case Gamestate_splash:
            runGamesplash(deltaTime);
            break;
        case Gamestate_play:
            runGameplay(deltaTime);
            break;
        case Gamestate_over:
            runGameover(deltaTime);
            break;
        case Gamestate_reset:
            runGamereset(deltaTime);
            break;
        case Gamestate_resetvalues:
            runGamevalreset(deltaTime);
            break;
        case Gamestate_win:
            runGameWin(deltaTime);
            break;
        case Gamestate_death:
            runGamedeath(deltaTime);
            break;
    }  
}


initialize();

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
