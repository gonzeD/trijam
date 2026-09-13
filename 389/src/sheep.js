import { drawImg } from "./draw";
import { text } from "./helper";
import { levels } from "./levels";

let sheeps = [];
let target = {};
const PAD = 20;

export function sheep_init() {
    const l = levels[window.level];

    sheeps = [];
    target = {
        x: 960 / 2,
        y: 540 / 2,
        radius: 100,
    };

    for (let i = 0; i < l.sheep; i++) {
        sheeps.push({
            x: Math.random() * 800 + 50,
            y: Math.random() * 400 + 50,
            delay: Math.random() * 100,
            reverse: Math.random() < 0.5,
            inside: false,
        });
    }
}
export function sheep_draw() {
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, 2 * Math.PI);
    ctx.stroke();

    sheeps
        .sort((a, b) => a.y - b.y)
        .forEach((sheep) => {
            drawImg(
                "sheep",
                sheep.x,
                sheep.y,
                Math.floor((window.frameCount + sheep.delay) / 5) % 8,
                sheep.reverse,
            );
        });

    text(
        `${sheeps.filter((x) => x.inside).length}/${sheeps.length}`,
        960 / 2,
        20,
        20,
    );
}

const RADIUS = 12;
export function sheep_frame(fleePoint) {
    const l = levels[window.level];
    if (l.moveX) {
        target.x = (Math.sin(window.frameCount / l.moveX) * 600) / 2 + 960 / 2;
    }
    if (l.moveY) {
        target.y = (Math.sin(window.frameCount / l.moveY) * 300) / 2 + 540 / 2;
    }

    sheeps.forEach((sheep) => {
        if (Math.random() < 0.0005) {
            document
                .getElementById("sheep" + Math.floor(Math.random() * 3 + 1))
                ?.play();
        }

        const dist = Math.sqrt(
            (sheep.x + 16 - fleePoint.x) ** 2 +
                (sheep.y + 16 - fleePoint.y) ** 2,
        );
        if (dist < RADIUS * RADIUS) {
            const angle = Math.atan2(
                fleePoint.y - (sheep.y + 16),
                fleePoint.x - (sheep.x + 16),
            );
            sheep.x -= (Math.cos(angle) * (RADIUS - Math.sqrt(dist))) / 2;
            sheep.y -= (Math.sin(angle) * (RADIUS - Math.sqrt(dist))) / 2;
            if (Math.cos(angle) < 0) sheep.reverse = true;
            else sheep.reverse = false;
        }
        if (sheep.x < PAD) sheep.x = PAD;
        if (sheep.x > 960 - PAD - 32) sheep.x = 960 - PAD - 32;
        if (sheep.y < PAD) sheep.y = PAD;
        if (sheep.y > 540 - PAD - 32) sheep.y = 540 - PAD - 32;

        let distTargetSquare =
            (sheep.x + 16 - target.x) ** 2 + (sheep.y + 16 - target.y) ** 2;
        if (distTargetSquare < target.radius * target.radius) {
            sheep.inside = true;
        } else {
            sheep.inside = false;
        }
    });

    if (
        sheeps.filter((x) => x.inside).length === sheeps.length &&
        window.gameState != "win"
    ) {
        window.timers[window.level] = Math.floor(window.frameCount / 60);
        window.gameState = "win";
        document.getElementById("congrats")?.play();
    }
}
