import React, { useState, useEffect } from "react";

const FORECAST_API = (() => {
    const _key = process.env.REACT_APP_WEATHER_API_KEY;

    function getUrl(location) {
        return (
            `http://api.openweathermap.org/data/2.5/forecast?q=${location}` +
            `&units=imperial&appid=${_key}`
        );
    }

    return { getUrl };
})();

function datesMatch(day1, day2) {
    return (
        day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() === day2.getDate()
    );
}

const dateFactory = (date) => {
    let minArr = [];
    let maxArr = [];
    let weatherArr = [];
    let min = 0;
    let max = 0;
    let weather = { name: "", count: 0 };

    function addToMinArr(temp) {
        minArr.push(temp);
    }

    function addToMaxArr(temp) {
        maxArr.push(temp);
    }

    function addToWeather(weather) {
        weatherArr.push(weather);
    }

    function determineMainWeather() {
        for (let i = 0; i < weatherArr.length; i++) {
            let count = 0;
            weatherArr.forEach((weather) => {
                if (weatherArr[i] === weather) {
                    count++;
                }
            });
            if (this.weather.count < count) {
                this.weather.name = weatherArr[i];
                this.weather.count = count;
            }
        }
    }

    function findMinAndMax() {
        this.min = Math.min(...minArr);
        this.max = Math.max(...maxArr);
    }

    return {
        date,
        min,
        max,
        weather,
        addToMinArr,
        addToMaxArr,
        addToWeather,
        determineMainWeather,
        findMinAndMax,
    };
};

export default function Forecast({ location }) {
    const [APIData, setAPIData] = useState(undefined);
    const [forecastObj, setForecastObj] = useState(undefined);
    const [message, setMessage] = useState("Getting the forecast...");
    const dayOptions = { weekday: "long" };

    useEffect(() => {
        async function getForecastAPI() {
            try {
                const response = await fetch(FORECAST_API.getUrl(location));
                const data = await response.json();
                if (data.cod !== "200") {
                    throw new Error(
                        `We couldn't get the forecast from OpenWeather. ` +
                            `Status ${data.cod}: ${data.message}`
                    );
                } else {
                    processData(data);
                }
            } catch (error) {
                console.log(error);
                setMessage(`${error}`);
                setAPIData(undefined);
            }
        }

        function processData(data) {
            try {
                setMessage("");
                setAPIData(data);
                formatData(data);
            } catch (error) {
                console.log(error);
                setMessage(
                    `There was a problem in the app. Contact the developer ` +
                        `if it continues.`
                );
                setForecastObj(undefined);
            }
        }

        getForecastAPI();
    }, [location]);

    function formatData(data) {
        const { list } = data;
        const today = new Date();
        let day1 = dateFactory(
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        );
        let day2 = dateFactory(
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
        );
        let day3 = dateFactory(
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
        );

        list.forEach((timestamp) => {
            const timestampDate = new Date(timestamp.dt_txt);

            if (datesMatch(timestampDate, day1.date)) {
                day1.addToMinArr(timestamp.main.temp_min);
                day1.addToMaxArr(timestamp.main.temp_max);
                day1.addToWeather(timestamp.weather[0].main);
            }

            if (datesMatch(timestampDate, day2.date)) {
                day2.addToMinArr(timestamp.main.temp_min);
                day2.addToMaxArr(timestamp.main.temp_max);
                day2.addToWeather(timestamp.weather[0].main);
            }

            if (datesMatch(timestampDate, day3.date)) {
                day3.addToMinArr(timestamp.main.temp_min);
                day3.addToMaxArr(timestamp.main.temp_max);
                day3.addToWeather(timestamp.weather[0].main);
            }
        });

        day1.findMinAndMax();
        day2.findMinAndMax();
        day3.findMinAndMax();
        day1.determineMainWeather();
        day2.determineMainWeather();
        day3.determineMainWeather();

        setForecastObj({
            day1,
            day2,
            day3,
        });
    }

    return (
        <div>
            {APIData === undefined || forecastObj === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <div>
                        <h3>Tomorrow</h3>
                        <p>{forecastObj.day1.weather.name}</p>
                        <p>
                            {forecastObj.day1.max}&deg;&uarr;{" "}
                            {forecastObj.day1.min}
                            &deg;&darr;
                        </p>
                    </div>

                    <div>
                        <h3>
                            {forecastObj.day2.date.toLocaleDateString(
                                undefined,
                                dayOptions
                            )}
                        </h3>
                        <p>{forecastObj.day2.weather.name}</p>
                        <p>
                            {forecastObj.day2.max}&deg;&uarr;{" "}
                            {forecastObj.day2.min}
                            &deg;&darr;
                        </p>
                    </div>

                    <div>
                        <h3>
                            {forecastObj.day3.date.toLocaleDateString(
                                undefined,
                                dayOptions
                            )}
                        </h3>
                        <p>{forecastObj.day3.weather.name}</p>
                        <p>
                            {forecastObj.day3.max}&deg;&uarr;{" "}
                            {forecastObj.day3.min}
                            &deg;&darr;
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
