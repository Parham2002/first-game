"use strict";

var gameInfo = document.querySelector(".info-box");
var gameBox = document.querySelector(".game-box");
var gameWindow = document.querySelector(".game-Window");
var code = "";
var minesList = [];
var validSquares = 0;
var difficulty = 40;

var generateSquares = function generateSquares() {
  for (i = 1; i < 201; i++) {
    code = code + "<button id=\"".concat(i, "\" class=\"game-box__buttons\"></button>");
    validSquares += 1;
  }

  gameBox.innerHTML = code;
};

var mineField = function mineField(Chance) {
  buttons.forEach(function (button) {
    var percentage = Math.floor(Math.random() * 100);

    if (percentage <= Chance) {
      button.innerHTML = "<img class='game-box__mines'></img>";
      minesList.push(button);
    }
  });
  validSquares -= minesList.length;
};

var buttonIsClicked = function buttonIsClicked(button) {
  return button.forEach(function (box) {
    box.addEventListener("click", function () {
      if (box.innerHTML.includes("game-box__mines")) {
        hasWon(false);
      } else if (validSquares == 0) {
        hasWon(true);
      } else {
        box.innerText = nearbyMines(box);
        validSquares--;
      }

      generateInfo();
    });
  });
};

var nearbyMines = function nearbyMines(clickedBox) {
  var isRightEdge = clickedBox.id % 10 == 0;
  var isLeftEdge = clickedBox.id % 10 == 1;
  var numberOfMines = 0; // Right neighbour

  if (!isRightEdge && buttons[clickedBox.id].innerHTML.includes("game-box__mines")) {
    numberOfMines += 1;
  } // Left neighbour


  if (!isLeftEdge && buttons[clickedBox.id - 2].innerHTML.includes("game-box__mines")) {
    numberOfMines += 1;
  } // Top neighbour


  if (buttons[clickedBox.id - 11] >= buttons[0] && buttons[clickedBox.id - 11].innerHTML.includes("game-box__mines")) {
    numberOfMines += 1;
  } // Bottom neighbour


  if (buttons[clickedBox.id - -9] <= buttons[199] && buttons[clickedBox.id - -9].innerHTML.includes("game-box__mines")) {
    numberOfMines += 1;
  }

  return numberOfMines;
};

var hasWon = function hasWon(_boolean) {
  if (_boolean) {
    minesList.forEach(function (mine) {
      mine.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>";
    });
    gameWindow.innerHTML = "\n            <div class=\"notif-container\">\n                <h2>YOU WON!</h2>\n                <img src=\"./assets/Victory.jpg\" width=\"300px\">\n            </div>";
  } else {
    minesList.forEach(function (mine) {
      mine.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>";
    });
    gameWindow.innerHTML += "\n            <div class=\"notif-container\">\n                <h2>BOOM! Git gud.</h2>\n                <div class=\"notif-buttons\">\n                    <button class=\"notif-buttons__item1\">Try Again</button>\n                </div>\n            </div>";
  }

  var tryAgain = document.querySelector(".notif-buttons__item1");
  var notifContainer = document.querySelector(".notif-container");
  tryAgain.addEventListener("click", function () {
    notifContainer.remove();
    code = "";
    gameBox.innerHTML = "";
    buttons = document.querySelectorAll(".game-box__buttons");
    buttonIsClicked(buttons);
  });
};

var generateInfo = function generateInfo() {
  gameInfo.innerHTML = "\n    <div class=\"lhs\">\n        <div class=\"lhs__mines\">#ofMines: ".concat(minesList.length, " <img src='./Assets/Mine.jpg' width='20px'></img></div>\n        <div class=\"lhs__flags\">Flags Left: coming soon</div>\n        <div class=\"lhs__valid-squares\">Valid Squares left: ").concat(validSquares, "</div>\n    </div>\n    <div class=\"rhs\">\n        <div class=\"rhs__guide\"><button>?</button></div>\n        <div class=\"rhs__time\">Time Elapsed: feature coming soon</div>\n    </div>"); // const showGuide = document.querySelector(".rhs__guide > button")
  // showGuide.addEventListener("click", ()=> {
  //     gameWindow.innerHTML += `
  //     <div class="guide-container">
  //         <h2>Instructions</h2>
  //         <p>Use left mouse to check squares.</p>
  //         <p>Use scroll/middle mouse to put down flags.</p>
  //         <br>
  //         <p>Your goal is to identify all squares that do not contain a mine.</p>
  //         <p>clicking on an empty square will give you a hint on how many bombs are next to it.</p>
  //         <div class="guide-buttons">
  //             <button class="guide-buttons__item1">OK</button>
  //         </div>
  //     </div>`;
  //     const guideButton = document.querySelector(".guide-buttons__item1")
  //     const closeGuide = document.querySelector(".guide-container")
  //     guideButton.addEventListener("click", () => {
  //         closeGuide.remove()
  //         console.log(closeGuide);
  //     })
  // })
};

var resetGame = function resetGame() {
  code = "";
  minesList = [];
  buttons = [];
  generateSquares();
  mineField(difficulty);
  buttonIsClicked(buttons);
  generateInfo();
};

generateSquares();
var buttons = document.querySelectorAll(".game-box__buttons");
mineField(difficulty);
buttonIsClicked(buttons);
generateInfo();