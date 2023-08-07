const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 500;
let gamespeed = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'img/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = 'img/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = "img/layer-4.png";

const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img/layer-5.png';


const slider = document.getElementById('slider');
slider.value  = gamespeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerText = gamespeed;
slider.addEventListener('input', function(e){
    gamespeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
});

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.height = 500;
        this.width = 2400;
        // this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed =  gamespeed * this.speedModifier;
    }
    update(){
        this.speed =  gamespeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = 0;
        }
        // if (this.x2 <= -this.width){
        //     this.x2 = this.width + this.x ;
        // }
        this.x = Math.floor(this.x - this.speed);
       // this.x2 = Math.floor(this.x2 - this.speed);
        
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        
       // ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);

       ctx.drawImage(this.image, this.x + this.width , this.y, this.width, this.height);
    }
}
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];


function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    for (const gameObject of gameObjects) {
        gameObject.update();
        gameObject.draw();
    }
    requestAnimationFrame(animate);
}
animate();