export const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
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
        if (input.includes('ArrowDown')) this.player.setState(states.SITTING, 0);
        else if (input.includes('ArrowUp')) this.player.setState(states.JUMPING, 1);
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
        if (input.includes('ArrowDown')) this.player.setState(states.SITTING, 0);
        else if (this.player.vy === 0 ) this.player.setState(states.FALLING, 1);
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
        if (input.includes('ArrowDown')) this.player.setState(states.SITTING, 0);
        else if (this.player.onGround()) this.player.setState(states.RUNNING, 1);
    }
}
