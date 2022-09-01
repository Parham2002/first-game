const gameInfo = document.querySelector(".info-box")
const gameBox = document.querySelector(".game-box")
const gameWindow = document.querySelector(".game-Window")
let code= ``
let minesList = [];
let validSquares = 0;
const difficulty= 40;

// Function for generating lots of squares
const generateSquares= () => {
    for (i=1; i<201; i++) {
        // Give all generating buttons an id
        code = code + `<button id="${i}" class="game-box__buttons"></button>`
        validSquares += 1;
    }
    // Insert the buttons into the html file
    gameBox.innerHTML = code
}

// Function to randomly select squares and tag them as a mine
const mineField = (Chance) => {
    buttons.forEach((button) => {
        let percentage = Math.floor(Math.random() * 100)
        if (percentage <= Chance) {
            button.innerHTML = "<img class='game-box__mines'></img>"
            minesList.push(button)
        }
    })
    validSquares -= minesList.length
}


// Function for interacting with squares
const buttonIsClicked = (button) => button.forEach((box) => {
    box.addEventListener("click", () =>{
       if (box.innerHTML.includes("game-box__mines")) {
            hasWon(false)
       } else if (validSquares == 0) {
            hasWon(true)
       } else {
            box.innerText = nearbyMines(box)
            validSquares--;
            
       }
       generateInfo()
    })
})

// Function for checking the next horizontal and vertical neighbouring squares for mines
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

// Function for win/lose conditions
const hasWon = (boolean) => {
    if (boolean) {
        minesList.forEach((mine) => {
            mine.innerHTML = "<img class='game-box__mines' src='./Assets/Mine.jpg' width='20px'></img>"
        })
        gameWindow.innerHTML = `
            <div class="notif-container">
                <h2>YOU WON!</h2>
                <img src="./assets/Victory.jpg" width="300px">
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
            </div>`;
    }
    const tryAgain = document.querySelector(".notif-buttons__item1")
    const notifContainer = document.querySelector(".notif-container")
    tryAgain.addEventListener("click", () => {
        notifContainer.remove()
    })

};


// Function to display info in the info-box of the game
const generateInfo = () => {
    gameInfo.innerHTML = `
    <div class="lhs">
        <div class="lhs__mines">#ofMines: ${minesList.length} <img src='./Assets/Mine.jpg' width='20px'></img></div>
        <div class="lhs__flags">Flags Left: coming soon</div>
        <div class="lhs__valid-squares">Valid Squares left: ${validSquares}</div>
    </div>
    <div class="rhs">
        <div class="rhs__guide"><button>?</button></div>
        <div class="rhs__time">Time Elapsed: feature coming soon</div>
    </div>`
    // const showGuide = document.querySelector(".rhs__guide > button")
    // showGuide.addEventListener("click", ()=> {
    //     gameWindow.innerHTML += `
    //     <div class="guide-container">
    //         <h2>Instructions</h2>
    //         <p>Use left mouse to check squares.</p>
    //         <p>Use scroll/middle mouse to put down flags.</p>
    //         <br>
    //         <p>Your goal is to identify all squares that do not contain a mine.</p>
    //         <p>clicking on an empty square will give you a hint on how many bombs are next to it.</p>
    //         <div class="guide-buttons">
    //             <button class="guide-buttons__item1">OK</button>
    //         </div>
    //     </div>`;
    //     const guideButton = document.querySelector(".guide-buttons__item1")
    //     const closeGuide = document.querySelector(".guide-container")
    //     guideButton.addEventListener("click", () => {
    //         closeGuide.remove()
    //         console.log(closeGuide);
            
    //     })
    // })
}

// Calling functions in order
generateSquares()
let buttons = document.querySelectorAll(".game-box__buttons")
mineField(difficulty)
buttonIsClicked(buttons)
generateInfo()