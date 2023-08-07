
let currentState = "idle";
const dropdown = document.getElementById('animation');
dropdown.addEventListener('change',function(e) {
    currentState = e.target.value;
})


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();	
playerImage.src = "shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 5;

let spriteAnimation = []
let animationStates = [
    {
        name: "idle",
        frames: 7
    },
    {
        name: "jump",
        frames: 7
    },
    {
        name: "fall",
        frames: 7
    },
    {
        name: "run",
        frames: 9
    },
    {
        name: "dizzy",
        frames: 7
    },
    {
        name: "sit",
        frames: 5
    },
    {
        name: "roll",
        frames: 7
    },
    {
        name: "bite",
        frames: 7
    },
    {
        name: "ko",
        frames: 12
    },
    {
        name: "gethit",
        frames: 4
    }
    
];


animationStates.forEach((state,index) => {

    let frames = {
        loc : []
    }

    for(let i = 0; i < state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }

    spriteAnimation[state.name] = frames;
});


function animate(){

    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    let spritePosition = Math.floor(gameFrame/staggerFrames) % spriteAnimation[currentState].loc.length;
    let frameX = spriteAnimation[currentState].loc[spritePosition].x;
    let frameY = spriteAnimation[currentState].loc[spritePosition].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth,spriteHeight, 0 ,0, spriteWidth, spriteHeight); 
    gameFrame++;    
    requestAnimationFrame(animate);


}
animate();