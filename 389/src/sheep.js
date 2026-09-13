import { drawImg } from "./draw";
import { text } from "./helper";

let sheeps = [];
let target = {
    x: 960 / 2,
    y: 540 / 2,
    radius: 100,
};
const PAD = 20;

export function sheep_init() {
    for (let i = 0; i < 50; i++) {
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
    ctx.arc(960 / 2, 540 / 2, target.radius, 0, 2 * Math.PI);
    ctx.stroke();

    sheeps
        .sort((a, b) => a.y - b.y)
        .forEach((sheep) => {
            drawImg(
                "sheep",
                sheep.x,
                sheep.y,
                Math.floor((frame + sheep.delay) / 5) % 8,
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
    sheeps.forEach((sheep) => {
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
}
