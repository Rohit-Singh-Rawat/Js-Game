
import {states, Sitting, Running, Jumping, Falling} from "./playerStates.js";



export default class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.image = document.getElementById("player");
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.maxFrame = 8;
        this.frameX = 0 ;
        this.frameY = 0;
        this.maxSpeed= 10;
        this.vy = 0;
        this.weight = 1;
        this.speed = 0;
        this.fps = 30;
        this.intervalForFrame = 1000/this.fps;
        this.timer = 0;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();


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
        this.x += this.speed;
        this.currentState.handleInput(input);
        if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed
        else this.speed = 0;
        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.weight;
        }
        else this.vy = 0;
        if (this.x < 0) this.x = 0;
        if (this.onGround()) this.y = this.game.height - this.height - this.game.groundMargin; 
    }
    setState(state, speed){
        this.frameX = 0;
        this.currentState = this.states[state];
        this.currentState.enter();
        this.game.speed = speed * this.game.maxSpeed;
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
}