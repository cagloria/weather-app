import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";
import styled from "styled-components";
import {
    roundNumber,
    formatTime,
    capitalize,
    convertToCelsius,
} from "../functions";
import { primary, neutral, mediaQueries } from "./Themes";
import { icons, findWeatherIcon } from "../icons";

const MessageSection = styled.section`
    margin-bottom: 32px;

    ${mediaQueries.tablet_650_2col} {
        grid-row: 3;
        grid-column: 1;
        margin-bottom: 0;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-column: 1 / -1;
    }
`;

const WeatherSection = styled.section`
    margin-bottom: 32px;

    ${mediaQueries.tablet_650_2col} {
        grid-row: 3;
        grid-column: 1;
        margin-bottom: 0;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: auto;
        justify-items: stretch;
        margin-bottom: 48px;
    }
`;

const City = styled.p`
    font-size: 1.5em;
    text-align: center;
    margin: 0;

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 1;
        grid-column: 1 / -1;
        text-align: left;
    }
`;

const Temperature = styled.p`
    font-size: 8em;
    font-weight: 400;
    text-align: center;
    margin: 6px 0;

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 2;
        grid-column: 1;
        margin: 0;
        text-align: left;
    }
`;

const WeatherIcon = styled.img`
    width: 128px;
    height: 128px;
    margin: 0 auto;
    display: flex;

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 2;
        grid-column: 2;
    }
`;

const WeatherText = styled.p`
    font-size: 1.75em;
    text-align: center;
    margin: 10px 0 40px;

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 3;
        grid-column: 2;
        margin: 0;
    }
`;

const SunContainer = styled.div`
    display: flex;
    justify-content: space-between;

    ${mediaQueries.tablet_650_2col} {
        flex-direction: column;
        > *:first-child {
            margin-bottom: 24px;
        }
    }

    ${mediaQueries.desktop_769} {
        flex-direction: row;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 2 / 4;
        grid-column: 3;
        flex-direction: column;
        align-items: flex-end;
    }

    ${mediaQueries.desktop_1441} {
        flex-direction: row;
        margin: auto 0 auto auto;
        width: 100%;
        max-width: 270px;

        > *:first-child {
            margin-bottom: 0;
        }
    }
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
    height: 70px;
    width: 100%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-top: 4px solid ${neutral[500]};

    ${mediaQueries.tablet_650_2col} {
        position: absolute;
        right: 200vw;
    }
`;

const InfoContainer = styled.div`
    background-color: ${primary[100]};
    padding: 0 0 25px;

    ${mediaQueries.tablet_650_2col} {
        padding: 32px 24px;
        border-radius: 8px;
        grid-row: 3;
        grid-column: 2;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 4;
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto auto;
        row-gap: 16px;
    }
`;

const DetailsSection = styled.section`
    margin-bottom: 32px;

    ${mediaQueries.tablet_650_2col} {
        grid-row: 3;
        grid-column: 1;
        margin-bottom: 0;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
    }
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

    ${mediaQueries.tablet_650_2col} {
        padding: 15px 8px;
    }

    ${mediaQueries.desktop_1025_3col} {
        padding: 16px;
    }
`;

const CreditsSection = styled.section`
    margin-bottom: 32px;

    p {
        margin-top: 20px;
        font-size: 0.85em;
        text-align: center;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 2;
        grid-column: 1 / -1;

        p {
            margin: 0;
        }
    }
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

export default function Weather({ location, tempScale }) {
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
                <MessageSection>
                    <p>{message}</p>
                </MessageSection>
            ) : (
                <>
                    <WeatherSection>
                        <h2 className="hidden">Weather</h2>
                        <City>
                            {weatherObj.city}, {weatherObj.country}
                        </City>
                        <Temperature>
                            {tempScale === "F"
                                ? weatherObj.temperature
                                : convertToCelsius(weatherObj.temperature)}
                            &deg;
                        </Temperature>
                        <WeatherIcon alt="" src={weatherObj.weatherIcon} />
                        <WeatherText>{weatherObj.weather}</WeatherText>

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
                    </WeatherSection>

                    <BGImage />

                    <InfoContainer>
                        <DetailsSection>
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
                        </DetailsSection>

                        <Forecast tempScale={tempScale} location={location} />

                        <CreditsSection>
                            <p>Data provided by OpenWeather.</p>
                        </CreditsSection>
                    </InfoContainer>
                </>
            )}
        </>
    );
}
