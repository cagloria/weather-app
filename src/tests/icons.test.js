import { icons, findWeatherIcon } from "../utilities/icons";

describe("findWeatherIcon", () => {
    test("returns thunderstorm", () => {
        expect(findWeatherIcon(200)).toEqual(icons.thunderstorm);
    });
    test("returns drizzle", () => {
        expect(findWeatherIcon(350)).toEqual(icons.drizzle);
    });
    test("returns light rain", () => {
        expect(findWeatherIcon(500)).toEqual(icons.rainLight);
        expect(findWeatherIcon(501)).toEqual(icons.rainLight);
    });
    test("returns heavy rain", () => {
        expect(findWeatherIcon(520)).toEqual(icons.rainHeavy);
    });
    test("returns sleet", () => {
        expect(findWeatherIcon(611)).toEqual(icons.sleet);
        expect(findWeatherIcon(612)).toEqual(icons.sleet);
        expect(findWeatherIcon(613)).toEqual(icons.sleet);
    });
    test("returns snow", () => {
        expect(findWeatherIcon(600)).toEqual(icons.snow);
        expect(findWeatherIcon(620)).toEqual(icons.snow);
    });
    test("returns mist", () => {
        expect(findWeatherIcon(701)).toEqual(icons.mist);
        expect(findWeatherIcon(721)).toEqual(icons.mist);
        expect(findWeatherIcon(741)).toEqual(icons.mist);
    });
    test("returns smoke", () => {
        expect(findWeatherIcon(711)).toEqual(icons.smoke);
    });
    test("returns dust", () => {
        expect(findWeatherIcon(731)).toEqual(icons.dust);
        expect(findWeatherIcon(761)).toEqual(icons.dust);
    });
    test("returns ash", () => {
        expect(findWeatherIcon(762)).toEqual(icons.ash);
    });
    test("returns wind", () => {
        expect(findWeatherIcon(771)).toEqual(icons.wind);
    });
    test("returns tornado", () => {
        expect(findWeatherIcon(781)).toEqual(icons.tornado);
    });
    test("returns clear", () => {
        expect(findWeatherIcon(800)).toEqual(icons.clear);
    });
    test("returns light clouds", () => {
        expect(findWeatherIcon(801)).toEqual(icons.cloudsLight);
    });
    test("returns heavy clouds", () => {
        expect(findWeatherIcon(802)).toEqual(icons.cloudsHeavy);
    });
});
