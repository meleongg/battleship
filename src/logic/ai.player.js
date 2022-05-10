import { Player } from "./player";

const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10); 
    return number; 
}

class AIPlayer extends Player {
    constructor(turn) {
        super("AI", turn);
    }

    makeAIMove(enemyBoard) {
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
}

export { AIPlayer }