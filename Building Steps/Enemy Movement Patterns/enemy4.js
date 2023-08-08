// @type {HTMLCanvasElement}
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');

const CANVAS_HEIGHT4 = canvas4.height = 600;
const CANVAS_WIDTH4 = canvas4.width = 320;

const numberOfEnemy4 = 50;
const arrayOfEnemy4 = []
let gameFrame4 = 0;

class Enemy4{
    constructor(){
        this.image = new Image();
        this.image.src = 'img/enemy4.png'
      
        this.spriteHeight = 213;
        this.spriteWidth = 213; 
        this.height = this.spriteHeight / 3;
        this.width = this.spriteWidth / 3;
        this.speed = Math.random() * 15 + 5;
        this.x = Math.random() * (CANVAS_WIDTH4 - this.width);
        this.y = Math.random() *( CANVAS_HEIGHT4 - this.height);
        this.newX = Math.random() * (CANVAS_WIDTH4 - this.width);
        this.newY =  Math.random() *( CANVAS_HEIGHT4 - this.height);
        this.frame = 0;
        this.flapspeed = Math.floor(Math.random() * 3 )+ 1;
        this.interval = Math.floor(Math.random() *200 ) +50;
    }
    update(){
        if(gameFrame4 % this.interval == 0){
            this.newX = Math.random() * (CANVAS_WIDTH4 - this.width);
            this.newY =  Math.random() *( CANVAS_HEIGHT4 - this.height);
           
        }
        
        let dx = this.x -this.newX;
        this.x -=dx/this.speed;
        let dy = this.y -this.newY;
        this.y -= dy/this.speed; 
        if(gameFrame4 % this.flapspeed == 0)  (this.frame > 4? this.frame = 0: this.frame++);
        
    }
    draw(){
        ctx4.drawImage(this.image, this.frame * this.spriteWidth,0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height, );
        
    }

}
for (let i = 0; i < numberOfEnemy4; i++){
    arrayOfEnemy4.push(new Enemy4());
}

function animate4(){
    ctx4.clearRect(0, 0, CANVAS_WIDTH4, CANVAS_HEIGHT4);
    arrayOfEnemy4.forEach((enemy) =>{
        enemy.update();
        enemy.draw();
    })
    gameFrame4++;
    requestAnimationFrame(animate4);
}
animate4();
