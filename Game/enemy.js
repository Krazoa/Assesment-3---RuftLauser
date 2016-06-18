var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var Enemy = function(x, y, rot)
{  
this.image = document.createElement("img");
this.velocity = new Vector2()
this.velocity.Set(0, 0)
this.width = 27
this.height = 31
this.rotation = rot
this.position = new Vector2()
this.position.Set(x, y)
this.image.src = "enemy.png";
}

    var bulletcooldown = 0.3
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
    
    var bulletspawntime = Math.floor(Math.random()*10)
    bulletcooldown -=deltaTime;
    bulletspawntime -=deltaTime;
    if(bulletcooldown <= 0)
    {
        if(bulletspawntime <= 0)
        {
            var b = new Bullet(this.position.x + 12.5, this.position.y, this.rotation + 180);
            bullets.push(b);
            bulletcooldown = 0.3
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
