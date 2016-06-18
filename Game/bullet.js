var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var Bullet = function(x, y, rot)
{  
this.image = document.createElement("img");
this.width = 5
this.height = 5
this.position = new Vector2()
this.position.Set(x, y)
this.rotation = rot
this.image.src = "bullet.png";
}
Bullet.prototype.update = function(deltaTime)
{
    this.position.y -= 3.6
    
    // if(this.position.y > SCREEN_HEIGHT || this.position.x > SCREEN_WIDTH || this.position.x < 0 || this.position.y < -100)
    // {
    //     for(var j=0; j<bullets.length; j++)
    //     {
    //         bullets.splice(j, 1);
    //     }
    // }
}
Bullet.prototype.draw = function()
{
    context.save();
    context.rotate(this.rotation)
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}
