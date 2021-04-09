import React, { useState, useEffect } from "react";
import ForecastDay from "./ForecastDay";
import { roundNumber } from "../functions";
import styled from "styled-components";

const ForecastContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const FORECAST_API = (() => {
    const _key = process.env.REACT_APP_WEATHER_API_KEY;

    function getUrl(location) {
        return (
            `http://api.openweathermap.org/data/2.5/forecast?q=${location}` +
            `&units=imperial&appid=${_key}`
        );
    }

    return { getUrl };
})();

export function datesMatch(day1, day2) {
    return (
        day1.getFullYear() === day2.getFullYear() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getDate() === day2.getDate()
    );
}

export const dateFactory = (date) => {
    let tempsArr = [];
    let weatherArr = [];
    let min = 0;
    let max = 0;
    let weather = { name: "", count: 0, id: 0 };

    function addTemp(temp) {
        tempsArr.push(temp);
    }

    function addToWeatherArr(weather) {
        weatherArr.push(weather);
    }

    function determinePrimaryWeather() {
        for (let i = 0; i < weatherArr.length; i++) {
            let count = 0;
            weatherArr.forEach((weatherObj) => {
                if (weatherArr[i].id === weatherObj.id) {
                    count++;
                }
            });
            if (this.weather.count < count) {
                this.weather.name = weatherArr[i].main;
                this.weather.id = weatherArr[i].id;
                this.weather.count = count;
            }
        }
    }

    function findMinAndMax() {
        this.min = roundNumber(Math.min(...tempsArr), 0);
        this.max = roundNumber(Math.max(...tempsArr), 0);
    }

    return {
        date,
        min,
        max,
        weather,
        addTemp,
        addToWeatherArr,
        determinePrimaryWeather,
        findMinAndMax,
    };
};

export default function Forecast({ location }) {
    const [APIData, setAPIData] = useState(undefined);
    const [forecastObj, setForecastObj] = useState(undefined);
    const [message, setMessage] = useState("Getting the forecast...");

    useEffect(() => {
        async function getForecastAPI() {
            try {
                const response = await fetch(FORECAST_API.getUrl(location));
                const data = await response.json();
                if (data.cod !== "200") {
                    throw new Error(
                        `We couldn't get the forecast from OpenWeather. ` +
                            `Status ${data.cod}: ${data.message}`
                    );
                } else {
                    processData(data);
                }
            } catch (error) {
                console.error(error);
                setMessage(`${error}`);
                setAPIData(undefined);
            }
        }

        function processData(data) {
            try {
                setMessage("");
                setAPIData(data);
                formatData(data);
            } catch (error) {
                console.error(error);
                setMessage(
                    `There was a problem in the app. Contact the developer ` +
                        `if it continues.`
                );
                setForecastObj(undefined);
            }
        }

        getForecastAPI();
    }, [location]);

    function formatData(data) {
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
                day1.addTemp(timestamp.main.temp);
                day1.addToWeatherArr(timestamp.weather[0]);
            }

            if (datesMatch(timestampDate, day2.date)) {
                day2.addTemp(timestamp.main.temp);
                day2.addToWeatherArr(timestamp.weather[0]);
            }

            if (datesMatch(timestampDate, day3.date)) {
                day3.addTemp(timestamp.main.temp);
                day3.addToWeatherArr(timestamp.weather[0]);
            }
        });

        day1.findMinAndMax();
        day2.findMinAndMax();
        day3.findMinAndMax();
        day1.determinePrimaryWeather();
        day2.determinePrimaryWeather();
        day3.determinePrimaryWeather();

        setForecastObj({
            day1,
            day2,
            day3,
        });
    }

    return (
        <section>
            {APIData === undefined || forecastObj === undefined ? (
                <p>{message}</p>
            ) : (
                <>
                    <h2 className="hidden">Forecast</h2>
                    <ForecastContainer>
                        <ForecastDay
                            name="Tomorrow"
                            dayObj={forecastObj.day1}
                        />
                        <ForecastDay dayObj={forecastObj.day2} />
                        <ForecastDay dayObj={forecastObj.day3} />
                    </ForecastContainer>
                </>
            )}
        </section>
    );
}
