import { text, rawText } from "./helper.js";
import { loadImg, drawImg } from "./draw.js";
import { sheep_frame, sheep_draw, sheep_init } from "./sheep.js";
import { grass_draw } from "./grass.js";
import { dog_frame, dog_draw, dog_init } from "./dog.js";
import { levels } from "./levels.js";

const MS_PER_FRAME = 16;
let keys = [];
window.gameState = "playing";
window.frameCount = 0;
window.level = 10;
window.timers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let lastTimestamp;
let accumulatedDelta;
let mouse = {
    x: undefined,
    y: undefined,
};
let timer = 0;

document.onkeydown = function (e) {
    keys[e.code] = 1;
    // return false;
};

document.onkeyup = function (e) {
    keys[e.code] = 0;
    // return false;
};

document.onclick = function (e) {
    if (gameState === "win") {
        if (window.level < 10) {
            window.gameState = "playing";
            window.level++;
            window.frameCount = 0;
            timer = 0;
            sheep_init();
            dog_init();
        }
    }
};

canvas.width = 960;
canvas.height = 540;
window.ctx = canvas.getContext("2d");
ctx.lineWidth = 2;

ctx.textAlign = "center";
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
    loadImg("dog.png", "dog");
    sheep_init();
    dog_init();
    loop(e);
});

document.onmousemove = function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    mouse.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
};

function loop(timestamp) {
    const l = levels[window.level];
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    accumulatedDelta += delta;
    if (window.gameState !== "win") {
        timer += delta;
    }

    while (accumulatedDelta >= MS_PER_FRAME) {
        window.frameCount++;
        accumulatedDelta -= MS_PER_FRAME;
        /* run game loop at 60 fps */
        let dog = null;

        if (l.dog) dog = dog_frame(mouse);

        sheep_frame(dog ? dog : mouse);
    }

    /* and now display it at user's speed */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grass_draw();
    sheep_draw();
    dog_draw(mouse);

    text(`${Math.floor(timer.toFixed(0) / 1000)}s`, 40, 20);
    text(`level ${window.level}`, 900, 20);

    if (window.gameState === "win") {
        text(
            "Congratulations!",
            960 / 2,
            150,
            100,
            9999,
            `hsl(${window.frameCount % 360}, 100%, 60%)`,
            9999,
            "rgba(0,0,0,.5)",
        );

        if (window.level === 10) {
            const timers = window.timers;
            text("You have completed all levels!", 960 / 2, 200, 30);
            for (let i = 0; i < 5; i++) {
                text(`Level ${i + 1} : ${timers[i]}s`, 300, 250 + i * 40, 30);
            }
            for (let i = 5; i < 10; i++) {
                text(
                    `Level ${i + 1} : ${timers[i]}s`,
                    600,
                    250 + (i - 5) * 40,
                    30,
                );
            }
            text(
                `Total : ${timers.reduce((a, b) => a + b)}s`,
                960 / 2,
                500,
                70,
                9999,
                `hsl(${window.frameCount % 360}, 100%, 60%)`,
                9999,
                "rgba(0,0,0,.5)",
            );
        } else text("Click for next level", 960 / 2, 430, 30);
    }

    requestAnimationFrame(loop);
}
