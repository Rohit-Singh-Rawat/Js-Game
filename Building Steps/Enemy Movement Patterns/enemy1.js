// @type {HTMLCanvasElement}
const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');

const CANVAS_HEIGHT1 = canvas1.height = 600;
const CANVAS_WIDTH1 = canvas1.width = 320;

let numberOfEnemy1 = 50;
const arrayOfEnemy1 = [];
let gameFrame1 = 0;

class Enemy1{
    constructor(){
        this.image = new Image();
        this.image.src = 'img/enemy1.png'
        this.spriteHeight = 155;
        this.spriteWidth = 293; 
        this.height = this.spriteHeight / 3;
        this.width = this.spriteWidth / 3;
        // this.speed = Math.random() * 4 - 2;
        this.x = Math.random() * (CANVAS_WIDTH1 - this.width);
        this.y = Math.random() *( CANVAS_HEIGHT1 - this.height);
        this.frame = 0;
        this.flapspeed = Math.floor(Math.random() * 3 )+ 1
    }
    update(){
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 6 - 3;
        if(gameFrame1 % this.flapspeed == 0)  (this.frame > 4? this.frame = 0: this.frame++);
        
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth,0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height, );
        
    }

}
for (let i = 0; i < numberOfEnemy1; i++){
    arrayOfEnemy1.push(new Enemy1());
}

function animate1(){
    ctx.clearRect(0, 0, CANVAS_WIDTH1, CANVAS_HEIGHT1);
    arrayOfEnemy1.forEach((enemy) =>{
        enemy.update();
        enemy.draw();
    })
    gameFrame1++;
    requestAnimationFrame(animate1);
}
animate1();
