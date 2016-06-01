var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var Player = function()
{  
this.image = document.createElement("img");
this.position = new Vector2();
this.position.Set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2) 
this.velocity = new Vector2();
this.velocity.x = 0;
// this.width = 34;
// this.height = 22;
this.velocity.y = 0;
this.directionX = 0;
this.directionY = 0;
this.angularDirection = 0;
this.rotation = 0; 
this.speed = 0;
this.image.src = "ship.png";
}

Player.prototype.draw = function() 
{  
context.save();
context.translate(this.position.x, this.position.y)
context.rotate(this.rotation);
context.drawImage(this.image, this.position.x, this.position.y); 
context.restore();
} 

Player.prototype.update = function(deltaTime)
{
    // this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
    // this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
    // this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
    // this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
    
    var s = Math.sin(this.rotation);
	var c = Math.cos(this.rotation);
    
    console.log(this.position)
    console.log(this.rotation)
    
    var xDir = (this.velocity.x * c) - (this.velocity.y * s);
	var yDir = (this.velocity.x * s) + (this.velocity.y * c);
    var VelX = xDir * this.speed;
    var VelY = yDir * this.speed;
    
    this.position.x += VelX * deltaTime;
    this.position.y += VelY * deltaTime;
    
    this.rotation += this.angularDirection * 2;
    
    
    
    if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
    {
        this.directionY = 4;
    }
    // if(keyboard.isKeyDown(Keyboard.KEY_UP) == false)
    // {

    // }
    
    if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
    {
        this.angularDirection = -1;
    }
    else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
    {
        this.angularDirection = 1;
    }
    else
    {
        this.angularDirection = 0;
    }
}