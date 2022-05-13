import { logicController } from "./dom.logic";
import { BOARD_SIDE, displayController } from "./display";

const rotate = document.getElementById("rotate-btn");

const detectController = (() => {
    const detectSquareClick = (square) => {
        square.addEventListener("click", () => {
            const squareName = square.id;
            const boardName = displayController.getBoardName(squareName);
            const coords = displayController.getSquareCoords(squareName, boardName);
            const humanBoard = logicController.getHumanBoard();
            const aiBoard = logicController.getAiBoard();
            
            const col = coords[0];
            const row = coords[1];

            if (aiBoard.checkValidShot(col, row) && logicController.checkValidTurn() && !logicController.getGameOver()) {
                aiBoard.receiveAttack([col, row]);
                displayController.renderBoards(humanBoard, aiBoard);
                logicController.checkGameOver();
                logicController.changeTurn();
            }
        });
    }

    const coordToId = (col, row) => {
        return `your-square-${col}-${row}`;
    }

    const removeSquareHovers = () => {
        for (let i = 0; i < BOARD_SIDE; i++) {
            for (let j = 0; j < BOARD_SIDE; j++) {
                const id = coordToId(i, j);
                const square = document.getElementById(id);
                
                if (square.classList.contains("placement-hover")) {
                    square.classList.remove("placement-hover");
                }
                
                if (square.classList.contains("invalid-placement")) {
                    square.classList.remove("invalid-placement");
                }
            }
        }
    }

    const detectSquareHover = (square) => {
        square.addEventListener("mouseover", () => {
            removeSquareHovers();
            if (logicController.stillPlacingHumanShips()) {
                const shipName = logicController.getCurrentShipPlacement();

                const squareName = square.id; 
                    const boardName = displayController.getBoardName(squareName);
                    const coords = displayController.getSquareCoords(squareName, boardName);

                    const col = parseInt(coords[0]);
                    const row = parseInt(coords[1]);

                if (logicController.getRotationAxis() === "x") {    
                    if (shipName === "destroyer") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneToRight = document.getElementById(coordToId(col + 1, row));
                        if (col < 9) {
                            headSquare.classList.add("placement-hover");
                            squareOneToRight.classList.add("placement-hover");
                        } else {
                            headSquare.classList.add("invalid-placement");
                        } 
                    }

                    if (shipName === "sub") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneToRight = document.getElementById(coordToId(col + 1, row));
                        const squareTwoToRight = document.getElementById(coordToId(col + 2, row));
                        if (col < 8) {
                            headSquare.classList.add("placement-hover");
                            squareOneToRight.classList.add("placement-hover");
                            squareTwoToRight.classList.add("placement-hover");
                        } else if (col === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneToRight.classList.add("invalid-placement");
                        } 
                    }

                    if (shipName === "cruiser") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneToRight = document.getElementById(coordToId(col + 1, row));
                        const squareTwoToRight = document.getElementById(coordToId(col + 2, row));
                        if (col < 8) {
                            headSquare.classList.add("placement-hover");
                            squareOneToRight.classList.add("placement-hover");
                            squareTwoToRight.classList.add("placement-hover");
                        } else if (col === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneToRight.classList.add("invalid-placement");
                        } 
                    }

                    if (shipName === "battleship") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneToRight = document.getElementById(coordToId(col + 1, row));
                        const squareTwoToRight = document.getElementById(coordToId(col + 2, row));
                        const squareThreeToRight = document.getElementById(coordToId(col + 3, row));
                        if (col < 7) {
                            headSquare.classList.add("placement-hover");
                            squareOneToRight.classList.add("placement-hover");
                            squareTwoToRight.classList.add("placement-hover");
                            squareThreeToRight.classList.add("placement-hover");
                        } else if (col === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else if (col === 8) {
                            headSquare.classList.add("invalid-placement");
                            squareOneToRight.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneToRight.classList.add("invalid-placement");
                            squareTwoToRight.classList.add("invalid-placement");
                        }
                    }

                    if (shipName === "carrier") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneToRight = document.getElementById(coordToId(col + 1, row));
                        const squareTwoToRight = document.getElementById(coordToId(col + 2, row));
                        const squareThreeToRight = document.getElementById(coordToId(col + 3, row));
                        const squareFourToRight = document.getElementById(coordToId(col + 4, row));
                        if (col < 6) {
                            headSquare.classList.add("placement-hover");
                            squareOneToRight.classList.add("placement-hover");
                            squareTwoToRight.classList.add("placement-hover");
                            squareThreeToRight.classList.add("placement-hover");
                            squareFourToRight.classList.add("placement-hover");
                        } else if (col === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else if (col === 8) {
                            headSquare.classList.add("invalid-placement");
                            squareOneToRight.classList.add("invalid-placement");
                        } else if (col === 7) {
                            headSquare.classList.add("invalid-placement");
                            squareOneToRight.classList.add("invalid-placement");
                            squareTwoToRight.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneToRight.classList.add("invalid-placement");
                            squareTwoToRight.classList.add("invalid-placement");
                            squareThreeToRight.classList.add("invalid-placement");
                        } 
                    }
                } else {
                    if (shipName === "destroyer") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneDown = document.getElementById(coordToId(col, row + 1));
                        if (row < 9) {
                            headSquare.classList.add("placement-hover");
                            squareOneDown.classList.add("placement-hover");
                        } else {
                            headSquare.classList.add("invalid-placement");
                        } 
                    }

                    if (shipName === "sub") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneDown = document.getElementById(coordToId(col, row + 1));
                        const squareTwoDown = document.getElementById(coordToId(col, row + 2));
                        if (row < 8) {
                            headSquare.classList.add("placement-hover");
                            squareOneDown.classList.add("placement-hover");
                            squareTwoDown.classList.add("placement-hover");
                        } else if (row === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneDown.classList.add("invalid-placement");
                        } 
                    }

                    if (shipName === "cruiser") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneDown = document.getElementById(coordToId(col, row + 1));
                        const squareTwoDown = document.getElementById(coordToId(col, row + 2));
                        if (row < 8) {
                            headSquare.classList.add("placement-hover");
                            squareOneDown.classList.add("placement-hover");
                            squareTwoDown.classList.add("placement-hover");
                        } else if (row === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneDown.classList.add("invalid-placement");
                        } 
                    }

                    if (shipName === "battleship") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneDown = document.getElementById(coordToId(col, row + 1));
                        const squareTwoDown = document.getElementById(coordToId(col, row + 2));
                        const squareThreeDown = document.getElementById(coordToId(col, row + 3));
                        if (row < 7) {
                            headSquare.classList.add("placement-hover");
                            squareOneDown.classList.add("placement-hover");
                            squareTwoDown.classList.add("placement-hover");
                            squareThreeDown.classList.add("placement-hover");
                        } else if (row === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else if (row === 8) {
                            headSquare.classList.add("invalid-placement");
                            squareOneDown.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneDown.classList.add("invalid-placement");
                            squareTwoDown.classList.add("invalid-placement");
                        }
                    }

                    if (shipName === "carrier") {
                        const headSquare = document.getElementById(coordToId(col, row));
                        const squareOneDown = document.getElementById(coordToId(col, row + 1));
                        const squareTwoDown = document.getElementById(coordToId(col, row + 2));
                        const squareThreeDown = document.getElementById(coordToId(col, row + 3));
                        const squareFourDown = document.getElementById(coordToId(col, row + 4));
                        if (row < 6) {
                            headSquare.classList.add("placement-hover");
                            squareOneDown.classList.add("placement-hover");
                            squareTwoDown.classList.add("placement-hover");
                            squareThreeDown.classList.add("placement-hover");
                            squareFourDown.classList.add("placement-hover");
                        } else if (row === 9) {
                            headSquare.classList.add("invalid-placement");
                        } else if (row === 8) {
                            headSquare.classList.add("invalid-placement");
                            squareOneDown.classList.add("invalid-placement");
                        } else if (row === 7) {
                            headSquare.classList.add("invalid-placement");
                            squareOneDown.classList.add("invalid-placement");
                            squareTwoDown.classList.add("invalid-placement");
                        } else {
                            headSquare.classList.add("invalid-placement");
                            squareOneDown.classList.add("invalid-placement");
                            squareTwoDown.classList.add("invalid-placement");
                            squareThreeDown.classList.add("invalid-placement");
                        } 
                    }   
                }
            } else {
                rotate.style.display = "none";
            }
        });
    }

    const detectRotate = (btn) => {
        btn.addEventListener("click", () => {
            if (logicController.getRotationAxis() === "x") {
                logicController.setRotationAxis("y");
            } else {
                logicController.setRotationAxis("x");
            }
        });
    }

    detectRotate(rotate);

    const detectHumanSquareClick = (square) => {
        if (logicController.stillPlacingHumanShips()) {
            // check squares for green 
            // get the coords
            // place the ship
            // rerender and wait 
            // don't allow player to click AI board (TODO)
        }
    }

    return { detectSquareClick, detectSquareHover, detectHumanSquareClick }
})();

export { detectController }