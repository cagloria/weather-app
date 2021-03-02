import { findWeatherIcon } from "../components/Weather";
import { icons } from "../icons";

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
        expect(findWeatherIcon(612)).toEqual(icons.sleet);
    });
    test("returns snow", () => {
        expect(findWeatherIcon(600)).toEqual(icons.snow);
        expect(findWeatherIcon(620)).toEqual(icons.snow);
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
