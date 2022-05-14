import { logicController } from "./dom.logic";
import { BOARD_SIDE, displayController } from "./display";

const rotate = document.getElementById("rotate-btn");
const reset = document.getElementById("reset-btn");

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

            if (aiBoard.checkValidShot(col, row) && logicController.checkValidTurn() && !logicController.getGameOver() && !logicController.stillPlacingHumanShips()) {
                aiBoard.receiveAttack([col, row]);
                displayController.renderBoards(humanBoard, aiBoard);
                logicController.checkGameOver();
                logicController.changeTurn();
            }
        });
    }

    const coordToAiId = (col, row) => {
        return `ai-square-${col}-${row}`;
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

    const checkAlreadyPlacedShip = (squares) => {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains("your-ship")) {
                return true; 
            }
        }

        return false; 
    }

    const detectSquareHover = (square) => {
        square.addEventListener("mouseover", () => {
            removeSquareHovers();
            if (logicController.stillPlacingHumanShips()) {
                const shipName = logicController.getCurrentShipPlacement();
                displayController.renderStatus(`Place your ${shipName}!`);

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
                            if (checkAlreadyPlacedShip([headSquare, squareOneToRight, squareTwoToRight])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneToRight.classList.add("invalid-placement");
                                squareTwoToRight.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneToRight.classList.add("placement-hover");
                                squareTwoToRight.classList.add("placement-hover");
                            }
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
                            if (checkAlreadyPlacedShip([headSquare, squareOneToRight, squareTwoToRight])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneToRight.classList.add("invalid-placement");
                                squareTwoToRight.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneToRight.classList.add("placement-hover");
                                squareTwoToRight.classList.add("placement-hover");
                            }
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
                            if (checkAlreadyPlacedShip([headSquare, squareOneToRight, squareTwoToRight, squareThreeToRight])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneToRight.classList.add("invalid-placement");
                                squareTwoToRight.classList.add("invalid-placement");
                                squareThreeToRight.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneToRight.classList.add("placement-hover");
                                squareTwoToRight.classList.add("placement-hover");
                                squareThreeToRight.classList.add("placement-hover");
                            }
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
                            if (checkAlreadyPlacedShip([headSquare, squareOneToRight, squareTwoToRight, squareThreeToRight, squareFourToRight])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneToRight.classList.add("invalid-placement");
                                squareTwoToRight.classList.add("invalid-placement");
                                squareThreeToRight.classList.add("invalid-placement");
                                squareFourToRight.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneToRight.classList.add("placement-hover");
                                squareTwoToRight.classList.add("placement-hover");
                                squareThreeToRight.classList.add("placement-hover");
                                squareFourToRight.classList.add("placement-hover");
                            }
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
                            if (checkAlreadyPlacedShip([headSquare, squareOneDown, squareTwoDown])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneDown.classList.add("invalid-placement");
                                squareTwoDown.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneDown.classList.add("placement-hover");
                                squareTwoDown.classList.add("placement-hover");
                            }
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
                            if (checkAlreadyPlacedShip([headSquare, squareOneDown, squareTwoDown])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneDown.classList.add("invalid-placement");
                                squareTwoDown.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneDown.classList.add("placement-hover");
                                squareTwoDown.classList.add("placement-hover");
                            }
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
                            if (checkAlreadyPlacedShip([headSquare, squareOneDown, squareTwoDown, squareThreeDown])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneDown.classList.add("invalid-placement");
                                squareTwoDown.classList.add("invalid-placement");
                                squareThreeDown.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneDown.classList.add("placement-hover");
                                squareTwoDown.classList.add("placement-hover");
                                squareThreeDown.classList.add("placement-hover");
                            }
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
                            if (checkAlreadyPlacedShip([headSquare, squareOneDown, squareTwoDown, squareThreeDown, squareFourDown])) {
                                headSquare.classList.add("invalid-placement");
                                squareOneDown.classList.add("invalid-placement");
                                squareTwoDown.classList.add("invalid-placement");
                                squareThreeDown.classList.add("invalid-placement");
                                squareFourDown.classList.add("invalid-placement");
                            } else {
                                headSquare.classList.add("placement-hover");
                                squareOneDown.classList.add("placement-hover");
                                squareTwoDown.classList.add("placement-hover");
                                squareThreeDown.classList.add("placement-hover");
                                squareFourDown.classList.add("placement-hover");
                            }
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
                displayController.hideRotateBtn();
            }
        });
    }

    const detectResetGame = (btn) => {
        btn.addEventListener("click", () => {
            logicController.resetGame();
        });
    }

    detectResetGame(reset);

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

    const checkForGreenSquares = () => {
        let coords = [];

        for (let i = 0; i < BOARD_SIDE; i++) {
            for (let j = 0; j < BOARD_SIDE; j++) {
                const id = coordToId(i, j);
                const square = document.getElementById(id);

                if (square.classList.contains("placement-hover")) {
                    coords.push([i, j]);
                }
            }
        }

        return coords;
    }

    const checkForInvalidSquares = () => {
        for (let i = 0; i < BOARD_SIDE; i++) {
            for (let j = 0; j < BOARD_SIDE; j++) {
                const id = coordToId(i, j);
                const square = document.getElementById(id);

                if (square.classList.contains("invalid-placement")) {
                    return false; 
                }
            }
        }

        return true; 
    }

    const detectHumanSquareClick = (square) => {
        square.addEventListener("click", () => {
            if (logicController.stillPlacingHumanShips()) {
                const coords = checkForGreenSquares();
                const isValid = checkForInvalidSquares();
                const shipName = logicController.getCurrentShipPlacement();
                const ship = logicController.getShipByName(shipName);
                const humanBoard = logicController.getHumanBoard();
                const aiBoard = logicController.getAiBoard();

                // check squares for green 
                // get the coords
                // place the ship
                // rerender and wait 
                if (isValid) {
                    logicController.humanPlaceShip(humanBoard, coords, ship);
                }

                displayController.renderBoards(humanBoard, aiBoard);
                // don't allow player to click AI board (TODO)
                // don't allow hover if won already
            }
        });
    }

    const resetAllToWhiteButShotBefore = () => {
        for (let i = 0; i < BOARD_SIDE; i++) {
            for (let j = 0; j < BOARD_SIDE; j++) {
                const id = coordToAiId(i, j);
                const square = document.getElementById(id);
                
                if (!square.classList.contains("shot-before")) {
                    square.style.backgroundColor = "#FFF";
                }
            }
        }
    }

    const detectAiSquareHover = (square) => {
        square.addEventListener("mouseover", () => {
            resetAllToWhiteButShotBefore();

            if (!logicController.getGameOver() && !logicController.stillPlacingHumanShips()) {
                if (!square.classList.contains("miss") && !square.classList.contains("shot-before")) {
                    square.style.cursor = "pointer";
                    square.style.backgroundColor = "#808080";
                } 
            }
        });
    }

    return { detectSquareClick, detectSquareHover, detectHumanSquareClick, detectAiSquareHover }
})();

export { detectController }