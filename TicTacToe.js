
function assignPlayer (player) {
    const playerPick = player;
    let AI_Choice = "";
    let player_Image;
    let AI_Image;
    if (playerPick !== undefined){
        if (playerPick === "X_Side") {
            AI_Choice = "O_Side"; 
            AI_Image = "O.png";
            player_Image = "X.png";
    
        } else{
            AI_Choice = "X_Side";
            AI_Image = "X.png";
            player_Image = "O.png";
        }        

    }   
    return {playerPick, AI_Choice, player_Image, AI_Image};
}
// move monitor and insertion
const gameBoard = (function (){
    const createBoard =  [[undefined, undefined, undefined],
                          [undefined, undefined, undefined],
                          [ undefined, undefined, undefined]];
    return {
        insertMove : function (row, column, value){
            if (row >= 0 && row < 3 && column >= 0 && column < 3) {
                createBoard[row][column] = value;
            } else {
                console.error("Invalid position");
            }
            return {createBoard};
        },
        getGameBoard : createBoard
    };
})();

// player and AI action
const gameMove =(function (getPlayerPick){
    let monitorMove = gameBoard.getGameBoard;
    //insert the move of the player to array to make the AI response
    const playerMove = function(getPlayerBoxClick, Player_Move){
        const getBoxId = getPlayerBoxClick;
        let indexCounting = 0;
        outerLoop: for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                indexCounting++;
                if (indexCounting === getBoxId){
                    let insertToBoard = gameBoard.insertMove(i, j, Player_Move);
                    break outerLoop;
                };
            };
        };
    };
    //Response of AI in every move
    let countMove = 0;
    let pattern = false;
    const AI_Response = function(getPlayerPick){
        const AI_Selected = assignPlayer(getPlayerPick);
        let AI_Move = "";
        if (AI_Selected.AI_Choice === "O_Side") {
            AI_Move = "O";
        } else{
            AI_Move = "X";
        };
        //First Move
        if (countMove === 0) {
            let rowIndex = Math.floor(Math.random() * 3);
            let columnIndex = Math.floor(Math.random() * 3);
            let noSimilarValue = false;

            while (noSimilarValue === false){
                if (monitorMove[rowIndex][columnIndex] === undefined){
                    let firstMove = gameBoard.insertMove(rowIndex, columnIndex, AI_Move);
                    noSimilarValue = true;
                } else{
                    rowIndex = Math.floor(Math.random() * 3);
                    columnIndex = Math.floor(Math.random() * 3);
                };
            }
            setTimeout(() => {
                getDisplayMoveOnBoard.mainFunction(getPlayerPick).display_AI_to_board(AI_Move);
            }, 2000);
            countMove++;
        //Second Move if player is X   
        } else if (countMove === 1 && AI_Move === "O"){

            //Row pattern
            let secondMove;
            for (let i = 0; i < 3; i++) {
                if (monitorMove[i][0] + monitorMove[i][1] === "XX" && monitorMove[i][2] === undefined){
                    secondMove = gameBoard.insertMove(i, 2, "O");
                    pattern = true;
                    countMove++; 
                    break;
                }else if (monitorMove[i][1] + monitorMove[i][2] === "XX" && monitorMove[i][0] === undefined){
                    secondMove = gameBoard.insertMove(i, 0, "O");
                    pattern = true;
                    countMove++; 
                    break;
                }
            };
            //column pattern
            for (let i = 0; i < 3; i++){
                if (monitorMove[0][i] + monitorMove[1][i] === "XX" && monitorMove[2][i] === undefined){
                    secondMove = gameBoard.insertMove(2, i, "O");
                    pattern = true;
                    countMove++; 
                    break;
                } else if (monitorMove[1][i] + monitorMove[2][i] === "XX" && monitorMove[0][i] === undefined){
                    secondMove = gameBoard.insertMove(0, i, "O");
                    pattern = true;
                    countMove++; 
                    break;
                };
            }
            //Diagonal pattern
            if (monitorMove[0][0] + monitorMove[1][1] === "XX" && monitorMove[2][2] === undefined){
                secondMove = gameBoard.insertMove(2, 2, "O");
                pattern = true;
                countMove++; 
            } else if (monitorMove[1][1] + monitorMove[2][2] === "XX" && monitorMove[0][0] === undefined){
                secondMove = gameBoard.insertMove(0, 0, "O");
                pattern = true;
                countMove++; 
            };
            if (monitorMove[2][0] + monitorMove[1][1] === "XX" && monitorMove[0][2] === undefined){
                secondMove = gameBoard.insertMove(0, 2, "O");
                pattern = true;
                countMove++; 
            } else if (monitorMove[0][2] + monitorMove[1][1] === "XX" && monitorMove[2][0] === undefined){
                secondMove = gameBoard.insertMove(2, 0, "O");
                pattern = true;
                countMove++; 
            };
            
            if (countMove === 1 && pattern === false){
                //Random insert if no pattern
                let rowIndex = Math.floor(Math.random() * 3);
                let columnIndex = Math.floor(Math.random() * 3);
                let noSimilarValue = false;
                while (noSimilarValue === false){
                    if (monitorMove[rowIndex][columnIndex] === undefined){
                        let randomInsert = gameBoard.insertMove(rowIndex, columnIndex, AI_Move);
                        noSimilarValue = true;
                    }else{
                        rowIndex = Math.floor(Math.random() * 3);
                        columnIndex = Math.floor(Math.random() * 3);
                    };
                }
            };
            setTimeout(() => {
                getDisplayMoveOnBoard.mainFunction(getPlayerPick).display_AI_to_board(AI_Move);
            }, 2000);

        //Second move if player is O
        } else if (countMove === 1 && AI_Move === "X"){
            //Row pattern
            let secondMove_X;
            for (let i = 0; i < 3; i++) {
                if (monitorMove[i][0] + monitorMove[i][1] === "OO" && monitorMove[i][2] === undefined){
                    secondMove_X = gameBoard.insertMove(i, 2, "X");
                    pattern = true;
                    countMove++; 
                    break;
                }else if (monitorMove[i][1] + monitorMove[i][2] === "OO" && monitorMove[i][0] === undefined){
                    secondMove_X = gameBoard.insertMove(i, 0, "X");
                    pattern = true;
                    countMove++;
                    break;
                }
            };
            //column pattern
            for (let i = 0; i < 3; i++){
                if (monitorMove[0][i] + monitorMove[1][i] === "OO" && monitorMove[2][i] === undefined){
                    secondMove_X = gameBoard.insertMove(2, i, "X");
                    pattern = true;
                    countMove++; 
                    break;
                } else if (monitorMove[1][i] + monitorMove[2][i] === "OO" && monitorMove[0][i] === undefined){
                    secondMove_X = gameBoard.insertMove(0, i, "X");
                    pattern = true;
                    countMove++; 
                    break;
                };
            }
            //Diagonal pattern
            if (monitorMove[0][0] + monitorMove[1][1] === "OO" && monitorMove[2][2] === undefined){
                secondMove_X = gameBoard.insertMove(2, 2, "X");
                pattern = true;
                countMove++; 
            } else if (monitorMove[1][1] + monitorMove[2][2] === "OO" &&monitorMove[0][0] === undefined){
                secondMove_X = gameBoard.insertMove(0, 0, "X");
                pattern = true;
                countMove++; 
            };
            if (monitorMove[1][1] + monitorMove[2][0] === "OO" && monitorMove[0][2] === undefined){
                secondMove_X = gameBoard.insertMove(0, 2, "X");
                pattern = true;
                countMove++; 
            } else if (monitorMove[1][1] + monitorMove[0][2] === "OO" &&monitorMove[2][0] === undefined){
                secondMove_X = gameBoard.insertMove(2, 0, "X");
                pattern = true;
                countMove++; 
            };
            countMove++;
            if (countMove === 1 && pattern === false){
                //Random insert if no pattern
                let rowIndex = Math.floor(Math.random() * 3);
                let columnIndex = Math.floor(Math.random() * 3);
                let noSimilarValue = false;
                while (noSimilarValue === false){
                    if (monitorMove[rowIndex][columnIndex] === undefined){
                        let randomInsert = gameBoard.insertMove(rowIndex, columnIndex, AI_Move);
                        noSimilarValue = true;
                    }else{
                        rowIndex = Math.floor(Math.random() * 3);
                        columnIndex = Math.floor(Math.random() * 3);
                    };
                }
            };
            setTimeout(() => {
                getDisplayMoveOnBoard.mainFunction(getPlayerPick).display_AI_to_board(AI_Move);
            }, 2000);
        //Remaining move
        } else if (countMove > 1){
            //Third move
            // insert move base on random number that represent the empty box
            let randomNum;
            let thirdMove;
            let undefinedCount = 0;
            if (countMove === 2){
                randomNum = Math.floor(Math.random() * 4) + 1;
                outerLoop: for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (monitorMove[i][j] === undefined){
                            undefinedCount++;
                            if (undefinedCount === randomNum){
                                thirdMove = gameBoard.insertMove(i, j, AI_Move);
                                countMove++
                                break outerLoop;
                            };

                        };
                    };
                };
                setTimeout(() => {
                    getDisplayMoveOnBoard.mainFunction(getPlayerPick).display_AI_to_board(AI_Move);
                }, 2000);
            } else if (countMove === 3){
                randomNum = Math.floor(Math.random() * 2) + 1;
                outerLoop: for (let i = 0; i < 3; i++){
                    for (let j = 0; j < 3; j++){
                        if (monitorMove[i][j] === undefined){
                            undefinedCount++;
                            if (undefinedCount === randomNum){
                                thirdMove = gameBoard.insertMove(i, j, AI_Move);
                                countMove++
                                break outerLoop;
                            };
                        };
                        
                    };
                };
                setTimeout(() => {
                    getDisplayMoveOnBoard.mainFunction(getPlayerPick).display_AI_to_board(AI_Move);
                }, 2000);
            };
            
        }; 

    }
    
   return {playerMove, AI_Response};
})();
//set the winner
function gameDecider (player, winner) {
    let getWinner = undefined;
    // check if the game board has  3 value insert
    let undefinedCount = 0;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (winner[i][j] === undefined){
                undefinedCount++;
            }
        };
    };
    if (undefinedCount < 7){
        for (let i = 0; i < 3; i++){
            if (winner[i][0] + winner[i][1] + winner[i][2] === "XXX"){
                if (player === "X_Side"){
                    getWinner = "Player Win!";
                    break;
                }else {
                    getWinner = "A.I. Win!";
                    break;
                }
            }else if (winner[i][0] + winner[i][1] + winner[i][2] === "OOO"){
                if (player === "O_Side"){
                    getWinner = "Player Win!";
                    break;
                }else {
                    getWinner = "A.I. Win!";
                    break;
                };
            } else if (winner[0][i] + winner[1][i] + winner[2][i] === "XXX"){
                if (player === "X_Side"){
                    getWinner = "Player Win!";
                    break;
                }else {
                    getWinner = "A.I. Win!";
                    break;
                };
            } else if (winner[0][i] + winner[1][i] + winner[2][i] === "OOO"){
                if (player === "O_Side"){
                    getWinner = "Player Win!";
                    break;
                }else {
                    getWinner = "A.I. Win!";
                    break;
                };
            };
        };
        if (winner[0][0] + winner[1][1] + winner[2][2] === "XXX"){
            if (player === "X_Side"){
                getWinner = "Player Win!";
                console.log(getWinner)
            }else {
                getWinner = "A.I. Win!";
            };
        } else if (winner[0][0] + winner[1][1] + winner[2][2] === "OOO"){
            if (player === "O_Side"){
                getWinner = "Player Win!";
            }else {
                getWinner = "A.I. Win!";
            }
        };
        if (winner[0][2] + winner[1][1] + winner[2][0] === "XXX"){
            if (player === "X_Side"){
                getWinner = "Player Win!";
            }else {
                getWinner = "A.I. Win!";
            };
        } else if (winner[0][2] + winner[1][1] + winner[2][0] === "OOO"){
            if (player === "O_Side"){
                getWinner = "Player Win!";
            }else {
                getWinner = "A.I. Win!";
            }
        }         
    } else if (undefinedCount === 0 && getWinner === undefined){
        getWinner = "No Winner!";
    }
    return getWinner;
};

