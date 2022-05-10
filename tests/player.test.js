import { Player } from "../src/logic/player";

let testPlayer;

beforeEach(() => {
    testPlayer = new Player("bob", true);
});

test("test constructor", () => {
    expect(testPlayer.getName()).toMatch(/bob/);
    expect(testPlayer.getTurn()).toBeTruthy();
});