import { shipFactory } from "./ship";

const gameboardFactory = () => {
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

    const checkHitShip = (col, row) => {
        if (grid[col][row] === "miss") {
            return false; 
        } else if (grid[col][row] === "") {
            return false; 
        } else {
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
                    return (destroyer.status[difference] === "hit") ? false : "destroyer";
                case "sub":
                    return (sub.status[difference] === "hit") ? false : "sub";
                case "cruiser":
                    return (cruiser.status[difference] === "hit") ? false : "cruiser";
                case "battleship":
                    return (battleship.status[difference] === "hit") ? false : "battleship";
                default: 
                    return (carrier.status[difference] === "hit") ? false : "carrier";
            }
        }
    }

    const checkValidShot = (col, row) => {
        if (grid[col][row] === "miss") {
            return false; 
        } else if (grid[col][row] === "") {
            return true; 
        } else {
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
                    return (destroyer.status[difference] === "hit") ? false : true;
                case "sub":
                    return (sub.status[difference] === "hit") ? false : true;
                case "cruiser":
                    return (cruiser.status[difference] === "hit") ? false : true;
                case "battleship":
                    return (battleship.status[difference] === "hit") ? false : true;
                default: 
                    return (carrier.status[difference] === "hit") ? false : true;
            }
        }
    }

    const checkOrientation = (coord, ship) => {
        const col = coord[0];
        const row = coord[1];
        
        if (col + 1 > 9) {
            return "y";
        } else if (grid[col + 1][row] === ship) {
            return "x";
        } else if (row + 1 > 9) {
            return "x";
        } else {
            return "y";
        }
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
                    break;
                case "sub":
                    sub.hit(difference);
                    break;
                case "cruiser":
                    cruiser.hit(difference);
                    break;
                case "battleship":
                    battleship.hit(difference);
                    break;
                default: 
                    carrier.hit(difference);
                    break;
            }

        } else {
            grid[col][row] = "miss";
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

    const getContentByCoord = (col, row) => {
        return grid[col][row];
    }

    const getShipByName = (ship) => {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].name === ship) {
                return ships[i]; 
            }
        }
    }

    return { ships, grid, placeShip, checkValidShot, receiveAttack, isAllSunk, getContentByCoord, getShipByName,
        checkHitShip }
}

export { gameboardFactory }