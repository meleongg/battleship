import { shipFactory } from "./ship";

const BOARD_SIDE = 10;

const gameboardFactory = () => {
    // initialize 2D grid as everything empty
    // "miss" & call the ship factory's hit() if hit
    // ships
    // PROBLEM: how can I connect the ship's length to the gameboard position?
    // and also consider orientation
    let grid = [["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""]];
    
    const destroyer = shipFactory("destroyer", 2);
    const sub = shipFactory("sub", 3);
    const cruiser = shipFactory("cruiser", 3);
    const battleship = shipFactory("battleship", 4);
    const carrier = shipFactory("carrier", 5);
    
    let ships = [destroyer, sub, cruiser, battleship, carrier];
    // shipHeads will always be the left-most or top-most coordinate for each ship
    let shipHeads = {};
    
    const placeShip = (coords, ship) => {
        shipHeads[`${ship.name}`] = coords[0];

        for (let i = 0; i < coords.length; i++) {
            let coord = coords[i];
            let col = coord[0];
            let row = coord[1];

            grid[col][row] = ship.name; 
        }
    }

    const checkOrientation = (coord, ship) => {
        const col = coord[0];
        const row = coord[1];

        return (grid[col + 1][row] === ship) ? "x" : "y";
    }

    const receiveAttack = (coord) => {
        const col = coord[0];
        const row = coord[1];

        if ((grid[col][row] !== "") && (grid[col][row] !== "miss")) {
            const ship = grid[col][row];
            const shipHead = shipHeads[ship];
            const shipHeadCol = shipHead[0];
            const shipHeadRow = shipHead[1];

            let orientation = checkOrientation(shipHead, ship);
            let difference; 

            if (orientation === "x") {
                difference = col - shipHeadCol;
            } else {
                difference = row - shipHeadRow; 
            }
            
            switch (ship) {
                case "destroyer":
                    destroyer.hit(difference);
                case "sub":
                    sub.hit(difference);
                case "cruiser":
                    cruiser.hit(difference);
                case "battleship":
                    battleship.hit(difference);
                default: 
                    carrier.hit(difference);
            }

        } else {
            grid[row][col] = "miss";
        }
    }

    const isAllSunk = () => {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }

        return true; 
    }

    return { ships, grid, placeShip, receiveAttack, isAllSunk }
}

export { gameboardFactory, BOARD_SIDE }