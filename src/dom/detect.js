import { logicController } from "./dom.logic";
import { displayController } from "./display";

const detectController = (() => {
    const detectSquareClick = (square) => {
        square.addEventListener("click", () => {
            const squareName = square.id;
            const boardName = displayController.getBoardName(squareName);
            const coords = displayController.getSquareCoords(squareName, boardName);
            const aiBoard = logicController.getAiBoard();
            
            const col = coords[0];
            const row = coords[1];

            if (aiBoard.checkValidShot(col, row) && logicController.checkValidTurn(boardName)) {
                aiBoard.receiveAttack([col, row]);
                displayController.renderBoards();
            }

            logicController.changeTurn();

            console.log('detecting')
        });
    }

    return { detectSquareClick }
})();

export { detectController }