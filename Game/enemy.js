var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var Enemy = function(x, y, rot)
{  
this.image = document.createElement("img");
this.velocity = new Vector2()
this.velocity.Set(0, 0)
this.width
this.rotation = rot
this.position = new Vector2()
this.position.Set(x, y)
this.image.src = "enemy.png";
}
Enemy.prototype.update = function(deltaTime)
{
    this.position.y += 2
    
    if(this.position.y > SCREEN_HEIGHT || this.position.x > SCREEN_WIDTH || this.position.x < 0 || this.position.y < -100)
    {
        for(var j=0; j<enemies.length; j++)
        {
            enemies.splice(j, 1);
        }
    }
}
Enemy.prototype.draw = function()
{
    context.save();
    context.rotate(this.rotation)
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}
