import { drawImg } from "./draw";
import { levels } from "./levels";

let dog = {};
export function dog_init() {
    dog.x = 0;
    dog.y = 540 / 2;
}

export function dog_draw(mouse) {
    const l = levels[window.level];
    if (!l.dog) return;
    drawImg(
        "dog",
        l.dog ? dog.x : mouse.x - 16,
        l.dog ? dog.y : mouse.y - 16,
        dog.walking
            ? Math.floor(window.frameCount / 20) % 4
            : (Math.floor(window.frameCount / 5) % 8) + 4,
        dog.reverse,
    );
}

export function dog_frame(mouse) {
    if (Math.random() < 0.005) {
        document
            .getElementById("woof" + Math.floor(Math.random() * 3 + 1))
            .play();
    }
    const angle = Math.atan2(mouse.y - (dog.y + 16), mouse.x - (dog.x + 16));

    dog.angle = angle;
    if (Math.cos(angle) > 0) dog.reverse = true;
    else dog.reverse = false;
    const dist = Math.sqrt(
        (mouse.x - (dog.x + 16)) ** 2 + (mouse.y - (dog.y + 16)) ** 2,
    );
    if (dist > 5) {
        dog.x +=
            Math.cos(angle) *
            4 *
            Math.min(Math.max(Math.sqrt(dist / 100), 1), 2);
        dog.y +=
            Math.sin(angle) *
            4 *
            Math.min(Math.max(Math.sqrt(dist / 100), 1), 2);

        dog.walking = true;
    } else {
        dog.walking = false;
    }
    return dog;
}
