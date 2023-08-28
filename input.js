export default class InputHandler{
    constructor(game){
        this.game = game;
        this.keys= [];
        window.addEventListener("keydown",e =>{
            console.log(e.key)
            if ((   e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft' ||
                    e.key === ' '
            ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            else if (e.key === 'd') this.game.debug = !this.game.debug;
            else if (e.key === 'Enter' && this.game.gameOver) {
                this.game.gameOver = false;
                location.reload();
                console.log("pprr")
            }
        });
        window.addEventListener('keyup', e =>{
            if(   e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowLeft' ||
            e.key === ' '
            ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}