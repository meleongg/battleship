import { Player } from "./player";

class HumanPlayer extends Player {
    constructor(turn) {
        super(turn);
    }

    // assume that the coord will always be valid 
    makeMove(coord, enemyBoard) {
        enemyBoard.receiveAttack(coord);
    }
}

export { HumanPlayer }