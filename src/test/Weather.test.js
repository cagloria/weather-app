import { convertTimeFromUnix } from "../components/Weather";

describe("convertTimeFromUnix", () => {
    test("converts time from UNIX", () => {
        let result = convertTimeFromUnix(1609459200);
        expect(result).toEqual(
            new Date("Friday, January 1, 2021 12:00:00 AM GMT")
        );
    });
});
