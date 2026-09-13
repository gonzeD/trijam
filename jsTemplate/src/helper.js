export function text(initStr, x, y, size, much, color, width) {
    if (much < 0 || much === undefined) much = 99999;

    let str = initStr.substring(0, much);
    let words = str.split(" ");
    let initWords = initStr.split(" ");
    ctx.font = (size ?? 20) + "px pixel";

    ctx.fillStyle = color ?? "black";

    var actualStr = "";

    for (var i = 0; i < words.length; i++) {
        if (words[i] == "<br/>") {
            rawText(actualStr, x, y, color);
            y += size + 10;
            actualStr = "";
        } else {
            var w = 0;
            if (i == words.length - 1) {
                w = ctx.measureText(actualStr + initWords[i]).width;
            } else w = ctx.measureText(actualStr + words[i]).width;
            if (w > (width ?? 960)) {
                rawText(actualStr, x, y, color);
                y += size + 5;
                actualStr = words[i];
                if (i < words.length - 1) actualStr += " ";
            } else {
                actualStr += words[i];
                if (i < words.length - 1) actualStr += " ";
            }
        }
    }
    rawText(actualStr, x, y, color);
}

export function rawText(actualStr, x, y, color) {
    if (color == "grey") {
        ctx.fillStyle = "black";
        ctx.fillText(actualStr, x, y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white";
        ctx.strokeText(actualStr, x, y);
    } else ctx.fillText(actualStr, x, y);
}
