// @type {HTMLCanvasElement}
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

const CANVAS_HEIGHT2 = canvas2.height = 600;
const CANVAS_WIDTH2 = canvas2.width = 320;

const numberOfEnemy2 = 70;
const arrayOfEnemy2 = []
let gameFrame2 = 0;

class Enemy2{
    constructor(){
        this.image = new Image();
        this.image.src = 'img/enemy2.png'
        this.spriteHeight = 188;
        this.spriteWidth = 266; 
        this.height = this.spriteHeight / 4;
        this.width = this.spriteWidth / 4;
        this.speed = Math.random() * 4 + 1;
        this.x = Math.random() * (CANVAS_WIDTH2 - this.width);
        this.y = Math.random() *( CANVAS_HEIGHT2 - this.height);
        this.frame = 0;
        this.angle = Math.random() * 2;
        this.anglespeed = Math.random() * 0.2;
        this.flapspeed = Math.floor(Math.random() * 3 )+ 1;
        this.curve = Math.random() * 7;
    }
    update(){
        (this.x + this.width) < 0 ? this.x = CANVAS_WIDTH2: this.x -=this.speed;
        ;
        this.y += this.curve * Math.sin(this.angle) ;
        this.angle += this.anglespeed; 
        // this.y += Math.random() * 6 - 3;
        if(gameFrame2 % this.flapspeed == 0)  (this.frame > 4? this.frame = 0: this.frame++);
        
    }
    draw(){
        ctx2.drawImage(this.image, this.frame * this.spriteWidth,0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height, );
        
    }

}
for (let i = 0; i < numberOfEnemy2; i++){
    arrayOfEnemy2.push(new Enemy2());
}

function animate2(){
    ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
    arrayOfEnemy2.forEach((enemy) =>{
        enemy.update();
        enemy.draw();
    })
    gameFrame2++;
    requestAnimationFrame(animate2);
}
animate2();
