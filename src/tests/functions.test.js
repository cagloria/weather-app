import { roundNumber, convertTimeFromUnix } from "../functions";

describe("roundNumber", () => {
    test("rounds down with digits after the decimal point", () => {
        let result = roundNumber(5.33, 1);
        expect(result).toEqual(5.3);
    });
    test("rounds up with digits after the decimal point", () => {
        let result = roundNumber(5.35, 1);
        expect(result).toEqual(5.4);
    });
    test("rounds down with zero digits after the decimal point", () => {
        let result = roundNumber(5.2, 0);
        expect(result).toEqual(5);
    });
    test("rounds up with zero digits after the decimal point", () => {
        let result = roundNumber(5.6, 0);
        expect(result).toEqual(6);
    });
});

describe("convertTimeFromUnix", () => {
    test("converts time from UNIX", () => {
        let result = convertTimeFromUnix(1609459200);
        expect(result).toEqual(
            new Date("Friday, January 1, 2021 12:00:00 AM GMT")
        );
    });
});
