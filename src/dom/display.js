import { detectController } from "./detect";

const status = document.getElementById("status-message");
const yourBoard = document.getElementById("your-board");
const aiBoard = document.getElementById("ai-board");

const BOARD_SIDE = 10; 

const displayController = (() => {
    const renderStatus = (player, state) => {
        if (!state) {
            status.innerText = `It is now ${player} turn!`;
        } else {
            status.innerText = `${player} has won!`;
        }
    }

    const getBoardName = (squareName) => {
        return (squareName[0] === "y") ? "you" : "ai";
    }

    const getSquareCoords = (squareName, boardName) => {
        let coords = [];

        if (boardName === "you") {
            const col = squareName.substring(12, 14);
            const row = squareName.substring(16, 18);

            coords.push(col);
            coords.push(row);
        } else {
            const col = squareName.substring(10, 12);
            const row = squareName.substring(14, 16);

            coords.push(col);
            coords.push(row);
        }

        return coords;
    }

    const _clearBoards = () => {
        // TODO: may have to remove all previous listeners to squares
        yourBoard.innerHTML = "";
        aiBoard.innerHTML = "";
    }

    const renderBoards = (board1, board2) => {
        _clearBoards();

        for (let col = 0; col < BOARD_SIDE; col++) {
            for (let row = 0; row < BOARD_SIDE; row++) {
                let board1Content = board1.getContentByCoord(col, row);
                let board2Content = board2.getContentByCoord(col, row);

                const yourSquare = document.createElement("div");
                yourSquare.classList.add("square");
                yourSquare.id = `your-square-${col}-${row}`;
                yourBoard.appendChild(yourSquare); 

                detectController.detectSquareClick(yourSquare);
                
                if (board1Content === "miss") {
                    const xMark = document.createElement("i");
                    xMark.classList.add("fa-solid");
                    xMark.classList.add("fa-xmark-large");
                } else if (board1Content === "") {

                } else {
                    // we know that it's not "miss" or ""
                    if (!board1.checkValidShot(col, row)) {
                        yourSquare.classList.add("shot-before");

                        const xMark = document.createElement("i");
                        xMark.classList.add("fa-solid");
                        xMark.classList.add("fa-xmark-large");
                    } else {
                        // yourSquare.style.backgroundColor = WHITE;
                    }
                }

                const aiSquare = document.createElement("div");
                aiSquare.classList.add("square");
                aiSquare.id = `ai-square-${col}-${row}`;
                aiBoard.appendChild(aiSquare); 

                detectController.detectSquareClick(aiSquare);
                
                if (board2Content === "miss") {
                    const xMark = document.createElement("i");
                    xMark.classList.add("fa-solid");
                    xMark.classList.add("fa-xmark-large");
                } else if (board2Content === "") {

                } else {
                    // we know that it's not "miss" or ""
                    if (!board2.checkValidShot(col, row)) {
                        aiSquare.classList.add("shot-before");

                        const xMark = document.createElement("i");
                        xMark.classList.add("fa-solid");
                        xMark.classList.add("fa-xmark-large");
                    } else {
                        // enemySquare.style.backgroundColor = WHITE;
                    }
                }
            }
        }
    }

    return { renderStatus, renderBoards, getBoardName, getSquareCoords }
})();

export { displayController, BOARD_SIDE }