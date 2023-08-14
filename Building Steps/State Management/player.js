import { standingLeft , standingRight, sittingLeft, sittingRight,walkingLeft, walkingRight, jumpingLeft
    , jumpingRight,fallingLeft,fallingRight, rollingLeft, rollingRight} from "./state.js";

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.states = [new standingLeft(this), new standingRight(this), new sittingLeft(this), new sittingRight(this),
        new walkingLeft(this), new walkingRight(this), new jumpingLeft(this), new jumpingRight(this),
        new fallingLeft(this), new fallingRight(this), new rollingLeft(this), new rollingRight(this)];
        this.currentState = this.states[1];
        this.image  = playerimg;
        this.width = 200;
        this.height = 181.83;
        this.x = 100;
        this.y = this.gameHeight - this.height;
        this.frameX= 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.vx= 0;
        this.vy= 0;
        this.weight = 1;
        this.fps = 30;
        this.intervalForFrame = 1000/this.fps;
        this.timer = 0;
    }
    draw(context){
        context.drawImage(this.image,this.width * this.frameX,this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input, deltatime){
        if (this.timer >= this.intervalForFrame){
            this.timer = 0;
            if (this.frameX >= this.maxFrame)this.frameX = 0;
            else ++this.frameX;
        }
        else this.timer += deltatime;
        this.currentState.handlerInput(input);
        this.x += this.vx;
        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.weight;
        }
        else this.vy = 0;
        if (this.x < 0) this.x = 0;
        console.log(this.vy)
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height; 
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround(){
        return this.y >= this.gameHeight - this.height;
    }
}