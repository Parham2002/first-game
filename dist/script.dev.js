"use strict";

var gameBox = document.querySelector(".game-box");
var code = "";

for (i = 1; i < 201; i++) {
  code = code + "<button class=\"game-box__buttons\"></button>";
}

gameBox.innerHTML = code;
var buttons = document.querySelectorAll(".game-box__buttons");
buttons.forEach(function (button) {
  var mines = Math.floor(Math.random() * 100 + 1);

  if (mines < 35) {
    button.innerText = "*";
  }
});

var buttonIsClicked = function buttonIsClicked(button) {
  return button.forEach(function (x) {
    x.addEventListener("click", function () {
      x.innerText = 1;
    });
  });
};

buttonIsClicked(buttons);
console.log(Math.floor(Math.random() * 20) + 1);