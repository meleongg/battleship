import { gameboardFactory, BOARD_SIDE } from "../src/gameboard";
import { shipFactory } from "../src/ship";

let testBoard;
let testBoardFull; 

let destroyer;
let sub;
let cruiser;
let battleship;
let carrier; 

beforeEach(() => {
    testBoard = gameboardFactory();
    testBoardFull = gameboardFactory();
    
    destroyer = shipFactory("destroyer", 2);
    sub = shipFactory("sub", 3);
    cruiser = shipFactory("cruiser", 3);
    battleship = shipFactory("battleship", 4);
    carrier = shipFactory("carrier", 5);

    fillTestBoard(testBoardFull);
});

const fillTestBoard = () => {
    testBoardFull.placeShip([[0, 0], [1, 0]], destroyer);
    testBoardFull.placeShip([[2, 0], [3, 0], [4, 0]], sub);
    testBoardFull.placeShip([[5, 0], [6, 0], [7, 0]], cruiser);
    testBoardFull.placeShip([[0, 1], [0, 2], [0, 3], [0, 4]], battleship);
    testBoardFull.placeShip([[0, 5], [0, 6], [0, 7], [0, 8], [0, 9]], carrier);
}

test("test correct grid initialization", () => {
    expect(testBoard.ships.length).toBe(5);
    expect(testBoard.grid.length).toBe(10);
    expect(testBoardFull.isAllSunk()).toBeFalsy();

    for (let col = 0; col < BOARD_SIDE; col++) {
        expect(testBoard.grid[col].length).toBe(10);
    }
});

test("test place destroyer top-left corner horizontally", () => {
    testBoard.placeShip([[0, 0], [1, 0]], destroyer);

    expect(testBoard.grid[0][0]).toMatch(/destroyer/);
    expect(testBoard.grid[1][0]).toMatch(/destroyer/);
});

test("test place all ships on the grid perimeter & corners", () => {
    testBoard.placeShip([[0, 0], [1, 0]], destroyer);
    expect(testBoard.grid[0][0]).toMatch(/destroyer/);
    expect(testBoard.grid[1][0]).toMatch(/destroyer/);

    testBoard.placeShip([[2, 0], [3, 0], [4, 0]], sub);
    expect(testBoard.grid[2][0]).toMatch(/sub/);
    expect(testBoard.grid[3][0]).toMatch(/sub/);
    expect(testBoard.grid[4][0]).toMatch(/sub/);

    testBoard.placeShip([[5, 0], [6, 0], [7, 0]], cruiser);
    expect(testBoard.grid[5][0]).toMatch(/cruiser/);
    expect(testBoard.grid[6][0]).toMatch(/cruiser/);
    expect(testBoard.grid[7][0]).toMatch(/cruiser/);

    testBoard.placeShip([[0, 1], [0, 2], [0, 3], [0, 4]], battleship);
    expect(testBoard.grid[0][1]).toMatch(/battleship/);
    expect(testBoard.grid[0][2]).toMatch(/battleship/);
    expect(testBoard.grid[0][3]).toMatch(/battleship/);
    expect(testBoard.grid[0][4]).toMatch(/battleship/);

    testBoard.placeShip([[0, 5], [0, 6], [0, 7], [0, 8], [0, 9]], carrier);
    expect(testBoard.grid[0][5]).toMatch(/carrier/);
    expect(testBoard.grid[0][6]).toMatch(/carrier/);
    expect(testBoard.grid[0][7]).toMatch(/carrier/);
    expect(testBoard.grid[0][8]).toMatch(/carrier/);
    expect(testBoard.grid[0][9]).toMatch(/carrier/);
});

test("testBoardFull receiveAttack missed shot", () => {
    testBoardFull.receiveAttack([1, 1]);
    expect(testBoardFull.grid[1][1]).toMatch(/miss/);
    expect(testBoardFull.isAllSunk()).toBeFalsy();
});

test("testBoardFull receiveAttack multiple missed shot", () => {
    testBoardFull.receiveAttack([1, 1]);
    expect(testBoardFull.grid[1][1]).toMatch(/miss/);

    testBoardFull.receiveAttack([9, 9]);
    expect(testBoardFull.grid[9][9]).toMatch(/miss/);

    expect(testBoardFull.isAllSunk()).toBeFalsy();
});

test("testBoardFull receiveAttack hit destroyer at 0, 0", () => {
    testBoardFull.receiveAttack([0, 0]);
    expect(testBoardFull.isAllSunk()).toBeFalsy();
});

test("testBoardFull receiveAttack sink destroyer & sub", () => {
    testBoardFull.receiveAttack([0, 0]);
    testBoardFull.receiveAttack([1, 0]);
    testBoardFull.receiveAttack([2, 0]);
    testBoardFull.receiveAttack([3, 0]);
    testBoardFull.receiveAttack([4, 0]);
    expect(testBoardFull.isAllSunk()).toBeFalsy();
});

test("testBoardFull receiveAttack sink all ships", () => {
    testBoardFull.receiveAttack([0, 0]);
    testBoardFull.receiveAttack([1, 0]);
    testBoardFull.receiveAttack([2, 0]);
    testBoardFull.receiveAttack([3, 0]);
    testBoardFull.receiveAttack([4, 0]);
    testBoardFull.receiveAttack([5, 0]);
    testBoardFull.receiveAttack([6, 0]);
    testBoardFull.receiveAttack([7, 0]);
    testBoardFull.receiveAttack([0, 1]);
    testBoardFull.receiveAttack([0, 2]);
    testBoardFull.receiveAttack([0, 3]);
    testBoardFull.receiveAttack([0, 4]);
    testBoardFull.receiveAttack([0, 5]);
    testBoardFull.receiveAttack([0, 6]);
    testBoardFull.receiveAttack([0, 7]);
    testBoardFull.receiveAttack([0, 8]);
    testBoardFull.receiveAttack([0, 9]);
    expect(testBoardFull.isAllSunk()).toBeTruthy();
});