import { gameboardFactory } from "./gameboard";

class Player {
    constructor(turn) {
        this.board = gameboardFactory();
        this.turn = turn; 
    }

    setTurn(value) {
        this.turn = value;
    }

    getBoard() {
        return this.board; 
    }

    getTurn() {
        return this.turn;
    }
}

export { Player }