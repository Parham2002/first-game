"use strict";

var gameBox = document.querySelector(".game-box");
var code = "";

for (i = 1; i < 201; i++) {
  code = code + "<button class=\"game-box__buttons\"></button>";
}

gameBox.innerHTML = code;
var buttons = document.querySelectorAll(".game-box__buttons");

var buttonIsClicked = function buttonIsClicked(button) {
  return button.forEach(function (x) {
    x.addEventListener("click", function () {
      console.log("IT WORKS!");
    });
  });
};

buttonIsClicked(buttons);