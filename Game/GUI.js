var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

function DrawScore()
{
    // displaying the score on HUD
    context.fillStyle = "#ffffff";
    context.font="24px Arial";
    var scoreText = "Score: " + score;
    context.fillText(scoreText, 90, 60);
    
}

// function DrawHPCounter()
// {
//     //displaying health bar on HUD
//     context.fillStyle = "#ff0000"
//     context.fillRect(30, 40, player_hp, 30);
// }

var HpHud = function()
{
    this.image = document.createElement("img");
    this.image.src = "HUD.png";
    this.position = new Vector2();
    this.position.Set(7, 34);
}
HpHud.prototype.draw = function()
{
    context.save();
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}
var ScoreHud = function()
{
    this.image = document.createElement("img");
    this.image.src = "HUDScore.png";
    this.position = new Vector2();
    this.position.Set(SCREEN_WIDTH - 380, 34);
}
ScoreHud.prototype.draw = function()
{
    context.save();
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}

var Background = function()
{
    this.image = document.createElement("img");
    this.image.src = "background.png"; 
    this.position = new Vector2();
    this.position.Set(0, 0);
}
Background.prototype.draw = function()
{
    context.save();
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}

var MGameTimer = 0;
function HUDTimer(deltaTime)
{
    
    GameTimer = GameTimer + deltaTime
    // console.log(GameTimer)
    // console.log(deltaTime)
 
    GameTimer.toFixed(2)
    
    if(GameTimer > 60)
    {
        GameTimer = 0
        MGameTimer += 1
    }
    
    
    context.fillStyle = "#ffffff";
    context.font="25px Arial";
    var scoreText = "Time - " + MGameTimer + ":" + GameTimer;
    context.fillText(scoreText, 470, 70);
}


var lifeIcon = function()
{
    this.image = document.createElement("img");
    this.image.src = "life.png";
    this.iconXoffset = 0;
    this.iconYoffset = 0;
    this.iconXrepeating = 30;
    this.iconSizeX = 30;
    this.iconSizeY = 30;
}
lifeIcon.prototype.update = function(deltaTime)
{
    for(var i=0; i < lives; i++)
    {
        context.drawImage(this.image, 70 + (50 * i), 78);
        if(player.isAlive == false)
        {
           life.splice(i, 1);
        }
    }
}
lifeIcon.prototype.draw = function()
{
    
}