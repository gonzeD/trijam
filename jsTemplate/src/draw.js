let draw_images = {};
export function loadImg(filename, id, size = 32) {
    var prefix = "img/";

    draw_images[id] = { size: size };
    draw_images[id].img = new Image();
    draw_images[id].img.src = prefix + filename;
}

export function drawImg(id, x, y, frame = 0) {
    if (draw_images[id]) {
        ctx.drawImage(
            draw_images[id].img,
            frame * draw_images[id].size,
            0,
            draw_images[id].size,
            draw_images[id].size,
            x,
            y,
            draw_images[id].size,
            draw_images[id].size,
        );
    }
}
