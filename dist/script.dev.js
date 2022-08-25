"use strict";

var gameBox = document.querySelector(".game-box");
var code = "";
var minesList = [];

for (i = 1; i < 201; i++) {
  code = code + "<button class=\"game-box__buttons\"></button>";
}

gameBox.innerHTML = code;
var buttons = document.querySelectorAll(".game-box__buttons");
var mineChance = 40;

var mineField = function mineField(Chance) {
  buttons.forEach(function (button) {
    var percentage = Math.floor(Math.random() * 100);

    if (percentage < Chance) {
      button.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>";
      minesList.push(button);
    }
  });
};

var minedButtons = document.querySelectorAll(".game-box__mines");

var buttonIsClicked = function buttonIsClicked(button) {
  return button.forEach(function (x) {
    x.addEventListener("click", function () {
      if (x.innerHTML.includes("game-box__mines")) {
        console.log("FAILED");
      } else {
        x.innerText = 1;
      }
    });
  });
};

buttonIsClicked(buttons);
mineField(mineChance);
console.log(minedButtons);