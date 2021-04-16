import { CARDINAL_DIRECTION } from "../components/Details";

describe("findCardinalDirection", () => {
    test("returns N", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(0);
        expect(result.abbreviation).toEqual("N");
        result = CARDINAL_DIRECTION.findCardinalDirection(360);
        expect(result.abbreviation).toEqual("N");
        result = CARDINAL_DIRECTION.findCardinalDirection(348.75);
        expect(result.abbreviation).toEqual("N");
        result = CARDINAL_DIRECTION.findCardinalDirection(11.25);
        expect(result.abbreviation).toEqual("N");
    });
    test("returns NNE", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(22.5);
        expect(result.abbreviation).toEqual("NNE");
    });
    test("returns NE", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(45);
        expect(result.abbreviation).toEqual("NE");
    });
    test("returns ENE", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(67.5);
        expect(result.abbreviation).toEqual("ENE");
    });
    test("returns E", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(90);
        expect(result.abbreviation).toEqual("E");
    });
    test("returns ESE", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(112.5);
        expect(result.abbreviation).toEqual("ESE");
    });
    test("returns SE", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(135);
        expect(result.abbreviation).toEqual("SE");
    });
    test("returns SSE", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(157.5);
        expect(result.abbreviation).toEqual("SSE");
    });
    test("returns S", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(180);
        expect(result.abbreviation).toEqual("S");
    });
    test("returns SSW", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(202.5);
        expect(result.abbreviation).toEqual("SSW");
    });
    test("returns SW", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(225);
        expect(result.abbreviation).toEqual("SW");
    });
    test("returns WSW", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(247.5);
        expect(result.abbreviation).toEqual("WSW");
    });
    test("returns W", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(270);
        expect(result.abbreviation).toEqual("W");
    });
    test("returns WNW", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(292.5);
        expect(result.abbreviation).toEqual("WNW");
    });
    test("returns NW", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(315);
        expect(result.abbreviation).toEqual("NW");
    });
    test("returns NNW", () => {
        let result = CARDINAL_DIRECTION.findCardinalDirection(337.5);
        expect(result.abbreviation).toEqual("NNW");
    });
});
