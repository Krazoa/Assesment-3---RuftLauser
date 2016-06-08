var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

// PosX = X position of a killed enemy 
// PosY = Y position of a killed enemy

var Item = function(PosX, PosY)
{
    this.position = new Vector2();
    this.position.Set(PosX, PoxY);
    this.velocity = new Vector2();
    this.velocity = (0, 0);
    this.deployed = false; //this is to be set to true when the enemy is killed
    this.timer = 30
}
Item.prototype.update = function(deltaTime)
{
    this.position.y -= 1;
    if(this.position.y > SCREEN_HEIGHT)
    {
        //splice item from array
    }

    //Checking Intersection between player or enemy.
    //if timer is less than 0
        //if player or enemy intersects
                //call item attackup
            //if player intersects item
                //call item speed up player
            //if enemy intersects item
                //call item speed up enemy

//spawn code for the item
//code for the main.js
//when enemy is spliced
    //call item drop

//code for the enemy.js
//when enemy drop is called
//get a random number between 0 and 4
//if number is 5
    //get a random number between 0 and 1
    //if number is 1
        //call attackup
    //if number is 2
        //call speedup
}
Item.prototype.draw = function()
{
    context.save();
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}
Item.prototype.attackup = function()
{
    bullet_dmg *= 2
}
Item.prototype.speedupPlayer = function()
{
    //increase speed
}
item.prototype.speedupEnemy = function()
{
    
}