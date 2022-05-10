const shipFactory = (shipName, length) => {
    const name = shipName; 
    let status = [];

    for (let i = 0; i < length; i++) {
        status.push("not hit");
    }

    const hit = (index) => {
        status[index] = "hit";
    }

    const isSunk = () => {
        for (let i = 0; i < length; i++) {
            if (status[i] === "not hit") {
                return false;
            }
        }

        return true; 
    }

    return { name, status, hit, isSunk };
}

export { shipFactory }