export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    WALKING_LEFT: 4,
    WALKING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
    ROLLING_LEFT: 10,
    ROLLING_RIGHT: 11
}

class State {
    constructor(state){
        this.state = state;
    }
}
export class standingLeft extends State {
    constructor(player){
        super('STANDING LEFT');
        this.player = player;
    }
    enter(){
        
        this.player.maxFrame = 6;
        this.player.frameY = 1;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.weight = 1;

    }
    handlerInput(input){
        if(input === 'PRESS right')   this.player.setState(states.STANDING_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
        else if (input === 'PRESS left') this.player.setState(states.WALKING_LEFT);
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_LEFT);
    }
}

export class standingRight extends State {
    constructor(player){
        super('STANDING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 0; 
        this.player.vx = 0;
        this.player.weight = 1;
    }
    handlerInput(input){
        if(input=== 'PRESS left')   this.player.setState(states.STANDING_LEFT);        
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
        else if (input === 'PRESS right') this.player.setState(states.WALKING_RIGHT);
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT);
    }
}

export class walkingLeft extends State {
    constructor(player){
        super('WALKING LEFT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 8;
        this.player.frameY = 7; 
        this.player.vx = -10;
    }
    handlerInput(input){
        if(input === 'PRESS right')   this.player.setState(states.WALKING_RIGHT);
        else if (input === 'RELEASE left') this.player.setState(states.STANDING_LEFT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_LEFT);
    }
}

export class walkingRight extends State {
    constructor(player){
        super('WALKING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 8;
        this.player.frameY = 6; 
        this.player.vx = 10;
    }
    handlerInput(input){
        if(input === 'PRESS left')   this.player.setState(states.WALKING_LEFT);
        else if (input === 'RELEASE right') this.player.setState(states.STANDING_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT);
    }
}

export class sittingLeft extends State {
    constructor(player){
        super('SITTING LEFT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 4;
        this.player.frameY = 9; 
        this.player.vx = 0;
        this.player.vy = 0;
    }
    handlerInput(input){
        if(input === 'RELEASE down')   this.player.setState(states.STANDING_LEFT);
        else if (input=== 'PRESS right')   this.player.setState(states.SITTING_RIGHT);
    }
}

export class sittingRight extends State {
    constructor(player){
        super('SITTING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 4;
        this.player.frameY = 8; 
        this.player.vx = 0;
        this.player.vy = 0;
    }
    handlerInput(input){
        if(input === 'RELEASE down')  this.player.setState(states.STANDING_RIGHT);
        else if (input=== 'PRESS left')   this.player.setState(states.SITTING_LEFT);        
    }
}

export class jumpingLeft extends State {
    constructor(player){
        super('JUMPING LEFT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 3; 
        this.player.vx = -5;
        if(this.player.onGround()) this.player.vy = -30   ;
    }
    handlerInput(input){
        if (input === 'PRESS right') this.player.setState(states.JUMPING_RIGHT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
        else if(this.player.vy > 0) this.player.setState(states.FALLING_LEFT)
        else if (input === 'PRESS down') this.player.setState(states.ROLLING_LEFT);
    }
}

export class jumpingRight extends State {
    constructor(player){
        super('JUMPING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 2; 
        this.player.vx = 5;
        if(this.player.onGround()) this.player.vy = -30   ;
    }
    handlerInput(input){
        if (input === 'PRESS left') this.player.setState(states.JUMPING_LEFT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
        else if(this.player.vy > 0) this.player.setState(states.FALLING_RIGHT)
        else if (input === 'PRESS down') this.player.setState(states.ROLLING_RIGHT);
    }
}

export class fallingLeft extends State {
    constructor(player){
        super('FALLING LEFT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 5; 
        this.player.vx = -5;
    }
    handlerInput(input){
        if (input === "PRESS right") this.player.setState(states.FALLING_RIGHT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
        else if (input === 'PRESS down') this.player.setState(states.ROLLING_RIGHT);
        
    }
}

export class fallingRight extends State {
    constructor(player){
        super('FALLING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 4; 
        this.player.vx = 5;
    }
    handlerInput(input){
        if (input === "PRESS left") this.player.setState(states.FALLING_LEFT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
        else if (input === 'PRESS down') this.player.setState(states.ROLLING_RIGHT);
    }
}

export class rollingLeft extends State {
    constructor(player){
        super('ROLLING LEFT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 11; 
        this.player.weight = 5;
    }
    handlerInput(input){
        if (input === "PRESS right") this.player.setState(states.ROLLING_RIGHT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    }
}

export class rollingRight extends State {
    constructor(player){
        super('ROLLING RIGHT');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 10; 
        this.player.weight = 5;
    }
    handlerInput(input){
        if (input === "PRESS left") this.player.setState(states.ROLLING_LEFT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
    }
}