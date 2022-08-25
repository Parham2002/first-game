const gameBox = document.querySelector(".game-box")


let code= ``
let minesList = [];
for (i=1; i<201; i++) {
    code = code + `<button class="game-box__buttons"></button>`
}
gameBox.innerHTML = code
const buttons = document.querySelectorAll(".game-box__buttons")


let mineChance = 40;
const mineField = (Chance) => {
    buttons.forEach((button) => {
        let percentage = Math.floor(Math.random() * 100)
        if (percentage < Chance) {
            button.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>"
            minesList.push(button)
        }
    })
}
const minedButtons = document.querySelectorAll(".game-box__mines")



const buttonIsClicked = (button) => button.forEach((x) => {
    x.addEventListener("click", () =>{
       if (x.innerHTML.includes("game-box__mines")) {
        console.log("FAILED");
       } else {
        x.innerText = 1
       }
    })
})

buttonIsClicked(buttons)
mineField(mineChance)

console.log(minedButtons);