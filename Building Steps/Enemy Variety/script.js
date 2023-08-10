window.addEventListener('load', function(){


    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 450;
    canvas.height = 620;

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 500;
            this.enemyTime = 0;
            this.enemyTypes = ['Worm','Ghost','Spider'];

        }
        update(deltatime) {
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTime > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemyTime = 0;
            }
            this.enemyTime += deltatime;
            this.enemies.forEach(enemy => enemy.update(deltatime));
        }

        draw() {
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
        }
        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() *  this.enemyTypes.length)];
            if (randomEnemy === 'Worm')   this.enemies.push(new Worm(this));
            else if (randomEnemy === 'Ghost')  this.enemies.push(new Ghost(this));
            else if (randomEnemy === 'Spider')  this.enemies.push(new Spider(this));
            this.enemies.sort(function(a, b) {
            return a.y - b.y})
        }

    }
    class Enemy {
        constructor(game) {
            this.game = game;
            this.markedForDeletion = false;
            this.maxFrame = 5;
            this.frame = 0;
            this.frameInterval = 100;
            this.frameTimer = 0;

        }
        update(deltatime) {
            this.x -= this.vx * deltatime;
            if (this.x < -this.width) {
                this.markedForDeletion = true;
            }
            this.frameTimer += deltatime;
            if (this.frameTimer > this.frameInterval) {
                ++this.frame;
                if(this.frame > this.maxFrame) this.frame = 0
                this.frameTimer = 0;
            }
        }
        draw(ctx) {
            ctx.drawImage(this.image,this.frame * this.spriteWidth , 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);      
        }
    }


    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.image = worm;
            this.spriteHeight = 171;
            this.spriteWidth = 229;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.x = this.game.width;
            this.y =   this.game.height - this.height;
            this.vx = Math.random() * 0.1 + 0.1;

        }

    }

    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.image = ghost;
            this.spriteHeight = 209;
            this.spriteWidth = 261;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.x = this.game.width;
            this.y =   Math.random() * 0.6 * this.game.height;
            this.vx = Math.random() * 0.1 + 0.1;
            this.angle = 0;
            this.curve = Math.random() * 0.3;

        }
        update(deltatime){
            super.update(deltatime);
            this.y += Math.sin(this.angle) * this.curve * deltatime;
            this.angle += 0.04;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = 0.7;
            super.draw(ctx);
            ctx.restore();

        }

    }   

    class Spider extends Enemy {
        constructor(game) {
            super(game);
            this.image = spider;
            this.spriteHeight = 175;
            this.spriteWidth = 310;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.x =  Math.random() * this.game.width;
            this.y =  0 - this.height;
            this.vx = 0;
            this.vy = Math.random() * 0.1 + 0.1;
            this.angle = 0;
            this.curve = Math.random() * 0.3;
            this.maxLength = Math.random() * this.game.height;

        }
        update(deltatime){
            super.update(deltatime);
            this.y += this.vy * deltatime;
            if(this.y >= this.maxLength) this.vy *= -1;
            this.angle += 0.04;
            if (this.y < 0 - this.height * 2) this.markedForDeletion = true; 
        }
        draw() {

            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2,0);
            ctx.lineTo(this.x+ this.width/2, this.y +20);
            ctx.stroke();
            super.draw(ctx);


        }

    } 

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timestamp) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let deltatime = timestamp - lastTime;
        lastTime = timestamp;
        game.update(deltatime);
        game.draw();
        requestAnimationFrame(animate);

    }
    animate(0)


})