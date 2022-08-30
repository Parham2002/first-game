const gameInfo = document.querySelector(".info-box")
const gameBox = document.querySelector(".game-box")
const gameWindow = document.querySelector(".game-Window")
let code= ``
let minesList = [];


const generateSquares= () => {
    for (i=1; i<201; i++) {
        code = code + `<button id="${i}" class="game-box__buttons"></button>`
    }
    gameBox.innerHTML = code
}


const mineField = (Chance) => {
    buttons.forEach((button) => {
        let percentage = Math.floor(Math.random() * 100)
        if (percentage <= Chance) {
            button.innerHTML = "<img class='game-box__mines'></img>"
            minesList.push(button)
        }
    })
}



const buttonIsClicked = (button) => button.forEach((box) => {
    box.addEventListener("click", () =>{
       if (box.innerHTML.includes("game-box__mines")) {
        hasWon(false)
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
    return numberOfMines
}

const difficulty= 30;
const hasWon = (boolean) => {
    if (boolean) {
        minesList.forEach((mine) => {
            mine.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>"
        })
        gameWindow.innerHTML += `
            <div class="notif-container">
                <h2>YOU WON</h2>
                <div class="notif-buttons">
                    <button class="notif-buttons__item1">Try Again</button>
                </div>
            </div>`
    } else {
        minesList.forEach((mine) => {
            mine.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>"
        })
        gameWindow.innerHTML += `
            <div class="notif-container">
                <h2>BOOM! Git gud.</h2>
                <div class="notif-buttons">
                    <button class="notif-buttons__item1">Try Again</button>
                </div>
            </div>`
    }

};


generateSquares()
const buttons = document.querySelectorAll(".game-box__buttons")
mineField(difficulty)
buttonIsClicked(buttons)

const generateInfo = () => {
    gameInfo.innerHTML = `
    <div class="lhs">
        <div class="info-box__mines">#ofMines: ${minesList.length} <img src='./Assets/Mine.jpg' width='20px'></img></div>
        <div class="info-box__flags">Flags Left: <img src='./Assets/flag.png' width='20px'></img></div>
        <div class="info-box__valid-squares">Valid Squares: </div>
    </div>
    <div class="rhs">
        <div class="info-box__time">Time Elapsed: </div>
    </div>`
}
generateInfo()