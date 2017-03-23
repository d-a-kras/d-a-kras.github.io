/**
 * Created by dogan on 14.11.2014.
 */
//прокрутка фона
var totalSeconds;
var lastFrameTime = 0;
function startStop() {
        lastFrameTime = Date.now();
        requestAnimationFrame(loop);
}

function loop() {
    if (!looping) {
        return;
    }

    requestAnimationFrame(loop);

    var now = Date.now();
    var deltaSeconds = (now - lastFrameTime) / 1000;
    lastFrameTime = now;
    draw(deltaSeconds);
}

function draw(delta) {
    totalSeconds += delta;

    var vx = 100; // прокрутка со скоростью 100 пикселей в секунду
    var numImages = Math.ceil(canvas.width / background.width) + 1;
    var xpos = totalSeconds * vx % background.width;

    ctx.save();
    ctx.translate(-xpos, 0);
    for (var i = 0; i < numImages; i++) {
        ctx.drawImage(background, i * background.width, 0);
    }
    ctx.restore();
}