let initiateGame = displayOnScreen().startGame();

//display image of move in board
let arr_ID = [];
const getDisplayMoveOnBoard = (function mainFunction (getPlayerPick){
    const {player_Image, AI_Image, AI_Choice, playerPick} = assignPlayer(getPlayerPick);
    const createImageToBoard = document.createElement("img");
    const AI_Selected = AI_Choice
    let Player_Move = "";
    if (AI_Selected === "O_Side") {
        Player_Move = "X";
    } else{
        Player_Move = "O";
    };
    //assign click event in every box and append image 
    const displayPlayerMovetoBoard = function(){
        const getAllTheBox = document.querySelectorAll(".box");
        let getBoxElem = 0;
        let previousElement = null;
    
        getAllTheBox.forEach(function (button, index){
            button.addEventListener('click', function(){
                getBoxElem = index + 1;
    
                if(player_Image !== undefined){
                    const getElement = document.getElementById(getBoxElem.toString());
                    if (getElement === previousElement){
                        return;
                    }
                    if (getElement.hasChildNodes()) {
                        // Check if there are any child nodes that are elements
                        const actualChildNodes = Array.from(getElement.childNodes).filter(node => node.nodeType === 1);
                    
                        if (actualChildNodes.length > 0) {
                            return;
                        }
                    }
                    
                    // Create a new image element for each click
                    const newImage = document.createElement('img');
                    newImage.src = player_Image;
                    getElement.appendChild(newImage);
                    gameMove.playerMove(getBoxElem, Player_Move);
                    previousElement = getElement;
                    gameMove.AI_Response(playerPick);
                    if (gameDecider(getPlayerPick, gameBoard.getGameBoard) !== undefined){
                        tryAgain(getPlayerPick, gameBoard.getGameBoard);
                    }
                }
            });
        });
    }
    //traverse to gameboard and find the response of AI push it to array and get the last element of array as a basis to append image of move
    const display_AI_to_board = function (AI_Move){
        let countBox = 0;
        const monitorMove = gameBoard.getGameBoard;
        outerLoop: for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                countBox++
                if (monitorMove[i][j] === AI_Move){
                    if (!arr_ID.includes(countBox)){
                        arr_ID.push(countBox);
                        let last_ID = arr_ID[arr_ID.length - 1];
                        const boxWitID = document.getElementById(last_ID.toString());
                        createImageToBoard.src = AI_Image;
                        boxWitID.appendChild(createImageToBoard);
                        break outerLoop;
                    }
                }
            }
        }    
    }
    return {mainFunction, displayPlayerMovetoBoard, display_AI_to_board, Player_Move};
})();



