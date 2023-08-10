const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '50px Impact';

const gamemusic = new Audio();

gamemusic.src = './resource/gamemusic.wav';

gamemusic.loop = true;

const collisioncanvas = document.getElementById('canvas2');
const collisionctx = collisioncanvas.getContext('2d');
collisioncanvas.width = window.innerWidth;
collisioncanvas.height = window.innerHeight;

let lastTime = 0 ;
let timeToNextRaven = 0 ;
let ravenInterval = 700 ;
let score = 0;
let gamespeed = 0;

let ravens = []
let explosions = []
let particles = [];

let gameOver = false;
class Raven{
    constructor(){
        this.spriteHeight = 194;
        this.spriteWidth = 271;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.sizeModifier * this.spriteWidth;
        this.height = this.sizeModifier * this.spriteHeight;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX =  Math.random() * 5 + 3;
        this.directionY = Math.random() * 5  - 2.5;
        this.image = new Image();
        this.image.src = './resource/raven.png';
        this.frame = 0;
        this.markedForDeletion = false;
        this.flapInterval = 50;
        this.timeSinceFlap = 0;
        this.randomColor = [Math.floor(Math.random() *255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = `rgb(${this.randomColor[0]}, ${this.randomColor[1]}, ${this.randomColor[2]})`;
        this.hasTrails = Math.random() > 0.5;
    }
    update(deltatime){
        this.x -= this.directionX;
        this.y -= this.directionY;
        if (this.y <= 0 || this.y + this.height >= canvas.height){
            this.directionY = -this.directionY;
        }
        if (this.x < 0 - this.width){
            this.markedForDeletion = true;
        }
        if (this.x < 0 - this.width){
            gameOver= true;
        }
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval){
           
            (this.frame >= 5)? this.frame = 0 : ++this.frame;
            this.timeSinceFlap = 0;
            if (this,this.hasTrails)
                {                    
                    for (var i = 0; i < 5; i++){
                    particles.push(new Particle(this.x , this.y ,this.width, this.color));}
                }
                
        }
        
    }
    draw(){
        collisionctx.fillStyle = this.color;
        collisionctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}



class Explosion {
    constructor(x, y, size){
        this.image  = new Image;
        this.image.src = '/resource/boom.png';
        this.spriteHeight = 179;
        this.spriteWidth = 200;
        this.frame = 0;
        this.size = size;
        this.x = x;
        this.y = y ;    
        this.angle = Math.random() * 6.2;
        this.sound= new Audio();
        this.sounds = ['/resource/Fire_impact 1.wav', '/resource/Ice attack 2.wav']
        this.sound.src = this.sounds[Math.round(Math.random())];
        this.markedForDeletion = false;
        this.frameInterval = 100;
        this.timeSinceLastFrame = 0;
        }
    update(deltatime){
        if(this.frame === 0 ) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if(this.timeSinceLastFrame > this.frameInterval){
            ++this.frame;
            this.timeSinceLastFrame = 0;
        }
        if(this.frame > 5){
            this.markedForDeletion = true;
        }
    } 
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.size/4, 0 - this.size/4, this.size, this.size);
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, size, color){

        this.size = size; 
        this.x = x + this.size/2;
        this.y = y + this.size/3; 
        this.color = color;
        this.radius = Math.random() * this.size/10;
        this.maxRadius = Math.random() * 20 + 25;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
    }
    update() {
        this.x += this.speedX;
        this.radius += 0.8;
        if (this.radius > this.maxRadius-5){
            this.markedForDeletion = true;
        }
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = 1 - this.radius/this.maxRadius;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    
}
}
function drawScore(){
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 50, 75);

    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 55, 80);
    
}

window.addEventListener('click', function(e){
    const dectectedColor = collisionctx.getImageData(e.x, e.y, 1,1);
    ravens.forEach(raven => {
        if (dectectedColor.data[0] === raven.randomColor[0] && dectectedColor.data[1] === raven.randomColor[1] && dectectedColor.data[2] === raven.randomColor[2] ){
            raven.markedForDeletion = true;
            explosions.push(new Explosion(e.x, e.y,raven.width));
            score += 1;
            gamespeed++;

        }
    });
   
})

function drawGameover(){
    ctx.textAlign = 'center';
    ctx.fillStyle = "black";
    ctx.fillText(`GAME OVER, your score is ${score}`, canvas.width/2 , canvas.height/2);
    
    ctx.fillStyle = "white";
    ctx.fillText(`GAME OVER, your score is ${score}`, canvas.width/2 + 5, canvas.height/2 + 5);
    const gameOversound = new Audio();
    gameOversound.src = '/resource/gameover.wav';
    gamemusic.pause();
    gameOversound.play();

}

function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;
    if (gamespeed >= 10){
        ravenInterval -= 40;
        gamespeed = 0;
    }
    drawScore();

    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven  =  0;

        ravens.sort(function(a,b) { 
            return a.width - b.width;
        })
       
    }

    [...particles, ...ravens, ...explosions].forEach(raven => raven.update(deltatime));
    [...particles ,...ravens, ...explosions].forEach(raven => raven.draw());
    ravens = ravens.filter(raven => !raven.markedForDeletion);
    explosions = explosions.filter(explosion =>!explosion.markedForDeletion);
    particles = particles.filter(particle =>!particle.markedForDeletion);
    
    if (!gameOver) requestAnimationFrame(animate);
    else drawGameover();
}
const start = document.getElementById("start");
    start.addEventListener("click", function (e) {
        gamemusic.play();
        animate(0);
        start.style.display = "none";
    }
    
);