import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";
import styled from "styled-components";
import { roundNumber, formatTime, capitalize } from "../functions";
import { primary, neutral } from "./Themes";
import { icons, findWeatherIcon } from "../icons";

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
    margin: 10px 0 40px;
`;

const WeatherIcon = styled.img`
    width: 128px;
    height: 128px;
    margin: 0 auto;
    display: flex;
`;

const SunContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SunTime = styled.div`
    text-align: center;
    p {
        margin: 0;

        &:first-child {
            margin-bottom: 2px;
        }
    }

    img {
        margin-top: 8px;
    }
`;

const BGImage = styled.div`
    background-color: ${primary[100]};
    height: 50px;
    width: 100%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-top: 4px solid ${neutral[500]};
`;

const InfoContainer = styled.div`
    background-color: ${primary[100]};
    padding: 0 0 25px;
`;

const DetailsTable = styled.table`
    padding: 15px 20px;
    border: 2px solid ${neutral[500]};
    border-radius: 6px;
    width: 100%;
    font-size: 0.9em;

    th {
        font-weight: 400;
        text-align: left;
    }
`;

const Credit = styled.p`
    margin-top: 20px;
    font-size: 0.85em;
    text-align: center;
`;

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
                    temperature: roundNumber(data.main.temp, 0),
                    weather: capitalize(data.weather[0].description),
                    weatherIcon: findWeatherIcon(data.weather[0].id),
                    sunrise: formatTime(data.sys.sunrise),
                    sunset: formatTime(data.sys.sunset),
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                });
            } catch (error) {
                console.log(error);
                setMessage(
                    `There was a problem with displaying the weather. ` +
                        `Contact the developer if it continues.`
                );
                setWeatherObj(undefined);
            }
        }

        getWeatherAPI();
    }, [location]);

    return (
        <>
            {APIData === undefined || weatherObj === undefined ? (
                <Section>
                    <p>{message}</p>
                </Section>
            ) : (
                <>
                    <Section>
                        <h2 className="hidden">Weather</h2>
                        <City>
                            {weatherObj.city}, {weatherObj.country}
                        </City>
                        <Temperature>{weatherObj.temperature}&deg;</Temperature>
                        <WeatherIcon alt="" src={weatherObj.weatherIcon} />
                        <WeatherDisplay>{weatherObj.weather}</WeatherDisplay>

                        <SunContainer>
                            <SunTime>
                                <p>Sunrise</p>
                                <p>{weatherObj.sunrise}</p>
                                <img
                                    src={icons.sunrise}
                                    alt=""
                                    className="size-24"
                                />
                            </SunTime>
                            <SunTime>
                                <p>Sunset</p>
                                <p>{weatherObj.sunset}</p>
                                <img
                                    src={icons.sunset}
                                    alt=""
                                    className="size-24"
                                />
                            </SunTime>
                        </SunContainer>
                    </Section>

                    <BGImage />

                    <InfoContainer>
                        <Section>
                            <h2 className="hidden">Weather Details</h2>
                            <DetailsTable>
                                <tbody>
                                    <tr>
                                        <th>Wind</th>
                                        <td>{weatherObj.wind} mph</td>
                                    </tr>
                                    <tr>
                                        <th>Humidity</th>
                                        <td>{weatherObj.humidity}%</td>
                                    </tr>
                                    <tr>
                                        <th>Pressure</th>
                                        <td>{weatherObj.pressure} hPa</td>
                                    </tr>
                                </tbody>
                            </DetailsTable>
                        </Section>

                        <Forecast location={location} />

                        <Section>
                            <Credit>Data provided by OpenWeather.</Credit>
                        </Section>
                    </InfoContainer>
                </>
            )}
        </>
    );
}
