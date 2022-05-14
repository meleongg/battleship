import { AIPlayer } from "../logic/ai.player";
import { HumanPlayer } from "../logic/human.player";
import { displayController } from "./display";
import { shipFactory } from "../logic/ship";

const generateRandomNumber = (min, max) => {
    const number = Math.floor(Math.random() * (max - min + 1) + min); 
    return number; 
}

const generateRandomDirection = () => {
    const number = Math.round(Math.random());
    return (number === 0) ? "x" : "y";
}

const logicController = (() => {
    let gameOver;
    let humanPlayer;
    let aiPlayer;

    let destroyer = shipFactory("destroyer", 2);
    let sub = shipFactory("sub", 3);
    let cruiser = shipFactory("cruiser", 3);
    let battleship = shipFactory("battleship", 4);
    let carrier = shipFactory("carrier", 5);

    let ships = [destroyer, sub, cruiser, battleship, carrier];

    const _getShipLengthByName = (shipName) => {
        switch (shipName) {
            case "destroyer":
                return 2;
            case "sub":
                return 3;
            case "cruiser":
                return 3;
            case "battleship":
                return 4;
            default:
                return 5;
        }
    }

    const getShipByName = (shipName) => {
        switch (shipName) {
            case "destroyer":
                return destroyer;
            case "sub":
                return sub;
            case "cruiser":
                return cruiser;
            case "battleship":
                return battleship;
            default:
                return carrier;
        }
    }

    const _fillBoard = (board) => {
        board.placeShip([[0, 0], [1, 0]], destroyer);
        board.placeShip([[2, 0], [3, 0], [4, 0]], sub);
        board.placeShip([[5, 0], [6, 0], [7, 0]], cruiser);
        board.placeShip([[0, 1], [0, 2], [0, 3], [0, 4]], battleship);
        board.placeShip([[0, 5], [0, 6], [0, 7], [0, 8], [0, 9]], carrier);
    }

    const _getXCoords = (shipName) => {
        let headCol;
        let headRow;

        if (shipName === "destroyer") {
            headCol = generateRandomNumber(0, 8);
            headRow = generateRandomNumber(0, 9);

            return [[headCol, headRow], [headCol + 1, headRow]];
        }

        if (shipName === "sub") {
            headCol = generateRandomNumber(0, 7);
            headRow = generateRandomNumber(0, 9);

            return [[headCol, headRow], [headCol + 1, headRow], [headCol + 2, headRow]];
        }

        if (shipName === "cruiser") {
            headCol = generateRandomNumber(0, 6);
            headRow = generateRandomNumber(0, 9);

            return [[headCol, headRow], [headCol + 1, headRow], [headCol + 2, headRow]];
        }

        if (shipName === "battleship") {
            headCol = generateRandomNumber(0, 6);
            headRow = generateRandomNumber(0, 9);

            return [[headCol, headRow], [headCol + 1, headRow], [headCol + 2, headRow], [headCol + 3, headRow]];
        }

        if (shipName === "carrier") {
            headCol = generateRandomNumber(0, 5);
            headRow = generateRandomNumber(0, 9);

            return [[headCol, headRow], [headCol + 1, headRow], [headCol + 2, headRow], [headCol + 3, headRow], [headCol + 4, headRow]];
        }
    }

    const _getYCoords = (shipName) => {
        let headCol;
        let headRow; 

        if (shipName === "destroyer") {
            headCol = generateRandomNumber(0, 9);
            headRow = generateRandomNumber(0, 8);

            return [[headCol, headRow], [headCol, headRow + 1]];
        }

        if (shipName === "sub") {
            headCol = generateRandomNumber(0, 9);
            headRow = generateRandomNumber(0, 7);

            return [[headCol, headRow], [headCol, headRow + 1], [headCol, headRow + 2]];
        }

        if (shipName === "cruiser") {
            headCol = generateRandomNumber(0, 9);
            headRow = generateRandomNumber(0, 6);

            return [[headCol, headRow], [headCol, headRow + 1], [headCol, headRow + 2]];
        }

        if (shipName === "battleship") {
            headCol = generateRandomNumber(0, 9);
            headRow = generateRandomNumber(0, 6);

            return [[headCol, headRow], [headCol, headRow + 1], [headCol, headRow + 2], [headCol, headRow + 3]];
        }

        if (shipName === "carrier") {
            headCol = generateRandomNumber(0, 9);
            headRow = generateRandomNumber(0, 5);

            return [[headCol, headRow], [headCol, headRow + 1], [headCol, headRow + 2], [headCol, headRow + 3], [headCol, headRow + 4]];
        }
    }

    const _resetChangedCoords = (coords, tempGrid) => {
        for (let i = 0; i < coords.length; i++) {
            const ithCoords = coords[i];
            const col = ithCoords[0];
            const row = ithCoords[1];

            tempGrid[col][row] = "";
        }
    }

    const _checkCoords = (shipName, coords, tempGrid) => {
        const tempCoords = [];

        for (let i = 0; i < coords.length; i++) {
            const ithCoords = coords[i];
            const col = ithCoords[0];
            const row = ithCoords[1];

            if (tempGrid[col][row] !== "") {
                _resetChangedCoords(tempCoords, tempGrid);
                return false; 
            } else {
                tempGrid[col][row] = shipName;
                tempCoords.push([col, row]);
            }
        }

        return true; 
    }

    const _fillAiBoard = (board) => {
        let tempGrid = [["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""]];

        for (let i = 0; i < ships.length; i++) {
            const ship = ships[i];
            const shipName = ship.name;
            let isGoodPlacement = false; 

            while (!isGoodPlacement) {
                const direction = generateRandomDirection();
                let coords;

                if (direction === "x") {
                    coords = _getXCoords(shipName);
                } else {
                    coords = _getYCoords(shipName);
                }

                if (_checkCoords(shipName, coords, tempGrid)) {
                    board.placeShip(coords, ship);
                    isGoodPlacement = true; 
                }
            }
        }
    }

    let rotationAxis = "x";

    const setRotationAxis = (value) => {
        rotationAxis = value; 
    }

    const getRotationAxis = () => {
        return rotationAxis;
    }

    const stillPlacingHumanShips = () => {
        for (const shipName in shipPlacementStatuses) {
            if (!shipPlacementStatuses[shipName]) {
                return true;
            }
        }

        if (!checkGameOver()) {
            displayController.renderStatus("It's your turn to attack!");
        }
        
        displayController.renderAiBoard();

        return false; 
    }

    const _resetShipStatuses = () => {
        for (const shipName in shipPlacementStatuses) {
            shipPlacementStatuses[shipName] = false; 
        }
    }

    let shipPlacementStatuses = { "destroyer" : false, "sub" : false, "cruiser" : false, "battleship" : false, "carrier" : false };

    let currentShipPlacement;

    const getCurrentShipPlacement = () => {
        for (const shipName in shipPlacementStatuses) {
            if (!shipPlacementStatuses[shipName]) {
                currentShipPlacement = shipName; 
                return currentShipPlacement;
            } 
        }
    }

    const humanPlaceShip = (board, coords, ship) => {
        board.placeShip(coords, ship);
        shipPlacementStatuses[ship.name] = true; 
    }

    // FAILED AI CODE

    // let foundShip = false; 
    // // first entry will always be the first hit found 
    // let hitCoords = [];
    // let leftShots = {};
    // let upShots = {};
    // let rightShots = {};
    // let downShots = {};
    // let shipHit; 
    // let shipHitLength; 

    // const _leftNotShotAlready = (col, row) => {
    //     for (const coord in leftShots) {
    //         let arrCol = parseInt(coord.substring(0, 1));
    //         let arrRow = parseInt(coord.substring(2, 3));

    //         if ((arrCol === col) && (arrRow === row)) {
    //             return false; 
    //         }
    //     }

    //     return true;
    // }

    // const _generateNextLeftShot = (obj) => {
    //     if (Object.keys(obj).length === 0) {
    //         return [hitCoords[0] - 1, hitCoords[1]];
    //     } else {
    //         const keys = Object.keys(obj);
    //         const lastKey = keys[keys.length - 1];
    //         const col = lastKey.substring(0, 1);
    //         const row = lastKey.substring(2, 3);

    //         return [col - 1, row];
    //     }
    
    // }

    // const _generateNextUpShot = (obj) => {
    //     if (Object.keys(obj).length === 0) {
    //         return [hitCoords[0], hitCoords[1] - 1];
    //     } else {
    //         const keys = Object.keys(obj);
    //         const lastKey = keys[keys.length - 1];
    //         const col = lastKey.substring(0, 1);
    //         const row = lastKey.substring(2, 3);

    //         return [col, row - 1];
    //     }
    
    // }

    // const _generateNextRightShot = (obj) => {
    //     if (Object.keys(obj).length === 0) {
    //         return [hitCoords[0] + 1, hitCoords[1]];
    //     } else {
    //         const keys = Object.keys(obj);
    //         const lastKey = keys[keys.length - 1];
    //         const col = lastKey.substring(0, 1);
    //         const row = lastKey.substring(2, 3);

    //         return [col + 1, row];
    //     }
    
    // }

    // const _generateNextDownShot = (obj) => {
    //     if (Object.keys(obj).length === 0) {
    //         return [hitCoords[0], hitCoords[1] + 1];
    //     } else {
    //         const keys = Object.keys(obj);
    //         const lastKey = keys[keys.length - 1];
    //         const col = lastKey.substring(0, 1);
    //         const row = lastKey.substring(2, 3);

    //         return [col, row + 1];
    //     }
    
    // }

    // const _previousShotWasHit = (obj) => {
    //     const isLastHit = Object.values(obj).pop();

    //     console.log(isLastHit)

    //     if (isLastHit !== false) {
    //         return true;
    //     }

    //     return false; 
    // }

    // const _generateNextShot = () => {
    //     // we know the ship has not sunk yet
    //     let col = hitCoords[0];
    //     let row = hitCoords[1];
    //     let tempCoords; 
    //     let tempCol;
    //     let tempRow; 
    //     let coords; 
    //     const humanBoard = getHumanBoard();

    //     // go left 
    //     if ((col - 1 >= 0) && ((Object.keys(leftShots).length === 0) || (_previousShotWasHit(leftShots)))) {
    //         tempCoords = _generateNextLeftShot(leftShots);
    //         tempCol = tempCoords[0];
    //         tempRow = tempCoords[1];

    //         if (humanBoard.checkValidShot(tempCol, tempRow)) {
    //             coords = tempCoords;
    //             leftShots[`${tempCol}-${tempRow}`] = humanBoard.checkHitShip(tempCol, tempRow); 
    //         } 
    //     } else if ((row - 1 >= 0) && ((Object.keys(upShots).length === 0) || (_previousShotWasHit(upShots)))) {
    //         tempCoords = _generateNextUpShot(upShots);
    //         tempCol = tempCoords[0];
    //         tempRow = tempCoords[1];

    //         if (humanBoard.checkValidShot(tempCol, tempRow)) {
    //             coords = tempCoords;
    //             leftShots[`${tempCol}-${tempRow}`] = humanBoard.checkHitShip(tempCol, tempRow); 
    //         } 
    //     } else if ((col + 1 <= 9) && ((Object.keys(rightShots).length === 0) || (_previousShotWasHit(rightShots)))) {
    //         tempCoords = _generateNextRightShot(rightShots);
    //         tempCol = tempCoords[0];
    //         tempRow = tempCoords[1];

    //         if (humanBoard.checkValidShot(tempCol, tempRow)) {
    //             coords = tempCoords;
    //             leftShots[`${tempCol}-${tempRow}`] = humanBoard.checkHitShip(tempCol, tempRow); 
    //         } 
    //     } else if ((row + 1 <= 9) && ((Object.keys(downShots).length === 0) || (_previousShotWasHit(downShots)))) {
    //         tempCoords = _generateNextDownShot(downShots);
    //         tempCol = tempCoords[0];
    //         tempRow = tempCoords[1];

    //         if (humanBoard.checkValidShot(tempCol, tempRow)) {
    //             coords = tempCoords;
    //             leftShots[`${tempCol}-${tempRow}`] = humanBoard.checkHitShip(tempCol, tempRow); 
    //         } 
    //     } 

    //     return coords;
    // }

    // const _makeAIMove = (humanBoard) => {
    //     let isValidCoord = false; 
    //     const aiBoard = getAiBoard();

    //     if (foundShip && !shipHit.isSunk()) {
    //         const coords = _generateNextShot();
    //         humanBoard.receiveAttack(coords);
    //     } else {
    //         hitCoords = [];
    //         leftShots = {};
    //         upShots = {};
    //         rightShots = {};
    //         downShots = {};
    //     }

    //     while (!isValidCoord && !foundShip) {
    //         let col = generateRandomNumber(0, 9);
    //         let row = generateRandomNumber(0, 9);
    //         // let col = 5;
    //         // let row = 0;

    //         const shipHitStr = humanBoard.checkHitShip(col, row);

    //         if (shipHitStr) {
    //             shipHit = humanBoard.getShipByName(shipHitStr);
    //             shipHitLength = _getShipLengthByName(shipHitStr);
    //             foundShip = true; 
    //             humanBoard.receiveAttack([col, row]);
    //             // we always know the first one will be true, so we'll put it as false for the for loop to work
    //             hitCoords = [col, row];
    //             // console.log(hitCoords); this is fine
    //             isValidCoord = true; 
    //         } else if (humanBoard.checkValidShot(col, row)) {
    //             // should only come here if it's going to be a missed shot
    //             humanBoard.receiveAttack([col, row]);
    //             foundShip = false; 
    //             isValidCoord = true; 
    //         }
    //     }

    //     if (foundShip && shipHit.isSunk()) {
    //         foundShip = false; 
    //     }

    //     displayController.renderBoards(humanBoard, aiBoard);
    //     checkGameOver();
    //     changeTurn();
    // }

    const _makeAIMove = (enemyBoard) => {
        let isValidCoord = false; 
        const humanBoard = getHumanBoard();
        const aiBoard = getAiBoard();

        while (!isValidCoord) {
            let xCoord = generateRandomNumber(0, 9);
            let yCoord = generateRandomNumber(0, 9);

            if (enemyBoard.checkValidShot(xCoord, yCoord)) {
                enemyBoard.receiveAttack([xCoord, yCoord]);
                isValidCoord = true; 
            }
        }

        displayController.renderBoards(humanBoard, aiBoard);
        checkGameOver();
        changeTurn();
    }

    const resetGame = () => {
        gameOver = false;

        _resetShipStatuses();

        humanPlayer = new HumanPlayer(true);
        aiPlayer = new AIPlayer(false);

        humanPlayer.setTurn(true);
        aiPlayer.setTurn(false);

        displayController.renderStatus("Place your destroyer!");
        displayController.renderRotateBtn();
        displayController.hideResetBtn();
        displayController.hideAiBoard();

        const humanBoard = humanPlayer.getBoard();
        const aiBoard = aiPlayer.getBoard();

        _fillAiBoard(aiBoard);

        displayController.renderBoards(humanBoard, aiBoard);
    }

    const changeTurn = () => {
        if (!gameOver) {
            if (humanPlayer.getTurn()) {
                humanPlayer.setTurn(false);
                aiPlayer.setTurn(true);
                // displayController.renderStatus("It's AI's turn!");
                const humanBoard = getHumanBoard();
                _makeAIMove(humanBoard);
            } else {
                humanPlayer.setTurn(true);
                aiPlayer.setTurn(false);
                // displayController.renderStatus("It's your turn!");
            }
        } else {
            const winner = _getWinner();
            displayController.renderStatus(`${winner}`);
        }
    }

    const _getWinner = () => {
        return (humanPlayer.getBoard().isAllSunk()) ? "AI has won!" : "You have won!";
    }

    const checkValidTurn = () => {
        return humanPlayer.getTurn();
    }

    const getHumanBoard = () => {
        return humanPlayer.getBoard();
    }

    const getAiBoard = () => {
        return aiPlayer.getBoard();
    }

    const checkGameOver = () => {
        if (humanPlayer.getBoard().isAllSunk() || aiPlayer.getBoard().isAllSunk()) {
            gameOver = true;
            displayController.renderResetBtn();
        } 
    }

    const getGameOver = () => {
        return gameOver; 
    }

    const checkShipSunk = (player, shipName) => {
        const humanBoard = getHumanBoard();
        const aiBoard = getAiBoard();

        if (player === "human") {
            const ship = humanBoard.getShipByName(shipName);
            return ship.isSunk();
        } else {
            const ship = aiBoard.getShipByName(shipName);
            return ship.isSunk();
        }
    }

    return { resetGame, changeTurn, checkValidTurn, getHumanBoard, getAiBoard, checkGameOver, getGameOver,
        checkShipSunk, stillPlacingHumanShips, setRotationAxis, getRotationAxis, getCurrentShipPlacement,
        getShipByName, humanPlaceShip }
})();

export { logicController }