export class CollsionAnimation{
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById("boom")
        this.spriteHeight = 90;
        this.spriteWidth = 100;
        this.frameX = 0;
        this.maxFrame = 4;
        this.frameTimer = 0;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x ;
        this.y = y ;
        this.markedForDeletion = false;
        this.angle = Math.random() * 6.2;
    }
    update(deltatime){
        if (this.frameTimer >= this.frameInterval){
            this.frameTimer = 0;
            ++this.frameX;
        }
        else this.frameTimer += deltatime;
        if (this.frameX > this.maxFrame) this.markedForDeletion = true
    } 
    draw(ctx){
        ctx.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x , this.y , this.width, this.height);

    }
}