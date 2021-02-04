import React, { useState, useEffect } from "react";

const FORECAST_API = (() => {
    const _key = process.env.REACT_APP_WEATHER_API_KEY;

    function getUrl(location) {
        return `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${_key}`;
    }

    return { getUrl };
})();

export default function Forecast({ location }) {
    const [forecastData, setForecast] = useState(undefined);
    const [minMax, setMinMax] = useState(undefined);
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
        };
        let day2 = {
            date: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 2
            ),
            minArr: [],
            maxArr: [],
        };
        let day3 = {
            date: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 3
            ),
            minArr: [],
            maxArr: [],
        };

        list.forEach((timestamp) => {
            const date = new Date(timestamp.dt_txt);

            if (
                date.getFullYear() === day1.date.getFullYear() &&
                date.getMonth() === day1.date.getMonth() &&
                date.getDate() === day1.date.getDate()
            ) {
                day1.minArr.push(timestamp.main.temp_min);
                day1.maxArr.push(timestamp.main.temp_max);
            }

            if (
                date.getFullYear() === day2.date.getFullYear() &&
                date.getMonth() === day2.date.getMonth() &&
                date.getDate() === day2.date.getDate()
            ) {
                day2.minArr.push(timestamp.main.temp_min);
                day2.maxArr.push(timestamp.main.temp_max);
            }

            if (
                date.getFullYear() === day3.date.getFullYear() &&
                date.getMonth() === day3.date.getMonth() &&
                date.getDate() === day3.date.getDate()
            ) {
                day3.minArr.push(timestamp.main.temp_min);
                day3.maxArr.push(timestamp.main.temp_max);
            }
        });

        setMinMax({
            day1: {
                date: day1.date,
                min: Math.min(...day1.minArr),
                max: Math.max(...day1.maxArr),
            },
            day2: {
                date: day2.date,
                min: Math.min(...day2.minArr),
                max: Math.max(...day2.maxArr),
            },
            day3: {
                date: day3.date,
                min: Math.min(...day3.minArr),
                max: Math.max(...day3.maxArr),
            },
        });
    }

    return (
        <div>
            {forecastData === undefined || minMax === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <div>
                        <p>Tomorrow</p>
                        <p>
                            {minMax.day1.max}&deg;&uarr; {minMax.day1.min}
                            &deg;&darr;
                        </p>
                    </div>

                    <div>
                        <p>
                            {minMax.day2.date.toLocaleDateString(
                                undefined,
                                dayOptions
                            )}
                        </p>
                        <p>
                            {minMax.day2.max}&deg;&uarr; {minMax.day2.min}
                            &deg;&darr;
                        </p>
                    </div>

                    <div>
                        <p>
                            {minMax.day3.date.toLocaleDateString(
                                undefined,
                                dayOptions
                            )}
                        </p>
                        <p>
                            {minMax.day3.max}&deg;&uarr; {minMax.day3.min}
                            &deg;&darr;
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
