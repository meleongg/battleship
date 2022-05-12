import { AIPlayer } from "../logic/ai.player";
import { HumanPlayer } from "../logic/human.player";
import { displayController } from "./display";
import { shipFactory } from "../logic/ship";

const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10); 
    return number; 
}

const logicController = (() => {
    let gameOver;
    let humanPlayer = new HumanPlayer(true);
    let aiPlayer = new AIPlayer(false);

    let destroyer = shipFactory("destroyer", 2);
    let sub = shipFactory("sub", 3);
    let cruiser = shipFactory("cruiser", 3);
    let battleship = shipFactory("battleship", 4);
    let carrier = shipFactory("carrier", 5);

    const _fillBoard = (board) => {
        board.placeShip([[0, 0], [1, 0]], destroyer);
        board.placeShip([[2, 0], [3, 0], [4, 0]], sub);
        board.placeShip([[5, 0], [6, 0], [7, 0]], cruiser);
        board.placeShip([[0, 1], [0, 2], [0, 3], [0, 4]], battleship);
        board.placeShip([[0, 5], [0, 6], [0, 7], [0, 8], [0, 9]], carrier);
    }

    const _makeAIMove = (enemyBoard) => {
        let isValidCoord = false; 
        const humanBoard = getHumanBoard();
        const aiBoard = getAiBoard();

        while (!isValidCoord) {
            let xCoord = generateRandomNumber();
            let yCoord = generateRandomNumber();

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

        humanPlayer.setTurn(true);
        aiPlayer.setTurn(false);

        displayController.renderStatus("your", gameOver);
        // place ships
        const humanBoard = humanPlayer.getBoard();
        const aiBoard = aiPlayer.getBoard();

        _fillBoard(humanBoard);
        _fillBoard(aiBoard);
        // render the ships 

        displayController.renderBoards(humanBoard, aiBoard);
    }

    const changeTurn = () => {
        if (!gameOver) {
            if (humanPlayer.getTurn()) {
                humanPlayer.setTurn(false);
                aiPlayer.setTurn(true);
                displayController.renderStatus("AI's", gameOver);
                const humanBoard = getHumanBoard();
                _makeAIMove(humanBoard);
            } else {
                humanPlayer.setTurn(true);
                aiPlayer.setTurn(false);
                displayController.renderStatus("your", gameOver);
            }
        } else {
            const winner = _getWinner();
            displayController.renderStatus(winner, gameOver);
        }
    }

    const _getWinner = () => {
        return (humanPlayer.getBoard().isAllSunk()) ? "AI has" : "You have";
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
        checkShipSunk }
})();

export { logicController }