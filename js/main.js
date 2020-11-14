var canvas = document.getElementById("container");
canvas.style.height = 600;
canvas.style.width = 800;
canvas.style.border = "1px black solid";
canvas.style.margin = "50px auto";
canvas.style.position = "relative";
canvas.style.overflow = "hidden";
canvas.style.zIndex = -1;
ch = canvas.style.height;
cw = canvas.style.width;


// Preload all assets
var audio1 = new Audio('sounds/vantaankoskenkalapuikkopeli.mp3');
var audio2 = new Audio('sounds/otaneljaskalapuikko.mp3');
var audio3 = new Audio('sounds/piipaapiipaa.mp3');
var audio4 = new Audio('sounds/hihhihhii.mp3');
var audio5 = new Audio('sounds/voititpelin.mp3');
var audio6 = new Audio('sounds/havisitpelin.mp3');

var bgSize = calculateFullScreenImageSize();
var images = {};

preloadImg("school", 0, 0, bgSize.x, bgSize.y);
preloadImg("plate", 0, 0, bgSize.x, bgSize.y);
preloadImg("fishfinger", 0, 0, 400, 150);
preloadImg("policecar", 0, 0, bgSize.x, bgSize.y);
preloadImg("cookerlady", 0, 0, bgSize.x, bgSize.y);


// Initialize the game
function init() {
    // Hide the lander screen
    if ( document.getElementsByClassName("lander").length > 0)
        document.getElementsByClassName("lander")[0].remove();

    clearScreen();

    // Draw the first view
    canvas.style.zIndex = 1; // Move the canvas to the top
    showImg("school");
    writeText("Vantaankosken", 470, 20, "Arial", 40, "blue");
    writeText("KALAPUIKKOPELI", 420, 85, "Arial", 40, "blue");
    addButton("ALOITA", 380, 400, 400, 150, 50, "fishfinger", "choiceScreen()")

    // Play the introduction sound
    audio1.play();
}


// Ask the question
function choiceScreen() {
    clearScreen();

    showImg("plate");
    writeText("Ota neljäs kalapuikko", 70, 40, "Arial", 70, "black");
    addButton("Joo", 40, 200, 106, 80, 30, "blue", "checkChoice(true)")
    addButton("Ei", 650, 200, 106, 80, 30, "blue", "checkChoice(false)")

    audio2.play();
}


// Check for win
function checkChoice(tookTheFourtOne) {
    clearScreen();
    
    var won;

    if (tookTheFourtOne) {
        showImg("policecar");
        writeText("PIIPAA-PIIPAA", 50, 70, "Arial", 70, "white");

        audio3.play();
        won = false;
    } else {
        showImg("cookerlady");

        audio4.play();
        won = true;
    }

    setTimeout(function() {
        // Change screen
        clearScreen();

        if (won) {
            writeText("VOITIT", 15, 100, "Sigmar One", 80, "black");
            writeText("PELIN", 45, 250, "Sigmar One", 80, "black");
            audio5.play();
            showImg("fishfinger", 390, 20);
            showImg("fishfinger", 390, 210);
        } else {
            writeText("HÄVISIT", 15, 100, "Sigmar One", 80, "black");
            writeText("PELIN", 65, 250, "Sigmar One", 80, "black");
            audio6.play();
            showImg("fishfinger", 390, 0); // 4th fish finger if lost
            showImg("fishfinger", 390, 132);
            showImg("fishfinger", 390, 267);
        }

        addButton("UUDESTAAN", 390, 400, 400, 150, 50, "fishfinger", "init()")
    }, 1850);

}


// Creates an img element
function preloadImg(imgName, x, y, w, h) {
    var newImg = document.createElement("img");
    newImg.src = "images/png/" + imgName + ".png";
    newImg.style.position = "absolute";

    newImg.style.left = x;
    newImg.style.top = y;
    
    newImg.style.height = h;
    newImg.style.width = w;
    newImg.className = "img";

    images[imgName] = newImg;
}


// Prints an img element on the canvas
function showImg(imgName, x, y) {
    var img = images[imgName].cloneNode(true);
    if (x) img.style.left = x;
    if (y) img.style.top = y;
    canvas.appendChild(img);
}


// Writes text on the page
function writeText(str, x, y, font, size, color) {
    var newTxt = document.createElement("span");
    newTxt.style.position = "absolute";

    newTxt.style.left = x;
    newTxt.style.top = y;

    newTxt.style.fontSize = size;
    newTxt.style.color = color;
    newTxt.style.fontFamily = font;
    newTxt.innerHTML = str;
    newTxt.className = "txt";
    canvas.appendChild(newTxt);
}


// Creates a clickable button element
function addButton(str, x, y, w, h, s, bg, func) {
    var newBtn = document.createElement("div");
    newBtn.style.position = "absolute";

    newBtn.style.left = x;
    newBtn.style.top = y;

    newBtn.style.height = h;
    newBtn.style.width = w;
    newBtn.style.background = "url(images/png/" + bg + ".png)";
    newBtn.style.backgroundSize = "cover";
    newBtn.className = "btn";
    newBtn.setAttribute("onclick", func);

    var newBtnTxt = document.createElement("div");
    newBtnTxt.style.textAlign = "center";
    newBtnTxt.style.paddingTop = 30;
    newBtnTxt.style.fontSize = s;
    newBtnTxt.innerHTML = str;
    newBtnTxt.className = "btnTxt";

    newBtn.appendChild(newBtnTxt);
    canvas.appendChild(newBtn);
}


// Removes all elements from the canvas
function clearScreen() {
    canvas.innerHTML = "";
}


// Returns image size so it covers the whole window
function calculateFullScreenImageSize() {
    if (cw > ch) {
        ch = "100%";
        cw = "auto";
    } else {
        cw = "100%";
        ch = "auto";
    }
    return {x: cw, y: ch};
}
