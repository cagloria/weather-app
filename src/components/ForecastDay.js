import React from "react";
import styled from "styled-components";
import { findWeatherIcon } from "../icons";
import { convertToCelsius } from "../functions";
import { mediaQueries } from "./Themes";

const Container = styled.div`
    text-align: center;

    > * {
        font-size: 0.9em;
        margin: 8px 0;
    }

    h3 {
        font-weight: 300;
    }
`;

const WeatherIcon = styled.img`
    width: 40px;
    height: 40px;
    margin: 0;

    ${mediaQueries.twoCol} {
        width: 32px;
        height: 32px;
    }
`;

function findDay(date) {
    const dayOptions = { weekday: "long" };
    return date.toLocaleDateString(undefined, dayOptions);
}

export default function ForecastDay({ name, dayObj, tempScale }) {
    const icon = findWeatherIcon(dayObj.weather.id);
    return (
        <Container>
            <h3>{name === undefined ? findDay(dayObj.date) : name}</h3>
            <WeatherIcon src={icon} alt={dayObj.weather.name} />
            <p>
                {tempScale === "F" ? dayObj.max : convertToCelsius(dayObj.max)}
                &deg;&uarr;{" "}
                {tempScale === "F" ? dayObj.min : convertToCelsius(dayObj.min)}
                &deg;&darr;
            </p>
        </Container>
    );
}
