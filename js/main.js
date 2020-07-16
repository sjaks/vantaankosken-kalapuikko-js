var c = document.getElementById("c");
var ctx = c.getContext("2d");
var ch = c.height;
var cw = c.width;
var waitForImage = 0;


// Initialize the game
function init() {
    // Listen for clicks and get mouse position
    c.addEventListener("click", function(evt) {
        var mousePos = getCursorCoords(c, evt);
        console.log(mousePos.x + ',' + mousePos.y)
    }, false);

    // Draw the first view
    drawImg("school.png", 0, 0, cw, ch);
    writeText("Vantaankosken", 400, 70, "Arial", 50, "blue");
    writeText("KALAPUIKKOPELI", 340, 170, "Arial", 50, "blue");
    addButton("ALOITA", 300, 400, 400, 150, "fishfinger.png")
}


// Returns cursor location as an object {x, y}
function getCursorCoords(c, evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


// Draws a PNG on the canvas in  the given location
function drawImg(imgName, x, y, w, h) {
    waitForImage++;
    var img = new Image();
    img.src = "images/png/" + imgName;
    img.onload = () => {
        ctx.drawImage(img, x, y, w, h);
        waitForImage--;
    };
}


// Writes text on the canvas.
// Waits until images have loaded to avoid overlap
function writeText(str, x, y, font, size, color) {
    var tryUntilReady = setInterval(function() {
        if (waitForImage == 0) {
            clearInterval(tryUntilReady);
            ctx.fillStyle = color;
            ctx.font = size + "px " + font;
            ctx.fillText(str, x, y);
        }
    }, 1);
}


// Creates a clickable button element
// Waits until images have loaded to avoid overlap
function addButton(str, x, y, w, h, bg) {
    var tryUntilReady = setInterval(function() {
        if (waitForImage == 0) {
            clearInterval(tryUntilReady);
            drawImg(bg, x, y, w, h);
            writeText(str, x + 90, y + 90, "Arial", 60, "white");
        }
    }, 1);
}


init();
