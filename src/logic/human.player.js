import { Player } from "./player";

class HumanPlayer extends Player {
    constructor(name, turn) {
        super(name, turn);
    }

    // assume that the coord will always be valid 
    makeMove(coord, enemyBoard) {
        enemyBoard.receiveAttack(coord);
    }
}

export { HumanPlayer }