let draw_images = {};
export function loadImg(filename, id) {
    var prefix = "img/";

    draw_images[id] = new Image();
    draw_images[id].src = prefix + filename;
}

export function drawImg(id, x, y) {
    if (draw_images[id]) {
        ctx.drawImage(draw_images[id], x, y);
    }
}
