import Player from "./player.js";
import InputHandler from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy } from "./enemies.js";


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    canvas.width = 900;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');


    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 84;
            this.speed = 0;
            this.maxSpeed = 4;
            this.Player = new Player(this);
            this.input = new InputHandler();
            this.backGround = new Background(this);
            this.enemies = [];
            this.enemyInterval = 500;
            this.enemyTimer = 0;
            
        }
        update(deltatime){
            this.Player.update(this.input.keys,deltatime);
            this.backGround.update();
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            }
            this.enemyTimer += deltatime;
            this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.enemies.forEach(enemy => enemy.update(deltatime));
            
        }
        draw(context) {
            this.backGround.draw(context);   
            this.Player.draw(context);
            this.enemies.forEach(enemy => enemy.draw(context));
        }
        addEnemy(){
            this.enemies.push(new FlyingEnemy(this), new GroundEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timestamp) {
        let deltatime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltatime);
        requestAnimationFrame(animate);
    }

    animate(0);
});