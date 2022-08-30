"use strict";

var gameInfo = document.querySelector(".info-box");
var gameBox = document.querySelector(".game-box");
var gameWindow = document.querySelector(".game-Window");
var code = "";
var minesList = [];

var generateSquares = function generateSquares() {
  for (i = 1; i < 201; i++) {
    code = code + "<button id=\"".concat(i, "\" class=\"game-box__buttons\"></button>");
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
};

var buttonIsClicked = function buttonIsClicked(button) {
  return button.forEach(function (box) {
    box.addEventListener("click", function () {
      if (box.innerHTML.includes("game-box__mines")) {
        hasWon(false);
      } else {
        box.innerText = nearbyMines(box);
      }
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

var difficulty = 30;

var hasWon = function hasWon(_boolean) {
  if (_boolean) {
    minesList.forEach(function (mine) {
      mine.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>";
    });
    gameWindow.innerHTML += "\n            <div class=\"notif-container\">\n                <h2>YOU WON</h2>\n                <div class=\"notif-buttons\">\n                    <button class=\"notif-buttons__item1\">Try Again</button>\n                </div>\n            </div>";
  } else {
    minesList.forEach(function (mine) {
      mine.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>";
    });
    gameWindow.innerHTML += "\n            <div class=\"notif-container\">\n                <h2>BOOM! Git gud.</h2>\n                <div class=\"notif-buttons\">\n                    <button class=\"notif-buttons__item1\">Try Again</button>\n                </div>\n            </div>";
  }
};

generateSquares();
var buttons = document.querySelectorAll(".game-box__buttons");
mineField(difficulty);
buttonIsClicked(buttons);

var generateInfo = function generateInfo() {
  gameInfo.innerHTML = "\n    <div class=\"lhs\">\n        <div class=\"info-box__mines\">#ofMines: ".concat(minesList.length, " <img src='./Assets/Mine.jpg' width='20px'></img></div>\n        <div class=\"info-box__flags\">Flags Left: <img src='./Assets/flag.png' width='20px'></img></div>\n        <div class=\"info-box__valid-squares\">Valid Squares: </div>\n    </div>\n    <div class=\"rhs\">\n        <div class=\"info-box__time\">Time Elapsed: </div>\n    </div>");
};

generateInfo();