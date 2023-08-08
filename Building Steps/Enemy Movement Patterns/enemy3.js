// @type {HTMLCanvasElement}
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

const CANVAS_HEIGHT3= canvas3.height = 600;
const CANVAS_WIDTH3 = canvas3.width = 320;

const numberOfEnemy3 = 80;
const arrayOfEnemy3 = []
let gameFrame3 = 0;

class Enemy3{
    constructor(){
        this.image = new Image();
        this.image.src = 'img/enemy3.png'
      
        this.spriteHeight = 177;
        this.spriteWidth = 218; 
        this.height = this.spriteHeight / 4;
        this.width = this.spriteWidth / 4;
        this.speed = Math.random() * 4 + 1;
        this.x = Math.random() * (CANVAS_WIDTH2 - this.width);
        this.y = Math.random() *( CANVAS_HEIGHT2 - this.height);
        this.frame = 0;
        this.angle = 0;
        this.anglespeed = Math.random() * 5;
        this.flapspeed = Math.floor(Math.random() * 3 )+ 1;
        // this.curve = Math.random() * 100;
    }
    update(){
        
        
        // (this.x + this.width) < 0 ? this.x = CANVAS_WIDTH2: this.x -=this.speed;
        // ;
        this.x = canvas3.width/2 *  Math.cos(this.angle * Math.PI/90)  +( canvas3.width/2 - this.width/2);
        this.y = canvas3.height/2 *  Math.sin(this.angle * Math.PI/300)  +( canvas3.height/2 - this.height/2);
        // this.y += this.curve * Math.sin(this.angle) ;
        this.angle += this.anglespeed; 
        // this.y += Math.random() * 6 - 3;
        if(gameFrame2 % this.flapspeed == 0)  (this.frame > 4? this.frame = 0: this.frame++);
    }
    draw(){
        ctx3.drawImage(this.image, this.frame * this.spriteWidth,0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height, );
        
    }

}
for (let i = 0; i < numberOfEnemy3; i++){
    arrayOfEnemy3.push(new Enemy3());
}

function animate3(){
    ctx3.clearRect(0, 0, CANVAS_WIDTH3, CANVAS_HEIGHT3);
    arrayOfEnemy3.forEach((enemy) =>{
        enemy.update();
        enemy.draw();
    })
    gameFrame3++;
    requestAnimationFrame(animate3);
}
animate3();
