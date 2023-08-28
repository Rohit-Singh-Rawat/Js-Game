import Player from "./player.js";
import InputHandler from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, JumpingEnemy } from "./enemies.js";
import {UI} from "./UI.js";


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    canvas.width = 900;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');


    class Game{
        constructor(width, height){
            this.gameOver = false;
            this.score = 0;
            this.width = width;
            this.height = height;
            this.groundMargin = 78;
            this.fontColor = "black";
            this.speed = 0;
            this.maxSpeed = 4;
            this.debug = false;
            this.collisions = [];
            this.particles = [];
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.backGround = new Background(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.enemyInterval = 2000;
            this.enemyTimer = 0;
            this.lives = 5;
            
        }
        update(deltatime){
            this.player.checkCollision();
            this.player.update(this.input.keys,deltatime);
            this.backGround.update();
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            }
            this.enemyTimer += deltatime;
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.enemies.forEach(enemy => enemy.update(deltatime));
            this.particles = this.particles.filter((particle, index) =>{
                particle.update();
                return !particle.markedForDeletion;
            });
            if (this.particles.length >  50) this.particles = this.particles.slice(0, 50);
            
            this.collisions = this.collisions.filter((collision, index) =>{
                collision.update(deltatime);
                return !collision.markedForDeletion;
            });
           
        }
        draw(context) {
            this.backGround.draw(context);   
            this.enemies.forEach(enemy => enemy.draw(context));
            this.UI.draw(context);
            this.particles.forEach(particle => particle.draw(context));
            this.player.draw(context);
            this.collisions.forEach(collision => collision.draw(context))
        }
        addEnemy(){

            this.enemies.push(new FlyingEnemy(this), new GroundEnemy(this), new JumpingEnemy(this));
        }
        
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timestamp) {
        let deltatime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        game.update(deltatime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});