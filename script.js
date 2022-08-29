const gameBox = document.querySelector(".game-box")


let code= ``
let minesList = [];
let buttonId= [];
for (i=1; i<201; i++) {
    buttonId.push(i)
    code = code + `<button id="${i}" class="game-box__buttons">${i}</button>`
}
gameBox.innerHTML = code
const buttons = document.querySelectorAll(".game-box__buttons")

let mineChance = 40;
const mineField = (Chance) => {
    buttons.forEach((button) => {
        let percentage = Math.floor(Math.random() * 100)
        if (percentage <= Chance) {
            button.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>"
            minesList.push(button)
        }
    })
}



const buttonIsClicked = (button) => button.forEach((box) => {
    box.addEventListener("click", () =>{
       if (box.innerHTML.includes("game-box__mines")) {
        alert("YOU FAILED")
       } else {
        box.innerText = nearbyMines(box)
       }
    })
})


const nearbyMines = (clickedBox) => {
    const isRightEdge = (clickedBox.id % 10 == 0)
    const isLeftEdge = (clickedBox.id % 10 == 1)
    let numberOfMines = 0;
    // Right neighbour
    if (!isRightEdge && buttons[clickedBox.id].innerHTML.includes("game-box__mines")) {
        numberOfMines += 1
    }
    // Left neighbour
    if (!isLeftEdge && buttons[clickedBox.id-2].innerHTML.includes("game-box__mines")) {
        numberOfMines += 1
    }
    // Top neighbour
    if (buttons[clickedBox.id-11] >= buttons[0] && buttons[clickedBox.id-11].innerHTML.includes("game-box__mines")) {
        numberOfMines += 1
    }
    // Bottom neighbour
    if (buttons[clickedBox.id- -9] <= buttons[199] && buttons[clickedBox.id- -9].innerHTML.includes("game-box__mines")) {
        numberOfMines += 1
    }
    console.log(clickedBox.id);
    console.log(buttons[clickedBox.id]);
    return numberOfMines

    


}
buttonIsClicked(buttons)
mineField(mineChance)
