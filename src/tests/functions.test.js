import {
    roundNumber,
    convertTimeFromUnix,
    capitalize,
    convertToCelsius,
    convertToFahrenheit,
} from "../functions";

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

describe("capitalize", () => {
    test("capitalizes the first letter of a string", () => {
        let result = capitalize("example");
        expect(result).toEqual("Example");
    });
    test("does not modify a string if it is already capitzlied", () => {
        let result = capitalize("Example");
        expect(result).toEqual("Example");
    });
});

describe("convertToCelsius", () => {
    test("converts fahrenheit to celsius", () => {
        const result = convertToCelsius(32);
        expect(result).toEqual(0);
    });
    test("converts fahrenheit to celsius and rounds to a whole number", () => {
        const result = convertToCelsius(53);
        expect(result).toEqual(12);
    });
});

describe("convertToFahrenheit", () => {
    test("converts celsius to fahrenheit", () => {
        const result = convertToFahrenheit(0);
        expect(result).toEqual(32);
    });
    test("converts celsius to fahrenheit and rounds to a whole number", () => {
        const result = convertToFahrenheit(32);
        expect(result).toEqual(90);
    });
});
