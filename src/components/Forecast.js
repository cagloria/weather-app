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

const dateFactory = (date) => {
    let minArr = [];
    let maxArr = [];
    let min = 0;
    let max = 0;

    function addToMinArr(temp) {
        minArr.push(temp);
    }

    function addToMaxArr(temp) {
        maxArr.push(temp);
    }

    function findMinAndMax() {
        this.min = Math.min(...minArr);
        this.max = Math.max(...maxArr);
    }

    return {
        date,
        min,
        max,
        addToMinArr,
        addToMaxArr,
        findMinAndMax,
    };
};

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
            }

            if (datesMatch(timestampDate, day2.date)) {
                day2.addToMinArr(timestamp.main.temp_min);
                day2.addToMaxArr(timestamp.main.temp_max);
            }

            if (datesMatch(timestampDate, day3.date)) {
                day3.addToMinArr(timestamp.main.temp_min);
                day3.addToMaxArr(timestamp.main.temp_max);
            }
        });

        day1.findMinAndMax();
        day2.findMinAndMax();
        day3.findMinAndMax();

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
