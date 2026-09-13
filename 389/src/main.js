import { text, rawText } from "./helper.js";
import { loadImg, drawImg } from "./draw.js";
import { sheep_frame, sheep_draw, sheep_init } from "./sheep.js";
import { grass_draw } from "./grass.js";

const MS_PER_FRAME = 16;
let keys = [];
let gameState = "playing";
window.frame = 0;
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
    loadImg("sheep.png", "sheep");
    loadImg("grass.png", "grass", 8);
    sheep_init();
    loop(e);
});

canvas.onmousemove = function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    mouse.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
};

function loop(timestamp) {
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    accumulatedDelta += delta;

    while (accumulatedDelta >= MS_PER_FRAME) {
        window.frame++;
        accumulatedDelta -= MS_PER_FRAME;
        /* run game loop at 60 fps */

        sheep_frame({ x: mouse.x, y: mouse.y });
    }

    /* and now display it at user's speed */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grass_draw();
    sheep_draw();

    requestAnimationFrame(loop);
}
