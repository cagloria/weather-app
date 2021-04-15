import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";
import Sun from "./Sun";
import Details from "./Details";
import Temperature from "./Temperature";
import styled from "styled-components";
import {
    roundNumber,
    formatTimeToString,
    capitalize,
    convertTimeFromUnix,
} from "../utilities/functions";
import { primary, neutral, mediaQueries } from "./Themes";
import { findWeatherIcon } from "../utilities/icons";

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

export default function Weather({ location, tempScale, onSunFetch }) {
    const [APIData, setAPIData] = useState(undefined);
    const [weatherObj, setWeatherObj] = useState(undefined);
    const [message, setMessage] = useState("Getting today's weather...");
    const [sunTimes, setSunTimes] = useState({
        sunrise: undefined,
        sunset: undefined,
    });

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
                    sunrise: formatTimeToString(data.sys.sunrise),
                    sunset: formatTimeToString(data.sys.sunset),
                    wind: data.wind.speed,
                    windDirection: data.wind.deg,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                });
                setSunTimes({
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
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

    useEffect(() => {
        if (sunTimes.sunrise !== undefined && sunTimes.sunset !== undefined) {
            const sunrise = convertTimeFromUnix(sunTimes.sunrise);
            const sunset = convertTimeFromUnix(sunTimes.sunset);
            onSunFetch(sunrise, sunset);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sunTimes]);

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

                        <Temperature
                            scale={tempScale}
                            temp={weatherObj.temperature}
                        />
                        <WeatherIcon alt="" src={weatherObj.weatherIcon} />
                        <WeatherText>{weatherObj.weather}</WeatherText>

                        <Sun
                            sunrise={weatherObj.sunrise}
                            sunset={weatherObj.sunset}
                        />
                    </WeatherSection>

                    <BGImage />

                    <InfoContainer>
                        <Details
                            wind={weatherObj.wind}
                            windDirection={weatherObj.windDirection}
                            humidity={weatherObj.humidity}
                            pressure={weatherObj.pressure}
                        />

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
