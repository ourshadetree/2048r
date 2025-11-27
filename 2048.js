var board;
var score = 0;
var rows = 4;
var columns = 4;
let message = "";


window.onload = function() {
    setGame();
}

function setGame() {
    board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
    ]

    for (let r=0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if(!hasEmptyTile()) {
        return;
    }

    let found = false;
    while(!found) {
        //random r,c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if(num > 0) {
        tile.innerText = num;
        if(num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {

    if(e.code == "ArrowLeft") {
        message = "Use Arrow Keys to make 2048!";
        if(checkSlideLeft() === false) return;
            slideLeft();
            setTwo();
            isGameOver();
    } 
    else if(e.code == "ArrowRight") {
        message = "Use Arrow Keys to make 2048!";
        if(checkSlideRight() === false) return;
            slideRight(); 
            setTwo(); 
            isGameOver();
    }
    else if(e.code == "ArrowUp") {
        message = "Use Arrow Keys to make 2048!";
        if(checkSlideUp() === false) return;
            slideUp();
            setTwo();
            isGameOver();
    }
    else if(e.code == "ArrowDown") {
        message = "Use Arrow Keys to make 2048!";
        if(checkSlideDown() === false) return;
            slideDown();
            setTwo();
            isGameOver();
    }
    else {
        return;
    }
    
    //if user cannot merge or move a tile, the swipe cannot happen
    //check for game over
    //game over message
    //reset button

    document.getElementById("score").innerText = score;
})

function isGameOver() {
    // 1. Any empty tile? -> not game over
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                return false;
            }
        }
    }

    // 2. Any horizontal merge possible? -> not game over
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] === board[r][c + 1]) {
                return false;
            }
        }
    }

    // 3. Any vertical merge possible? -> not game over
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] === board[r + 1][c]) {
                return false;
            }
        }
    }

    // 4. If we got here, no moves left -> GAME OVER
    const container = document.getElementById("gameContainer");
    message = "Game Over! Final Score: " + score;
    document.getElementById("message").innerText = message;

    // don't create multiple buttons if somehow called twice
    if (!document.getElementById("replay")) {
        const replay = document.createElement("button");
        replay.id = "replay";
        replay.className = "nes-btn is-success";
        replay.innerText = "Replay?";
        replay.addEventListener("click", restartGame);
        container.appendChild(replay);
    }

    return true;
}


function restartGame() {
    document.getElementById("board").innerHTML = "";
    const replayBtn = document.getElementById("replay");
    if (replayBtn) replayBtn.remove();

    message = "Use Arrow Keys to make 2048!";
    score = 0;

    setGame();
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = message;
}


function filterZero(row) {
    return row.filter(num => num != 0);
}

function checkSlideLeft() {
    message = "Use Arrow Keys to make 2048!";
    document.getElementById("message").innerText = message;
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        for(let i = 0; i < row.length-1; i++) {
            //check if zero before a tile
            //check if adjacent equal non-zeroes
            if(row[i] != 0 && row[i] == row[i+1]) {
                return true;
            } else if(row[i] == 0 && row[i+1] != 0) {
                return true;
            }
        } 
    }
    message = "Illegal Move!";
    document.getElementById("message").innerText = message;
    return false;
 }

 function checkSlideRight() {
    message = "Use Arrow Keys to make 2048!";
    document.getElementById("message").innerText = message;
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        for(let i = 3; i > 0; i--) {
            //check if zero before a tile
            //check if adjacent equal non-zeroes
            if(row[i] != 0 && row[i] == row[i-1]) {
                return true;
            } else if(row[i] == 0 && row[i-1] != 0) {
                return true;
            }
        } 
    }
    message = "Illegal Move!";
    document.getElementById("message").innerText = message;
    return false;
 }

 function checkSlideUp() {
    message = "Use Arrow Keys to make 2048!";
    document.getElementById("message").innerText = message;
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        for(let i = 0; i < row.length-1; i++) {
            //check if zero before a tile
            //check if adjacent equal non-zeroes
            if(row[i] != 0 && row[i] == row[i+1]) {
                return true;
            } else if(row[i] == 0 && row[i+1] != 0) {
                return true;
            }
        } 
    }
    message = "Illegal Move!";
    document.getElementById("message").innerText = message;
    return false;
 }

 function checkSlideDown() {
    message = "Use Arrow Keys to make 2048!";
    document.getElementById("message").innerText = message;
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        for(let i = 0; i < row.length-1; i++) {
            //check if zero before a tile
            //check if adjacent equal non-zeroes
            if(row[i] != 0 && row[i] == row[i+1]) {
                return true;
            } else if(row[i] == 0 && row[i+1] != 0) {
                return true;
            }
        } 
    }
    message = "Illegal Move!";
    document.getElementById("message").innerText = message;
    return false;
 }

function slide(row) {
    //[0, 2, 2, 2]
    row = filterZero(row); //get rid of zeroes -> [2, 2, 2]
    //slide
    for(let i = 0; i < row.length-1; i++) {
        //check every 2
        if(row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        } // [2, 2, 2] -> [4, 0, 2]
        
    }

    

    row = filterZero(row); //[4, 2]

    //add zeroes
    while(row.length < columns) {
        row.push(0);
        //[4, 2, 0, 2]
    }

    return row;
}


function slideLeft() {
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for(let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for(let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}