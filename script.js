const gameBox = document.querySelector(".game-box")


let code= ``
for (i=1; i<201; i++) {
    code = code + `<button class="game-box__buttons"></button>`
}
gameBox.innerHTML = code
const buttons = document.querySelectorAll(".game-box__buttons")

const buttonIsClicked = (button) => button.forEach((x) => {
    x.addEventListener("click", () =>{
        console.log("IT WORKS!");
    })
})

buttonIsClicked(buttons)

