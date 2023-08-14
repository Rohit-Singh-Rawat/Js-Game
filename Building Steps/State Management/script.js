import Player from './player.js';
import {drawStatusText} from './utils.js';
import InputHandler from './input.js';

window.addEventListener('load', function() {

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 600;

    let player = new Player(canvas.width,  canvas.height);
    let input = new InputHandler();
    let lastTime = 0;
    function animate(timestamp){
        let deltatime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        player.update(input.lastKey, deltatime);
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate);

    }
    animate(0);
});