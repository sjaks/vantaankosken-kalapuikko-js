var canvas = document.getElementById("container");
canvas.style.height = window.innerHeight;
canvas.style.width = window.innerWidth;
ch = canvas.style.height;
cw = canvas.style.width;


// Initialize the game
function init() {
    // Hide the lander screen
    if ( document.getElementsByClassName("lander").length > 0)
        document.getElementsByClassName("lander")[0].remove();

    clearScreen();
    var bgSize = calculateFullScreenImageSize();

    // Draw the first view
    drawImg("school", 0, 0, bgSize.x, bgSize.y);
    writeText("Vantaankosken", -100, 70, "Arial", 70, "blue");
    writeText("KALAPUIKKOPELI", -100, 170, "Arial", 70, "blue");
    addButton("ALOITA", -100, 400, 400, 150, "fishfinger", "choiceScreen()")

    // Play the introduction sound
    var audio = new Audio('sounds/vantaankoskenkalapuikkopeli.mp3');
    audio.play();
}


// Ask the question
function choiceScreen() {
    clearScreen();

    var bgSize = calculateFullScreenImageSize();
    drawImg("plate", 0, 0, bgSize.x, bgSize.y);

    writeText("Ota neljäs kalapuikko", 100, 70, "Arial", 50, "black");
    addButton("Joo", 200, 200, 160, 120, "blue", "checkChoice(true)")
    addButton("Ei", -200, 200, 160, 120, "blue", "checkChoice(false)")

    drawImg("fishfinger", window.innerWidth / 2 + 200, window.innerHeight / 2 - 200, 250, 100);
    drawImg("fishfinger", window.innerWidth / 2, window.innerHeight / 2, 250, 100);
    drawImg("fishfinger", window.innerWidth / 2 - 300, window.innerHeight / 2 + 150, 250, 100);
    drawImg("fishfinger", window.innerWidth / 2 - 300, window.innerHeight / 2 - 200, 250, 100);

    var audio = new Audio('sounds/otaneljaskalapuikko.mp3');
    audio.play();
}


// Check for win
function checkChoice(tookTheFourtOne) {
    clearScreen();
    var bgSize = calculateFullScreenImageSize();
    var won;

    if (tookTheFourtOne) {
        drawImg("policecar", 0, 0, bgSize.x, bgSize.y);
        writeText("PIIPAA-PIIPAA", -200, 70, "Arial", 70, "white");

        var audio = new Audio('sounds/piipaapiipaa.mp3');
        audio.play();

        won = false;
    } else {
        drawImg("cookerlady", 0, 0, bgSize.x, bgSize.y);

        var audio = new Audio('sounds/hihhihhii.mp3');
        audio.play();

        won = true;
    }

    setTimeout(function() {
        // Change screen
        clearScreen();

        if (won) {
            writeText("VOITIT", 100, 70, "Sigmar One", 80, "black");
            writeText("PELIN", 100, 200, "Sigmar One", 80, "black");

            var audio = new Audio('sounds/voititpelin.mp3');
            audio.play();
        } else {
            writeText("HÄVISIT", 100, 70, "Sigmar One", 80, "black");
            writeText("PELIN", 100, 200, "Sigmar One", 80, "black");

            var audio = new Audio('sounds/havisitpelin.mp3');
            audio.play();
        }

        drawImg("fishfinger", -100, 40, 400, 150);
        drawImg("fishfinger", -100, 220, 400, 150);
        addButton("UUDESTAAN", -100, 400, 400, 150, "fishfinger", "init()")
    }, 1850);

}


// Draws a PNG in the given location
function drawImg(imgName, x, y, w, h) {
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
    canvas.appendChild(newImg);
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
