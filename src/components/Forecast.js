import React, { useState, useEffect } from "react";

const FORECAST_API = (() => {
    const _key = process.env.REACT_APP_WEATHER_API_KEY;

    function getUrl(location) {
        return `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${_key}`;
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

export default function Forecast({ location }) {
    const [forecastData, setForecast] = useState(undefined);
    const [forecastMinMax, setForecastMinMax] = useState(undefined);
    const [message, setMessage] = useState("Getting the forecast...");
    const dayOptions = { weekday: "long" };

    useEffect(() => {
        async function getForecast() {
            try {
                const response = await fetch(FORECAST_API.getUrl(location));
                const data = await response.json();
                console.log(data);
                if (data.cod !== "200") {
                    throw new Error(`${data.cod}: ${data.message}`);
                }
                setMessage("");
                setForecast(data);
                findMinMaxTemp(data);
            } catch (error) {
                console.log(error);
                setMessage(`We couldn't get the forecast. ${error}`);
                setForecast(undefined);
            }
        }

        getForecast();
    }, [location]);

    function findMinMaxTemp(data) {
        const { list } = data;
        const today = new Date();
        let day1 = {
            date: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1
            ),
            minArr: [],
            maxArr: [],
            min: undefined,
            max: undefined,
        };
        let day2 = {
            date: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 2
            ),
            minArr: [],
            maxArr: [],
            min: undefined,
            max: undefined,
        };
        let day3 = {
            date: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 3
            ),
            minArr: [],
            maxArr: [],
            min: undefined,
            max: undefined,
        };

        list.forEach((timestamp) => {
            const timestampDate = new Date(timestamp.dt_txt);

            if (datesMatch(timestampDate, day1.date)) {
                day1.minArr.push(timestamp.main.temp_min);
                day1.maxArr.push(timestamp.main.temp_max);
            }

            if (datesMatch(timestampDate, day2.date)) {
                day2.minArr.push(timestamp.main.temp_min);
                day2.maxArr.push(timestamp.main.temp_max);
            }

            if (datesMatch(timestampDate, day3.date)) {
                day3.minArr.push(timestamp.main.temp_min);
                day3.maxArr.push(timestamp.main.temp_max);
            }
        });

        day1.min = Math.min(...day1.minArr);
        day1.max = Math.max(...day1.maxArr);
        day2.min = Math.min(...day2.minArr);
        day2.max = Math.max(...day2.maxArr);
        day3.min = Math.min(...day3.minArr);
        day3.max = Math.max(...day3.maxArr);

        setForecastMinMax({
            day1,
            day2,
            day3,
        });
    }

    return (
        <div>
            {forecastData === undefined || forecastMinMax === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <div>
                        <p>Tomorrow</p>
                        <p>
                            {forecastMinMax.day1.max}&deg;&uarr;{" "}
                            {forecastMinMax.day1.min}
                            &deg;&darr;
                        </p>
                    </div>

                    <div>
                        <p>
                            {forecastMinMax.day2.date.toLocaleDateString(
                                undefined,
                                dayOptions
                            )}
                        </p>
                        <p>
                            {forecastMinMax.day2.max}&deg;&uarr;{" "}
                            {forecastMinMax.day2.min}
                            &deg;&darr;
                        </p>
                    </div>

                    <div>
                        <p>
                            {forecastMinMax.day3.date.toLocaleDateString(
                                undefined,
                                dayOptions
                            )}
                        </p>
                        <p>
                            {forecastMinMax.day3.max}&deg;&uarr;{" "}
                            {forecastMinMax.day3.min}
                            &deg;&darr;
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
