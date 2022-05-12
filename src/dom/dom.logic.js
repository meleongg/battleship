import { AIPlayer } from "../logic/ai.player";
import { HumanPlayer } from "../logic/human.player";
import { displayController } from "./display";
import { shipFactory } from "../logic/ship";

const fillBoard = (board) => {
    let destroyer = shipFactory("destroyer", 2);
    let sub = shipFactory("sub", 3);
    let cruiser = shipFactory("cruiser", 3);
    let battleship = shipFactory("battleship", 4);
    let carrier = shipFactory("carrier", 5);

    board.placeShip([[0, 0], [1, 0]], destroyer);
    board.placeShip([[2, 0], [3, 0], [4, 0]], sub);
    board.placeShip([[5, 0], [6, 0], [7, 0]], cruiser);
    board.placeShip([[0, 1], [0, 2], [0, 3], [0, 4]], battleship);
    board.placeShip([[0, 5], [0, 6], [0, 7], [0, 8], [0, 9]], carrier);
}

const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10); 
    return number; 
}

const logicController = (() => {
    let gameOver = false; 
    let humanPlayer = new HumanPlayer(true);
    let aiPlayer = new AIPlayer(false);


    const _makeAIMove = (enemyBoard) => {
        let isValidCoord = false; 

        while (!isValidCoord) {
            let xCoord = generateRandomNumber();
            let yCoord = generateRandomNumber();

            if (enemyBoard.checkValidShot(xCoord, yCoord)) {
                enemyBoard.receiveAttack([xCoord, yCoord]);
                isValidCoord = true; 
            }
        }
    }

    const resetGame = () => {
        humanPlayer.setTurn(true);
        aiPlayer.setTurn(false);

        displayController.renderStatus("your", gameOver);
        // place ships
        let humanBoard = humanPlayer.getBoard();
        let aiBoard = aiPlayer.getBoard();

        fillBoard(humanBoard);
        fillBoard(aiBoard);
        // render the ships 

        displayController.renderBoards(humanBoard, aiBoard);

        while (!checkGameOver) {
            if (humanPlayer.getTurn()) {

            } else {
                _makeAIMove(humanBoard);
                // find a way to get the right coords from AI and change the board square
                displayController.renderBoards(humanBoard, aiBoard);
                changeTurn();
            }
        }
    }

    const changeTurn = () => {
        if (humanPlayer.getTurn()) {
            humanPlayer.setTurn(false);
            aiPlayer.setTurn(true);
            displayController.renderStatus("AI's", gameOver);
        } else {
            humanPlayer.setTurn(true);
            aiPlayer.setTurn(false);
            displayController.renderStatus("your", gameOver);
        }
    }

    const checkValidTurn = (player) => {
        if (player === "you") { 
            return humanPlayer.getTurn();
        } else {
            return aiPlayer.getTurn();
        }
    }

    const getAiBoard = () => {
        return aiPlayer.getBoard();
    }

    const checkGameOver = () => {
        if (humanPlayer.getBoard().isAllSunk() || aiPlayer.getBoard().isAllSunk()) {
            gameOver = true;
        } else {
            gameOver = false; 
        }
    }

    return { resetGame, changeTurn, checkValidTurn, getAiBoard }
})();

export { logicController }