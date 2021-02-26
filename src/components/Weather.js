import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Section = styled.section`
    margin-bottom: 32px;
`;

const City = styled.p`
    font-size: 1.5em;
    text-align: center;
    margin: 0;
`;

const Temperature = styled.p`
    font-size: 8em;
    font-weight: 400;
    text-align: center;
    margin: 6px 0;
`;

const WeatherDisplay = styled.p`
    font-size: 2em;
    text-align: center;
`;

const SunContainer = styled.div``;

const SunTime = styled.div``;

const DetailsTable = styled.table``;

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
        <Section>
            {APIData === undefined || weatherObj === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <City>
                        {weatherObj.city}, {weatherObj.country}
                    </City>
                    <Temperature>{weatherObj.temperature}&deg;</Temperature>
                    <WeatherDisplay>{weatherObj.weather}</WeatherDisplay>

                    <SunContainer>
                        <SunTime>
                            <p>Sunrise</p>
                            <p>{weatherObj.sunrise}</p>
                        </SunTime>
                        <SunTime>
                            <p>Sunset</p>
                            <p>{weatherObj.sunset}</p>
                        </SunTime>
                    </SunContainer>

                    <DetailsTable>
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
                    </DetailsTable>
                </>
            )}
        </Section>
    );
}
