const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 400;

let canvasPosition = canvas.getBoundingClientRect();
let explosions = [];

class Explosion {
    constructor(x, y){
        this.image  = new Image;
        this.image.src = 'boom.png';
        this.spriteHeight = 179;
        this.spriteWidth = 200;
        this.frame = 0;
        this.timer = 0;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y ;
        this.angle = Math.random() * 6.2;
        this.sound= new Audio();
        this.sounds = ['/Fire_impact 1.wav', '/Ice attack 2.wav']
        this.sound.src = this.sounds[Math.round(Math.random())];
        }
    update(){
        this.timer++;
        if(this.frame === 0 ) this.sound.play();
        if(this.timer % 5 === 0){
            ++this.frame;
        }
    } 
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width/2, 0 -this.height/2, this.width, this.height);
        ctx.restore();
    }

}
window.addEventListener('click', function(e){
    createAnimation(e);
})
// window.addEventListener('mousemove', function(e){
//     createAnimation(e);
// })
function createAnimation(e){
    let positionX = e.x - canvasPosition.x;
    let positionY = e.y - canvasPosition.y;
    explosions.push(new Explosion(positionX, positionY));
}
function animate(){
    
   ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i=0; i<explosions.length; i++){
        explosions[i].draw();
        explosions[i].update();
        if(explosions[i].frame > 5) 
        {
            explosions.splice(i, 1);
        }
    }{
    }
    
    requestAnimationFrame(animate);
}
animate();