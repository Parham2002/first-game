"use strict";

var gameBox = document.querySelector(".game-box");
var code = "";
var minesList = [];
var buttonId = [];

for (i = 1; i < 201; i++) {
  buttonId.push(i);
  code = code + "<button id=\"".concat(i, "\" class=\"game-box__buttons\">").concat(i, "</button>");
}

gameBox.innerHTML = code;
var buttons = document.querySelectorAll(".game-box__buttons");
var mineChance = 40;

var mineField = function mineField(Chance) {
  buttons.forEach(function (button) {
    var percentage = Math.floor(Math.random() * 100);

    if (percentage <= Chance) {
      button.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>";
      minesList.push(button);
    }
  });
};

var buttonIsClicked = function buttonIsClicked(button) {
  return button.forEach(function (box) {
    box.addEventListener("click", function () {
      if (box.innerHTML.includes("game-box__mines")) {
        alert("YOU FAILED");
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

  console.log(clickedBox.id);
  console.log(buttons[clickedBox.id]);
  return numberOfMines;
};

buttonIsClicked(buttons);
mineField(mineChance);