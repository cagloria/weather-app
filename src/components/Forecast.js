import React, { useState, useEffect } from "react";

const FORECAST_API = (() => {
    const _key = process.env.REACT_APP_WEATHER_API_KEY;

    function getUrl(location) {
        return `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&cnt=24&appid=${_key}`;
    }

    return { getUrl };
})();

export default function Forecast({ location }) {
    const [forecastData, setForecast] = useState(undefined);
    const [message, setMessage] = useState("Getting the forecast...");

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
            } catch (error) {
                console.log(error);
                setMessage(`We couldn't get the forecast. ${error}`);
                setForecast(undefined);
            }
        }

        getForecast();
    }, [location]);

    return (
        <div>
            {forecastData === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <div>
                        <p>Tomorrow</p>
                        <p>109&deg;&uarr; 83&deg;&darr;</p>
                    </div>
                    <div>
                        <p>Wednesday</p>
                        <p>109&deg;&uarr; 83&deg;&darr;</p>
                    </div>
                    <div>
                        <p>Thursday</p>
                        <p>109&deg;&uarr; 83&deg;&darr;</p>
                    </div>
                </>
            )}
        </div>
    );
}
