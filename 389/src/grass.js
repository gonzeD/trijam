import { drawImg } from "./draw";
const grasses = [];
for (let i = 0; i < 50; i++) {
    grasses.push({
        x: Math.random() * 960,
        y: Math.random() * 540,
        which: Math.floor(Math.random() * 4),
    });
}

export function grass_draw() {
    for (const grass of grasses) {
        drawImg("grass", grass.x, grass.y, grass.which);
    }
}
