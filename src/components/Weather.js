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

export function convertTimeFromUnix(unixTimestamp) {
    const convertedDate = new Date(unixTimestamp * 1000);
    return convertedDate;
}

export default function Weather({ location }) {
    const [APIData, setAPIData] = useState(undefined);
    const [weatherObj, setWeatherObj] = useState(undefined);
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
                setWeatherObj({
                    city: data.name,
                    country: data.sys.country,
                    temperature: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    weather: data.weather[0].main,
                    sunrise: convertTimeFromUnix(
                        data.sys.sunrise
                    ).toLocaleTimeString(),
                    sunset: convertTimeFromUnix(
                        data.sys.sunset
                    ).toLocaleTimeString(),
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                });
            } catch (error) {
                console.log(error);
                setMessage(
                    `There was a problem in the app. Contact the developer ` +
                        `if it continues.`
                );
                setWeatherObj(undefined);
            }
        }

        getWeatherAPI();
    }, [location]);

    return (
        <>
            {APIData === undefined || weatherObj === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <p>
                        {weatherObj.city}, {weatherObj.country}
                    </p>
                    <p>{weatherObj.temperature}&deg;</p>
                    <p>
                        {weatherObj.tempMax}&deg;&uarr; {weatherObj.tempMin}
                        &deg;&darr;
                    </p>
                    <p>{weatherObj.weather}</p>

                    <div>
                        <p>Sunrise</p>
                        <p>{weatherObj.sunrise}</p>
                        <p>Sunset</p>
                        <p>{weatherObj.sunset}</p>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>{weatherObj.wind} mph</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{weatherObj.humidity}%</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{weatherObj.pressure}hPa</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
