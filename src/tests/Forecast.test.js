import { datesMatch, dateFactory } from "../components/Forecast";

describe("datesMatch", () => {
    test("returns true if two dates are the same", () => {
        const day1 = new Date(2021, 1, 1, 0, 0, 0);
        const day2 = new Date(2021, 1, 1, 0, 0, 0);
        const result = datesMatch(day1, day2);
        expect(result).toEqual(true);
    });
    test("returns true if two dates are the same, even with different times", () => {
        const day1 = new Date(2021, 1, 1, 0, 0, 0);
        const day2 = new Date(2021, 1, 1, 12, 0, 0);
        const result = datesMatch(day1, day2);
        expect(result).toEqual(true);
    });
    test("returns false if two dates are not the same", () => {
        const day1 = new Date(2020, 1, 1);
        const day2 = new Date(2021, 1, 1);
        const result = datesMatch(day1, day2);
        expect(result).toEqual(false);
    });
});

describe("dateFactory.determinePrimaryWeather", () => {
    test("returns the most common occurence of weather", () => {
        let day1 = dateFactory(new Date());
        const weatherArr1 = ["Clouds", "Clouds", "Clouds", "Rain"];
        weatherArr1.forEach((weather) => {
            day1.addToWeatherArr(weather);
        });
        day1.determinePrimaryWeather();
        expect(day1.weather.name).toEqual("Clouds");
    });
    test("returns if there is only one weather", () => {
        let day2 = dateFactory(new Date());
        day2.addToWeatherArr("Rain");
        day2.determinePrimaryWeather();
        expect(day2.weather.name).toEqual("Rain");
    });
    test("returns the first weather to reach the highest occurence if two or more weathers occurr the same number of times", () => {
        let day3 = dateFactory(new Date());
        day3.addToWeatherArr("Rain");
        day3.addToWeatherArr("Sun");
        day3.determinePrimaryWeather();
        expect(day3.weather.name).toEqual("Rain");
    });
});

describe("dateFactory.findMinAndMax", () => {
    let day = dateFactory(new Date());
    const tempArr = [3, 5, 44, 22, 19];
    tempArr.forEach((number) => {
        day.addTemp(number);
    });
    day.findMinAndMax();

    test("finds the lowest temperature in the array", () => {
        expect(day.min).toEqual(3);
    });
    test("finds the highest temperature in the array", () => {
        expect(day.max).toEqual(44);
    });
});
