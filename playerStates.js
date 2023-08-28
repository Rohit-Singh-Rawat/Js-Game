import { Dust, Fire, Splash } from "./particles.js";


export const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4, 
    DIVING : 5, 
    HIT : 6,
    DIE: 7
}

class State {
    constructor(state){
        this.state = state;
    }
}
export class Sitting extends State {
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 5; 
        this.player.maxFrame = 4;
        this.player.maxSpeed = 0 ;
    }
    handleInput(input){
        if(!input.includes('ArrowDown')) this.player.setState(states.RUNNING, 1);
        else if (input.includes(" ")) this.player.setState(states.ROLLING, 2);
    }

}
export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 3; 
        this.player.maxFrame = 8;
        this.player.maxSpeed = 10;

    }
    handleInput(input){
        this.player.game.particles.unshift(new Dust(this.player.game, this.player.x + this.player.width * 0.6, this.player.y + this.player.height))
        if (input.includes('ArrowDown')) this.player.setState(states.SITTING, 0);
        else if (input.includes('ArrowUp')) this.player.setState(states.JUMPING, 1);
        
        else if (input.includes(" ")) this.player.setState(states.ROLLING, 2);
    }
}
export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 1; 
        this.player.maxFrame = 6;
        if (this.player.onGround()) this.player.vy -=25;

    }
    handleInput(input){
        if (input.includes('ArrowDown')) this.player.setState(states.DIVING, 0);
        else if (this.player.vy === 0 ) this.player.setState(states.FALLING, 1);
        
        else if (input.includes(" ")) this.player.setState(states.ROLLING, 2);
    }
}
export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 2; 
        this.player.maxFrame = 6;

    }
    handleInput(input){
        if (input.includes('ArrowDown')) this.player.setState(states.DIVING, 0);
        else if (this.player.onGround()) this.player.setState(states.RUNNING, 1);
        
        else if (input.includes(" ")) this.player.setState(states.ROLLING, 2);
    }
}
export class Rolling extends State {
    constructor(player){
        super('ROLLING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0; 
        this.player.maxFrame = 6;
        this.player.frameY = 6;

    }
    handleInput(input){
        this.player.game.particles.unshift(new Fire(this.player.game, this.player.x + this.player.width * 0.1, this.player.y - this.player.height * 0.3))
        
        if (!input.includes(' ') && this.player.onGround()) this.player.setState(states.RUNNING, 1);
        else if (!input.includes(' ') && !this.player.onGround()) this.player.setState(states.FALLING, 1);
        else if (input.includes(' ') && input.includes('ArrowUp')  && this.player.onGround()){
            this.player.vy -= 27;
        }
        else if( input.includes('ArrowDown') && !this.player.onGround()
        ) this.player.setState(states.DIVING, 2);
    }
}
export class Diving extends State {
    constructor(player){
        super('DIVING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0; 
        this.player.maxFrame = 6;
        this.player.frameY = 6;
        this.player.vy = 15;

    }
    handleInput(input){
       this.player.game.particles.unshift(new Fire(this.player.game, this.player.x + this.player.width * 0.1, this.player.y - this.player.height * 0.3))
        
        if ( this.player.onGround()) {
            console.log(this.player.game.particles)
            for(let i = 0; i< 30; i++){
                this.player.game.particles.unshift(new Splash(this.player.game, this.player.x+ this.player.width * 0.8, this.player.y+ this.player.height * 0.5))
            }
            this.player.setState(states.RUNNING, 1)
            ;}
        if (input.includes(' ') && this.player.onGround()) this.player.setState(states.ROLLING, 2)


    }
}
export class Hit extends State {
    constructor(player){
        super('HIT');
        this.player = player;
    }
    enter(){
        this.player.maxSpeed = 0;
        this.player.frameY = 4; 
        this.player.maxFrame = 10;

    }
    handleInput(input){
        if (this.player.frameX >= 10 && this.player.onGround()) this.player.setState(states.RUNNING, 1);
        else if (this.player.frameX >= 10 && !this.player.onGround()) this.player.setState(states.FALLING, 1);
        if (this.player.game.lives <= 0) this.player.setState(states.DIE, 0);
    }
}
export class Die extends State{
    constructor(player){
        super('DIE');
        this.player = player;
    }
    enter(){
        this.player.maxSpeed = 0;
        this.player.frameY = 8; 
        this.player.maxFrame = 11;

    }
    handleInput(input){

    }
}