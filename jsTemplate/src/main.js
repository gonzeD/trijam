import { text, rawText } from "./helper.js";
import { loadImg, drawImg } from "./draw.js";

const MS_PER_FRAME = 16;
let keys = [];
let gameState = "playing";
let frame = 0;
let lastTimestamp;
let accumulatedDelta;
let mouse = {
    x: undefined,
    y: undefined,
};

document.onkeydown = function (e) {
    keys[e.code] = 1;
    // return false;
};

document.onkeyup = function (e) {
    keys[e.code] = 0;
    // return false;
};

canvas.width = 960;
canvas.height = 540;
window.ctx = canvas.getContext("2d");
ctx.lineWidth = 2;

ctx.textAlign = "left";
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

requestAnimationFrame((e) => {
    accumulatedDelta = 0;
    lastTimestamp = document.timeline.currentTime;

    /* load all assets */
    loadImg("test.bmp", "test", 16);
    loop(e);
});

canvas.onmousemove = function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    mouse.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
};

function loop(timestamp) {
    frame++;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    accumulatedDelta += delta;

    while (accumulatedDelta >= MS_PER_FRAME) {
        accumulatedDelta -= MS_PER_FRAME;
        /* run game loop at 60 fps */
    }

    /* and now display it at user's speed */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    text("this is a big black text", 540.5, 50, 20);
    drawImg("test", 50, 50, 0);
    requestAnimationFrame(loop);
}
