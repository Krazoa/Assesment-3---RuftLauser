var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var Explosion = function(x, y)
{
    this.sprite = new Sprite("explosion.png");
    
    this.sprite.buildAnimation(1, 5, 30, 30, 0.2, [0, 1, 2, 3, 4])
    this.position = new Vector2()
    this.position.Set(x, y)
    
    this.end = false
    
    console.log("explosion created")
}
Explosion.prototype.update = function(deltaTime)
{
    
    
    if(this.end == true)
    {
        explosions[i].push(i, 1);
    }
}

var Cloud = function(x, y)
{  
this.image = document.createElement("img");
this.velocity = new Vector2()
this.velocity.Set(0, 0)
this.position = new Vector2()
this.position.Set(x, y)
this.image.src = "cloud.png";
}
Cloud.prototype.update = function(deltaTime)
{
    this.position.y += 1
    
    if(this.position.y > SCREEN_HEIGHT || this.position.x > SCREEN_WIDTH || this.position.x < 0 || this.position.y < -250)
    {
        for(var j=0; j<clouds.length; j++)
        {
            clouds.splice(j, 1);
        }
    }
}
Cloud.prototype.draw = function()
{
    context.save();
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}

var TitleCloud = function(x, y)
{
    this.image = document.createElement("img");
    this.position = new Vector2()
    this.position.Set(x, y)
    this.image.src = "TitleCloud.png";
}
TitleCloud.prototype.draw = function()
{
    context.save();
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}