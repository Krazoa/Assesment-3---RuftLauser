var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var Player = function()
{  
    this.image = document.createElement("img");
    this.position = new Vector2();
    this.position.Set(SCREEN_WIDTH / 2, 415)
    this.velocity = new Vector2();
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.width = 34;
    this.height = 22;
    // this.offset = new Vector2();
    // this.offset.Set(-55,-87);
    this.speed = 0;
    this.image.src = "ship.png";
    this.isDead = false;
}

Player.prototype.draw = function() 
{  
    context.save();
    context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
} 

var cooldown = 0.5
Player.prototype.update = function(deltaTime)
{
    if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
    {
        this.position.y -= 2
    }
    else if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)
    {
        this.position.y += 2
    }
    
    if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
    {
        this.position.x -= 2.6
    }
    else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
    {
        this.position.x += 2.6
    }
    
    cooldown -= deltaTime
    
    if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
    {
        if(cooldown <= 0)
        {
            // console.log(bullets.length)
            var b = new Bullet(this.position.x + 12.5, this.position.y - 3, 0);
            bullets.push(b);
            cooldown = 0.5
        }
    }
    
    // if(this.position.x > SCREEN_WIDTH)
    // {
    //     this.position.x = SCREEN_WIDTH + 3
    // }
    // if(this.position.x < SCREEN_WIDTH )
    // {
    //     this.position.x = SCREEN_WIDTH - 3
    // }
    // if(this.position.y > SCREEN_HEIGHT)
    // {
    //     this.position.y = SCREEN_HEIGHT + 3
    // }
    // if(this.position.y < SCREEN_HEIGHT)
    // {
    //     this.position.y = SCREEN_HEIGHT - 3
    // }
}