export function drawStatusText(context, input,player){
    context.font = "20px helvetica";
    context.fillStyle = "white";
    context.fillText(`Last Input: ${input.lastKey}`, 20, 40);
    context.fillText(`Active Status: ${player.currentState.state}`, 20, 80);
}