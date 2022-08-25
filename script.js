const gameBox = document.querySelector(".game-box")


let code= ``
for (i=1; i<201; i++) {
    code = code + `<button class="game-box__buttons"></button>`
}
gameBox.innerHTML = code
const buttons = document.querySelectorAll(".game-box__buttons")


buttons.forEach((button) => {
    let mines = Math.floor(Math.random() * 100 + 1)
    if (mines < 35) {
        button.innerText = "*"
    }
})

const buttonIsClicked = (button) => button.forEach((x) => {
    x.addEventListener("click", () =>{
        x.innerText = 1
    })
})

buttonIsClicked(buttons)

console.log(Math.floor(Math.random() * 20) +1);