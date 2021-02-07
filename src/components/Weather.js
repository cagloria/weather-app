import React, { useState, useEffect } from "react";

const WEATHER_API = (() => {
    const _key = process.env.REACT_APP_WEATHER_API_KEY;

    function getUrl(location) {
        return (
            `http://api.openweathermap.org/data/2.5/weather?q=${location}` +
            `&units=imperial&appid=${_key}`
        );
    }

    return { getUrl };
})();

export default function Weather({ location }) {
    const [APIData, setAPIData] = useState(undefined);
    const [message, setMessage] = useState("Getting today's weather...");

    useEffect(() => {
        async function getWeatherAPI() {
            try {
                const response = await fetch(WEATHER_API.getUrl(location));
                const data = await response.json();
                if (data.cod !== 200) {
                    throw new Error(
                        `We couldn't get today's weather from OpenWeather. ` +
                            `Status ${data.cod}: ${data.message}`
                    );
                } else {
                    processData(data);
                }
            } catch (error) {
                setMessage(`${error}`);
                setAPIData(undefined);
            }
        }

        function processData(data) {
            try {
                setMessage("");
                setAPIData(data);
            } catch (error) {
                console.log(error);
                setMessage(
                    `There was a problem in the app. Contact the developer ` +
                        `if it continues.`
                );
            }
        }

        getWeatherAPI();
    }, [location]);

    function convertTimeFromUnix(time) {
        const newTime = new Date(time * 1000);
        return newTime.toLocaleTimeString();
    }

    return (
        <>
            {APIData === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <p>
                        {APIData.name}, {APIData.sys.country}
                    </p>
                    <p>{APIData.main.temp}&deg;</p>
                    <p>
                        {APIData.main.temp_max}&deg;&uarr;{" "}
                        {APIData.main.temp_min}
                        &deg;&darr;
                    </p>
                    <p>{APIData.weather[0].main}</p>

                    <div>
                        <p>Sunrise</p>
                        <p>{convertTimeFromUnix(APIData.sys.sunrise)}</p>
                        <p>Sunset</p>
                        <p>{convertTimeFromUnix(APIData.sys.sunset)}</p>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>{APIData.wind.speed} mph</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{APIData.main.humidity}%</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{APIData.main.pressure}hPa</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