//display the  player picking side
function displayOnScreen() {
    const createButton = document.createElement("button");
    const createImage = document.createElement("img");
    const createImage_AI = document.createElement("img");

    function startGame() {
        const getStartButton = document.getElementById("showPlayerPick");
        const getDialog = document.getElementById("showPick");
        const getX_Pick = document.getElementById("X_Pick");
        const getO_Pick = document.getElementById("O_Pick");
        const displayMoveTopPlayer = document.getElementById("player_pick");
        const displayMoveTop_AI = document.getElementById("AI_pick");
        let getPlayerPick;
        let assignPlayerPick;
        let displayPlayerMove;
        getStartButton.addEventListener("click", () =>{
            getDialog.showModal();
            getStartButton.remove();
        });
        getX_Pick.addEventListener("click", (event) =>{
            event.preventDefault();
            getPlayerPick = getX_Pick.value;
            restart();
            createImage.className = "moveTop";
            createImage.src = "X_colored.png";
            displayMoveTopPlayer.appendChild(createImage);
            createImage_AI.className = "moveTop";
            createImage_AI.src = "O_colored.png";
            displayMoveTop_AI.appendChild(createImage_AI);
            assignPlayerPick = assignPlayer(getPlayerPick);
            displayPlayerMove = getDisplayMoveOnBoard.mainFunction(getPlayerPick).displayPlayerMovetoBoard();
            getDialog.close();
        });
        getO_Pick.addEventListener("click", (event) =>{
            event.preventDefault();
            getPlayerPick = getO_Pick.value;
            restart();
            createImage.className = "moveTop";
            createImage.src = "O_colored.png";
            displayMoveTopPlayer.appendChild(createImage);
            createImage_AI.className = "moveTop";
            createImage_AI.src = "X_colored.png";
            displayMoveTop_AI.appendChild(createImage_AI);
            assignPlayerPick = assignPlayer(getPlayerPick);
            displayPlayerMove = getDisplayMoveOnBoard.mainFunction(getPlayerPick).displayPlayerMovetoBoard();
            getDialog.close();
        });
    }
    
    return {startGame, restart};
};

function restart(){
    const getParent = document.querySelector('.start');
    const createButton = document.createElement("button");
    createButton.id = "restart";
    createButton.textContent = 'RESTART';
    createButton.className = "bottom_button";
    getParent.appendChild(createButton);
    createButton.addEventListener("click", ()=>{
        window.location.reload();
    })
}

function tryAgain(player, board){
    const getDialogLast = document.getElementById("try_again");
    const getTryButton = document.getElementById("tryAgain");
    const getWinner = document.getElementById("winner");
    
    getWinner.textContent = gameDecider(player, board);
    getDialogLast.showModal();
    getTryButton.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.reload();
    })
}