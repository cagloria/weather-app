import React, { useState, useEffect } from "react";
import Clock from "./Clock";

const API = (() => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;

    function getUrl(location) {
        return `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;
    }

    return { getUrl };
})();

export default function TodayWeather({ location }) {
    const [weatherData, setWeather] = useState(undefined);
    const [message, setMessage] = useState("Getting today's weather...");

    useEffect(() => {
        async function getWeather() {
            try {
                const response = await fetch(API.getUrl(location));
                const data = await response.json();
                console.log(data);
                if (data.cod !== 200) {
                    throw new Error(`${data.cod}: ${data.message}`);
                }
                setMessage("");
                setWeather(data);
            } catch (error) {
                setMessage(`We couldn't get today's weather. ${error}`);
                setWeather(undefined);
            }
        }

        getWeather();
    }, [location]);

    function convertTimeFromUnix(time) {
        const newTime = new Date(time * 1000);
        return newTime.toLocaleTimeString();
    }

    return (
        <>
            <Clock />
            {weatherData === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <p>
                        {weatherData.name}, {weatherData.sys.country}
                    </p>
                    <p>{weatherData.main.temp}&deg;</p>
                    <p>
                        {weatherData.main.temp_max}&deg;&uarr;{" "}
                        {weatherData.main.temp_min}
                        &deg;&darr;
                    </p>
                    <p>{weatherData.weather[0].main}</p>

                    <div>
                        <p>Sunrise</p>
                        <p>{convertTimeFromUnix(weatherData.sys.sunrise)}</p>
                        <p>Sunset</p>
                        <p>{convertTimeFromUnix(weatherData.sys.sunset)}</p>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>{weatherData.wind.speed} mph</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{weatherData.main.humidity}%</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{weatherData.main.pressure}hPa</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
