window.addEventListener('load', function(){

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 600;
    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler{
        constructor(){
            this.keys = []
            this.touchY = '';
            this.touchX = '';
            this.touchthreshold = 30;
            window.addEventListener('keydown', e =>{
                if((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && (this.keys.indexOf(e.key)  === -1)){
                this.keys.push(e.key)
                }
                else if(e.key === 'Enter' && gameOver) restartGame()
            });
            
            
            window.addEventListener('keyup', e =>{
                if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
                this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            });
            
            window.addEventListener('touchstart', e => {
                this.touchY = e.touches[0].pageY;
                this.touchX = e.touches[0].pageX;
            });
            
            window.addEventListener('touchmove', e => {
                if(this.touchY - e.touches[0].pageY > this.touchthreshold && this.keys.indexOf('swipe Up') === -1) this.keys.push('swipe Up')
                else if(this.touchY - e.touches[0].pageY < -this.touchthreshold && this.keys.indexOf('swipe Down') === -1){ 
                    this.keys.push('swipe Down')
                    if(gameOver) restartGame();
                }
            
                if(this.touchX - e.touches[0].pageX < -this.touchthreshold && this.keys.indexOf('swipe Right') === -1) this.keys.push('swipe Right')
                else if(this.touchX - e.touches[0].pageX > this.touchthreshold && this.keys.indexOf('swipe Left') === -1) this.keys.push('swipe Left')

            });
            
            window.addEventListener('touchend', e => {
                this.keys.splice(this.keys.indexOf('swipe Down'),1);
                this.keys.splice(this.keys.indexOf('swipe Up'),1);
                this.keys.splice(this.keys.indexOf('swipe Right'),1);
                this.keys.splice(this.keys.indexOf('swipe Left'),1);
            });
            window.addEventListener('click', function(){
                canvas.requestFullscreen();
            })
        }
    }

    class Player{
        constructor(gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.spriteheight = 200;
            this.spritewidth = 200;
            this.height = this.spriteheight * 0.7;
            this.width = this.spriteheight * 0.7;
            this.x = 100;
            this.y = gameHeight - this.width;
            this.image = playerimg;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 8;
            this.vx = 0;
            this.vy = 0 ;
            this.weight = 1;
            this.frameTimer = 0;
            this.fps = 20;
            this.frameInterval = 1000/ this.fps;

        }
        update(input, deltatime, enemies) {
            
            // checking collision
            enemies.forEach(enemy => {
                console.log(enemy)
                if (enemy instanceof Enemy)
               { const dx1 = (enemy.x + enemy.width/2 -20) - (this.x + this.width / 2 +5);
                const dy1 = (enemy.y + enemy.height/2) - (this.y + this.height/2 + 20) ;
                const dx2 = (enemy.x + enemy.width/2 + 10) - (this.x + this.width / 2 +5);
                const dy2 = (enemy.y + enemy.height) - (this.y + this.height/2 + 20) ;

                const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                if (distance1 < (this.width)/2.8 + (enemy.width)/3 || distance2 < (this.width)/2.8 + (enemy.width)/3){
                    gameOver = true;}
            }
            else if (enemy instanceof Enemy2){
                const dx1 = (enemy.x + enemy.width/2) - (this.x + this.width / 2 +5);
                const dy1 = (enemy.y + enemy.height/1.8) - (this.y + this.height/2 + 10) ;
                const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                if (distance1 < (this.width)/3+ (enemy.width)/3 ){
                    gameOver = true;}
            }
        });



            if (this.frameTimer >= this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
                
            }
            else this.frameTimer += deltatime;
            if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('swipe Right') > -1) {
                this.vx = 5;
                }
            else if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('swipe Left') > -1) {
                this.vx = -5;
            }
            else{
                this.vx = 0;
            }

            if ((input.keys.indexOf('ArrowUp') > -1  || input.keys.indexOf('swipe Up') > -1) && this.onGround()) {
                this.weight = 1;
                this.vy = -30;
            }
            else if((input.keys.indexOf('ArrowDown') > -1 || input.keys.indexOf('swipe Down') > -1)  && !this.onGround()){
                this.weight += 0.4;
            }
            //Horizontal movement
            this.x += this.vx;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

            //Vertical movement 
            this.y += this.vy;
            if(!this.onGround()){
                this.frameY = 1;
                this.maxFrame = 5
                this.vy += this.weight;
            }
            else{
                this.vy = 0;
                this.frameY = 0
                this.maxFrame = 8;
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        draw(context){
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width / 2 +5,this.y + this.height / 2 + 20, this.width/2.8, 0, Math.PI * 2);
            // context.stroke();
            // context.strokeStyle = 'blue';
            // context.beginPath();
            // context.arc(this.x + this.width / 2 +5,this.y + this.height / 2 +10, this.width/3, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image,this.spritewidth * this.frameX,this.spriteheight * this.frameY,this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
        restart(){
            this.x = 100;
            this.y = this.gameHeight - this.height;
            this.maxFrame = 8;
            this.frameX = 0;
        }
    }

    class Background{
        constructor(gameWidth, gameHeight){
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.image = backgroundimg;
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = gameHeight;
            this.speed = 7;
        }

        update(){
            this.x -= this.speed;
            if (this.x <= -this.width) this.x = 0;
        }
        draw(context){
            context.drawImage(this.image,this.x,this.y,this.width, this.height);
            context.drawImage(this.image,this.x + this.width - this.speed,this.y,this.width, this.height);
        }
        restart(){
            this.x = 0;
        }

    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.spriteheight = 119;
            this.spritewidth = 160;
            this.height = this.spriteheight * 0.7;
            this.width = this.spritewidth * 0.7;
            this.image = enemyimg;
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.speed = 8;
            this.frameTimer = 0;
            this.fps = 20;
            this.frameInterval = 1000/ this.fps;
            this.markedForDeletion = false;
            if (score> 60){
                this.speed = Math.random()* 5 + 8;
            }
        }
        update(deltatime){
            if (this.x <=  0 - this.width) {
                this.markedForDeletion = true;
                score++;
            }

            if (this.frameTimer >= this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
                
            }
            else this.frameTimer += deltatime;
            this.x -= this.speed;
            

        }
        draw(context){
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width / 2- 20,this.y + this.height / 2, this.width/3, 0, Math.PI * 2);
            // context.stroke();
            // context.beginPath();
            // context.arc(this.x + (this.width)/2 + 10,this.y + this.height, this.width/3, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image,this.spritewidth* this.frameX,0,this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
        }
        
        
    }
    
    class Enemy2 {
        constructor(gameWidth, gameHeight){
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.spriteheight = 167;
            this.spritewidth = 238;
            this.height = this.spriteheight * 0.5;
            this.width = this.spritewidth * 0.5;
            this.image = enemy2img;
            this.x = this.gameWidth;
            this.y = Math.random() * this.gameHeight* 0.4;
            this.frameX = 0;
            this.maxFrame = 7;
            this.speed = 8;
            this.frameTimer = 0;
            this.fps = 20;
            this.frameInterval = 1000/ this.fps;
            this.markedForDeletion = false;
            this.curves = 0;
            this.angle = 0;
            if (score > 60 ) this.speed = Math.random() * 8 + 5;
            if (score > 100){ 
                this.curves = Math.floor(Math.random() * 2);
                }
        }
        update(deltatime){
            if (this.x <=  0 - this.width) {
                this.markedForDeletion = true;
                score++;
                if (score % 10 === 0 && score > 0)interval -= 50;

            }

            if (this.frameTimer >= this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
                
            }
            else this.frameTimer += deltatime;
            this.x -= this.speed;
            this.y += Math.sin(this.angle) * 2;
            this.angle += this.curves * 0.1;
        }
        draw(context){
            // context.strokeStyle = 'blue';
            // context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width / 2,this.y + this.height / 1.8, this.width/3, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image,this.spritewidth* this.frameX,0,this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
        }
        
        
    }
    
    let enemyTimer = 0;
    let interval = 1000;
    let enemyInterval = Math.random() * 500 + interval;
    

    function handleEnemies(deltatime){
        const enemyType =[new Enemy(canvas.width, canvas.height),new Enemy2(canvas.width, canvas.height)]
        let currentenemy = Math.floor(Math.random() * enemyType.length);
        if (enemyTimer >= enemyInterval){
            enemies.push(enemyType[currentenemy]);
            enemyInterval = Math.random() * 500 + interval;
            enemyTimer = 0;
        }
        else{
            enemyTimer += deltatime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltatime);
        });
        enemies = enemies.filter(enemy =>!enemy.markedForDeletion);
    
    }

    function displayStatusText(context){
        ctx.textAlign = 'left';
        ctx.fillStyle = 'black';
        ctx.font = '40px Helvetica';
        ctx.fillText(`Score: ${score}`, 20, 50);
        ctx.fillStyle = 'white';
        ctx.font = '40px Helvetica';
        ctx.fillText(`Score: ${score}`, 22, 52);
        if(gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText(`GAME OVER, please ENTER or swipe down to restart!`, canvas.width/2, canvas.height/2);
            
            context.fillStyle = 'white';
            context.fillText(`GAME OVER, please ENTER or swipe down to restart!`, canvas.width/2 +2, canvas.height/2 +2);
        }

    }

    function restartGame(){
        player.restart();
        background.restart();
        enemies = [];
        gameOver = false;
        score = 0;
        animate(0);

    }

    const input =  new InputHandler();
    const player  = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltatime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, deltatime, enemies);
        handleEnemies(deltatime);
        displayStatusText(ctx);

        if (!gameOver) requestAnimationFrame(animate)

    }
    animate(0);
});