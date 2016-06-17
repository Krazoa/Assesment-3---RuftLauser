var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var Splash = function()
{
    this.image = document.createElement("img");
    this.image.src = "SplashBase.png";//Change splash
    this.position = new Vector2();
    this.position.Set(0, 0);
}
Splash.prototype.draw = function()
{
    context.save();
        context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
}