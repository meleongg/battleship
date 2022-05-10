import { gameboardFactory } from "./gameboard";

class Player {
    constructor(name, turn) {
        this.name = name; 
        this.board = gameboardFactory();
        this.turn = turn; 
    }

    getBoard() {
        return this.board; 
    }

    getName() {
        return this.name;
    }

    getTurn() {
        return this.turn;
    }
}

export { Player }