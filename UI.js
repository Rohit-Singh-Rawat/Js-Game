export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Creepster";
        this.liveImage = document.getElementById("live1");
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        context.fillText("SCORE: "+ this.game.score, 20, 50);
        for(let i = 0; i< this.game.lives; i++){
            context.drawImage(this.liveImage, (27) * i + 25, 70, 25, 25);
        }
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 3 + 'px '+ this.fontFamily;
            context.fillText("Boo-yah", this.game.width * 0.5, this.game.height * 0.5 -20);
            context.font = this.fontSize * 0.7 + 'px '+ this.fontFamily;
            
            context.fillText("What are creatures of the night afraid of? YOU!!!", this.game.width * 0.5, this.game.height * 0.5 +20);

            
        }
    }
}