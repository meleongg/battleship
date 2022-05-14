import { detectController } from "./detect";
import { logicController } from "./dom.logic";
import logo from "../images/battleship.png";

const status = document.getElementById("status-message");
const yourBoard = document.getElementById("your-board");
const aiBoard = document.getElementById("ai-board");

const rotate = document.getElementById("rotate-btn");
const reset = document.getElementById("reset-btn");

const icon = document.getElementById("icon");
icon.href = logo;

const BOARD_SIDE = 10; 

const displayController = (() => {
    const renderRotateBtn = () => {
        rotate.style.display = "block";
    }

    const renderResetBtn = () => {
        reset.style.display = "block";
    }

    const hideResetBtn = () => {
        reset.style.display = "none";
    }

    const renderStatus = (text) => {
        status.innerText = text; 
    }

    const getBoardName = (squareName) => {
        return (squareName[0] === "y") ? "you" : "ai";
    }

    const getSquareCoords = (squareName, boardName) => {
        let coords = [];

        if (boardName === "you") {
            const col = squareName.substring(12, 13);
            const row = squareName.substring(14, 15);

            coords.push(col);
            coords.push(row);
        } else {
            const col = squareName.substring(10, 11);
            const row = squareName.substring(12, 13);

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

        for (let row = 0; row < BOARD_SIDE; row++) {
            for (let col = 0; col < BOARD_SIDE; col++) {
                let board1Content = board1.getContentByCoord(col, row);
                let board2Content = board2.getContentByCoord(col, row);

                const yourSquare = document.createElement("div");
                yourSquare.classList.add("square");
                yourSquare.id = `your-square-${col}-${row}`;
                yourBoard.appendChild(yourSquare); 

                // PLACING
                detectController.detectSquareHover(yourSquare);
                detectController.detectHumanSquareClick(yourSquare);
                
                if (board1Content === "miss") {
                    const xMark = document.createElement("i");
                    xMark.classList.add("fa-solid");
                    xMark.classList.add("fa-xmark");
                    yourSquare.classList.add("miss");
                    yourSquare.appendChild(xMark);
                } else if (board1Content === "") {

                } else {
                    // we know that it's not "miss" or ""
                    if (!board1.checkValidShot(col, row)) {
                        yourSquare.classList.add("shot-before");

                        const ship = board1.getContentByCoord(col, row);
                        const sunk = logicController.checkShipSunk("human", ship);

                        if (sunk) {
                            yourSquare.classList.add("ship-sunk");
                        }

                        const xMark = document.createElement("i");
                        xMark.classList.add("fa-solid");
                        xMark.classList.add("fa-xmark");
                        yourSquare.appendChild(xMark);
                    } else {
                        yourSquare.classList.add("your-ship");
                    }
                }

                const aiSquare = document.createElement("div");
                aiSquare.classList.add("square");
                aiSquare.id = `ai-square-${col}-${row}`;
                aiBoard.appendChild(aiSquare); 

                detectController.detectSquareClick(aiSquare);
                detectController.detectAiSquareHover(aiSquare);
                
                if (board2Content === "miss") {
                    const xMark = document.createElement("i");
                    xMark.classList.add("fa-solid");
                    xMark.classList.add("fa-xmark");
                    aiSquare.classList.add("miss");
                    aiSquare.appendChild(xMark);
                } else if (board2Content === "") {

                } else {
                    // we know that it's not "miss" or ""
                    if (!board2.checkValidShot(col, row)) {
                        aiSquare.classList.add("shot-before");

                        const ship = board2.getContentByCoord(col, row);
                        const sunk = logicController.checkShipSunk("ai", ship);

                        if (sunk) {
                            aiSquare.classList.add("ship-sunk");
                        }

                        const xMark = document.createElement("i");
                        xMark.classList.add("fa-solid");
                        xMark.classList.add("fa-xmark");
                        aiSquare.appendChild(xMark);
                    } 
                }
            }
        }
    }

    return { renderStatus, renderBoards, getBoardName, getSquareCoords, renderResetBtn, renderRotateBtn, hideResetBtn }
})();

export { displayController, BOARD_SIDE }