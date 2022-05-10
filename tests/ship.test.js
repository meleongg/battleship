import { shipFactory } from "../src/logic/ship";

let testShip;
let testShipLong;

beforeEach(() => {
    testShip = shipFactory("a", 1);
    testShipLong = shipFactory("carrier", 5);
});

test("test factory construction", () => {
    expect(testShip.name).toMatch(/a/);
    expect(testShip.status.length).toEqual(1);
    expect(testShip.status[0]).toMatch(/not hit/);
    expect(testShip.isSunk()).toBeFalsy();
});

test("test hit ship length 1", () => {
    testShip.hit(0);
    expect(testShip.status[0]).toMatch(/hit/);
    expect(testShip.isSunk()).toBeTruthy();
});

test("test hit ship length 5 in order", () => {
    testShipLong.hit(0);
    expect(testShipLong.status[0]).toMatch(/hit/);
    expect(testShipLong.status[1]).toMatch(/not hit/);
    expect(testShipLong.status[2]).toMatch(/not hit/);
    expect(testShipLong.status[3]).toMatch(/not hit/);
    expect(testShipLong.status[4]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();

    testShipLong.hit(1);
    expect(testShipLong.status[1]).toMatch(/hit/);
    expect(testShipLong.status[2]).toMatch(/not hit/);
    expect(testShipLong.status[3]).toMatch(/not hit/);
    expect(testShipLong.status[4]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();

    testShipLong.hit(2);
    expect(testShipLong.status[2]).toMatch(/hit/);
    expect(testShipLong.status[3]).toMatch(/not hit/);
    expect(testShipLong.status[4]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();

    testShipLong.hit(3);
    expect(testShipLong.status[3]).toMatch(/hit/);
    expect(testShipLong.status[4]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();

    testShipLong.hit(4);
    expect(testShipLong.status[4]).toMatch(/hit/);
    expect(testShipLong.isSunk()).toBeTruthy();
});

test("test hit ship length 5 not linear", () => {
    testShipLong.hit(0);
    expect(testShipLong.status[0]).toMatch(/hit/);
    expect(testShipLong.status[1]).toMatch(/not hit/);
    expect(testShipLong.status[2]).toMatch(/not hit/);
    expect(testShipLong.status[3]).toMatch(/not hit/);
    expect(testShipLong.status[4]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();

    testShipLong.hit(3);
    expect(testShipLong.status[3]).toMatch(/hit/);
    expect(testShipLong.status[1]).toMatch(/not hit/);
    expect(testShipLong.status[2]).toMatch(/not hit/);
    expect(testShipLong.status[4]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();
    
    testShipLong.hit(4);
    expect(testShipLong.status[4]).toMatch(/hit/);
    expect(testShipLong.status[1]).toMatch(/not hit/);
    expect(testShipLong.status[2]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();

    testShipLong.hit(2);
    expect(testShipLong.status[2]).toMatch(/hit/);
    expect(testShipLong.status[1]).toMatch(/not hit/);
    expect(testShipLong.isSunk()).toBeFalsy();

    testShipLong.hit(1);
    expect(testShipLong.status[1]).toMatch(/hit/);
    expect(testShipLong.isSunk()).toBeTruthy();
});