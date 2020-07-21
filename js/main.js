var c = document.getElementById("c");
var ctx = c.getContext("2d");
var ch = c.height;
var cw = c.width;
var waitForImage = 0;


var buttonAreas = [];


// Initialize the game
function init() {
    document.getElementsByClassName("lander")[0].remove();
    // Listen for clicks and get mouse position
    c.addEventListener("click", function(evt) {
        var mousePos = getCursorCoords(c, evt);
        console.log(mousePos.x + ',' + mousePos.y)
        checkClickArea(mousePos.x, mousePos.y);
    }, false);

    // Draw the first view
    drawImg("school.png", 0, 0, cw, ch);
    writeText("Vantaankosken", 400, 70, "Arial", 50, "blue");
    writeText("KALAPUIKKOPELI", 340, 170, "Arial", 50, "blue");
    addButton("ALOITA", 300, 400, 400, 150, "fishfinger.png")

    var audio = new Audio('sounds/vantaankoskenkalapuikkopeli.opus');
    audio.play();
}


// Ask the question
function choiceScreen() {
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.beginPath();
    ctx.translate(c.width / 2, c.height / 2 + 100);
    ctx.scale(4, 2);
    ctx.arc(6, 1, 60, 0, 2 * Math.PI, false);
    ctx.stroke();

    addButton("Joo", 300, 400, 400, 150, "blue.png");
    //addButton("Ei", 200, 100, 200, 100, "blue.png");

    var audio = new Audio('sounds/otaneljaskalapuikko.opus');
    audio.play();
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
            buttonAreas.push([x, y, x + w, y + h, choiceScreen]);
        }
    }, 1);
}


function checkClickArea(x, y) {
    for (var i = 0; i < buttonAreas.length; i++) {
        if (x > buttonAreas[i][0] && x < buttonAreas[i][2]) {
            if (y > buttonAreas[i][1] && y < buttonAreas[i][3]) {
                console.log("Clicked a button");
                buttonAreas[i][4]();
            }
        }
    }
}
