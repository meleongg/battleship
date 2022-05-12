import { Player } from "../src/logic/player";

let testPlayer;

beforeEach(() => {
    testPlayer = new Player(true);
});

test("test constructor", () => {
    expect(testPlayer.getTurn()).toBeTruthy();
});