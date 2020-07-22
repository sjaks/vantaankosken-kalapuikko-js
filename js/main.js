var canvas = document.getElementById("container");
canvas.style.height = window.innerHeight;
canvas.style.width = window.innerWidth;
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
preloadImg("fishfinger", window.innerWidth / 2 + 200, window.innerHeight / 2 - 200, 250, 100);
preloadImg("fishfinger", window.innerWidth / 2, window.innerHeight / 2, 250, 100);
preloadImg("fishfinger", window.innerWidth / 2 - 300, window.innerHeight / 2 + 150, 250, 100);
preloadImg("fishfinger", window.innerWidth / 2 - 300, window.innerHeight / 2 - 200, 250, 100);
preloadImg("policecar", 0, 0, bgSize.x, bgSize.y);
preloadImg("cookerlady", 0, 0, bgSize.x, bgSize.y);
preloadImg("fishfinger", -100, 40, 400, 150);
preloadImg("fishfinger", -100, 220, 400, 150);


// Initialize the game
function init() {
    // Hide the lander screen
    if ( document.getElementsByClassName("lander").length > 0)
        document.getElementsByClassName("lander")[0].remove();

    clearScreen();
    

    // Draw the first view
    showImg("school");
    writeText("Vantaankosken", -100, 70, "Arial", 70, "blue");
    writeText("KALAPUIKKOPELI", -100, 170, "Arial", 70, "blue");
    addButton("ALOITA", -100, 400, 400, 150, "fishfinger", "choiceScreen()")

    // Play the introduction sound
    audio1.play();
}


// Ask the question
function choiceScreen() {
    clearScreen();

    preloadImg
    showImg("plate");

    writeText("Ota neljäs kalapuikko", 100, 70, "Arial", 50, "black");
    addButton("Joo", 200, 200, 160, 120, "blue", "checkChoice(true)")
    addButton("Ei", -200, 200, 160, 120, "blue", "checkChoice(false)")

    showImg("fishfinger");
    showImg("fishfinger");
    showImg("fishfinger");
    showImg("fishfinger");

    audio2.play();
}


// Check for win
function checkChoice(tookTheFourtOne) {
    clearScreen();
    
    var won;

    if (tookTheFourtOne) {
        showImg("policecar");
        writeText("PIIPAA-PIIPAA", -200, 70, "Arial", 70, "white");

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
            writeText("VOITIT", 100, 70, "Sigmar One", 80, "black");
            writeText("PELIN", 100, 200, "Sigmar One", 80, "black");
            audio5.play();
        } else {
            writeText("HÄVISIT", 100, 70, "Sigmar One", 80, "black");
            writeText("PELIN", 100, 200, "Sigmar One", 80, "black");
            audio6.play();
        }

        showImg("fishfinger");
        showImg("fishfinger");
        addButton("UUDESTAAN", -100, 400, 400, 150, "fishfinger", "init()")
    }, 1850);

}


// Creates an img element
function preloadImg(imgName, x, y, w, h) {
    var newImg = document.createElement("img");
    newImg.src = "images/png/" + imgName + ".png";
    newImg.style.position = "absolute";

    if (x > 0) {
        newImg.style.left = x;
    } else {
        newImg.style.right = -x;
    }

    if (y > 0) {
        newImg.style.top = y;
    } else {
        newImg.style.bottom = -y;
    }
    
    newImg.style.height = h;
    newImg.style.width = w;
    newImg.className = "img";

    images[imgName] = newImg;
}


// Prints an img element on the canvas
function showImg(imgName) {
    canvas.appendChild(images[imgName]);
}


// Writes text on the page
function writeText(str, x, y, font, size, color) {
    var newTxt = document.createElement("span");
    newTxt.style.position = "absolute";

    if (x > 0) {
        newTxt.style.left = x;
    } else {
        newTxt.style.right = -x;
    }

    if (y > 0) {
        newTxt.style.top = y;
    } else {
        newTxt.style.bottom = -y;
    }

    newTxt.style.fontSize = size;
    newTxt.style.color = color;
    newTxt.style.fontFamily = font;
    newTxt.innerHTML = str;
    newTxt.className = "txt";
    canvas.appendChild(newTxt);
}


// Creates a clickable button element
function addButton(str, x, y, w, h, bg, func) {
    var newBtn = document.createElement("div");
    newBtn.style.position = "absolute";

    if (x > 0) {
        newBtn.style.left = x;
    } else {
        newBtn.style.right = -x;
    }

    if (y > 0) {
        newBtn.style.top = y;
    } else {
        newBtn.style.bottom = -y;
    }

    newBtn.style.height = h;
    newBtn.style.width = w;
    newBtn.style.background = "url(images/png/" + bg + ".png)";
    newBtn.style.backgroundSize = "cover";
    newBtn.className = "btn";
    newBtn.setAttribute("onclick", func);

    var newBtnTxt = document.createElement("div");
    newBtnTxt.style.textAlign = "center";
    newBtnTxt.style.paddingTop = 30;
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
    var x = window.innerWidth;
    var y = window.innerHeight;

    if (x > y) {
        y = "auto";
    } else {
        x = "auto";
    }

    return {x: x, y: y};
}
