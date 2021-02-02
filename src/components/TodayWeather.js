import React, { useState, useEffect } from "react";
import Clock from "./Clock";

const API = (() => {
    const _key = process.env.REACT_APP_WEATHER_API_KEY;
    const url =
        "http://api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=" +
        _key;

    return { url };
})();

export default function TodayWeather() {
    const [weatherData, setWeather] = useState(undefined);

    useEffect(() => {
        async function getWeather() {
            try {
                const response = await fetch(API.url);
                const data = await response.json();
                console.log(data);
                setWeather(data);
            } catch (error) {
                console.log(error);
            }
        }

        getWeather();
    }, []);

    function convertFromUnix(time) {
        const newTime = new Date(time * 1000);
        return newTime.toLocaleTimeString();
    }

    const data =
        weatherData === undefined ? (
            <p>Getting data...</p>
        ) : (
            <>
                <p>{weatherData.name}</p>
                <p>{weatherData.main.temp}&deg;</p>
                <p>
                    {weatherData.main.temp_max}&deg;&uarr;{" "}
                    {weatherData.main.temp_min}
                    &deg;&darr;
                </p>
                <p>{weatherData.weather[0].main}</p>
                <div>
                    <p>Sunrise</p>
                    <p>{convertFromUnix(weatherData.sys.sunrise)}</p>
                    <p>Sunset</p>
                    <p>{convertFromUnix(weatherData.sys.sunset)}</p>
                </div>
            </>
        );

    return (
        <div>
            <Clock />
            {data}
        </div>
    );
}
