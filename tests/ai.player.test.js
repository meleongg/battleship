import { AIPlayer } from "../src/logic/ai.player";
import { gameboardFactory } from "../src/logic/gameboard";
import { shipFactory } from "../src/logic/ship";

let testPlayer;
let testBoard;

let destroyer;
let sub;
let cruiser;
let battleship;
let carrier; 

const fillTestBoard = () => {
    testBoard.placeShip([[0, 0], [1, 0]], destroyer);
    testBoard.placeShip([[2, 0], [3, 0], [4, 0]], sub);
    testBoard.placeShip([[5, 0], [6, 0], [7, 0]], cruiser);
    testBoard.placeShip([[0, 1], [0, 2], [0, 3], [0, 4]], battleship);
    testBoard.placeShip([[0, 5], [0, 6], [0, 7], [0, 8], [0, 9]], carrier);
}

beforeEach(() => {
    testPlayer = new AIPlayer(false);

    destroyer = shipFactory("destroyer", 2);
    sub = shipFactory("sub", 3);
    cruiser = shipFactory("cruiser", 3);
    battleship = shipFactory("battleship", 4);
    carrier = shipFactory("carrier", 5);

    testBoard = gameboardFactory();
    fillTestBoard(testBoard); 
});

test("test constructor", () => {
    expect(testPlayer.getTurn()).toBeFalsy();
});