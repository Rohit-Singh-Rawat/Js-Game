class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.maxFrame = 5;
    }
    update(deltatime) {
        this.x -= this.vx * deltatime;
        if (this.x < -this.width) {
            this.markedForDeletion = true;
        }
        this.frameTimer += deltatime;
        if (this.frameTimer > this.frameInterval) {
            ++this.frameX;
            if(this.frameX > this.maxFrame) this.frameX = 0
            this.frameTimer = 0;
        }
    }
    draw(ctx) {
        if (this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image,this.frameX * this.spriteWidth , this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);      
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.image = document.getElementById("fly");
        this.spriteHeight = 44;
        this.spriteWidth = 60;
        this.width = this.spriteWidth * 1;
        this.height = this.spriteHeight * 1;
        this.x = this.game.width  + Math.random() * this.game.width  ;
        this.y =   Math.random() * 0.4 * this.game.height;
        this.vx = Math.random() * 0.15 + 0.1;
        this.angle = 0;
        this.curve = Math.random() * 0.2;

    }
    update(deltatime){
        super.update(deltatime);
        this.y += Math.sin(this.angle) * this.curve * deltatime;
        this.angle += 0.03;
    }
    draw(ctx) {
        super.draw(ctx);


    }

} 
export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.image = document.getElementById("groundzombie");
        this.spriteHeight = 90;
        this.spriteWidth = 120.125;
        this.width = this.spriteWidth * 0.8;
        this.height = this.spriteHeight * 0.8;
        this.x = this.game.width  + Math.random() * this.game.width  ;
        this.y =   this.game.height - this.height -this.game.groundMargin;
        this.vx = this.game.speed;


    }
    update(deltatime){
        super.update(deltatime);
        this.vx = this.game.speed/deltatime;
    }
    draw(ctx) {
        super.draw(ctx);


    }

} 
export class JumpingEnemy extends Enemy{
    constructor(game) {
        super();
        this.game = game;
        this.image = document.getElementById("zombie");
        this.spriteHeight = 410;
        this.spriteWidth = 292;
        this.width = this.spriteWidth * 0.3;
        this.height = this.spriteHeight * 0.3;
        this.x = this.game.width  + 0.2* this.game.width  ;
        this.y =  Math.random( ) * (this.game.height - this.height -this.game.groundMargin -20) + 20;
        this.vx = Math.random() * 0.15 + 0.15;
        this.weight = 0.1;
        this.vy = 0;
        this.jumpspeed = (this.game.height - this.height -this.game.groundMargin) /(this.y + 20);


    }
    update(deltatime){
        super.update(deltatime);
        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.weight;
            this.x -= this.jumpspeed
        }
        else this.vy = 0;
        if (this.onGround()) this.y = this.game.height - this.height - this.game.groundMargin; 
    }
    draw(ctx) {
        super.draw(ctx);


    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
}   