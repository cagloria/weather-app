import React from "react";
import styled from "styled-components";

const Container = styled.div`
    font-size: 0.9em;
    text-align: center;
    margin: 8px;

    > * {
        margin: 8px 0;
    }

    h3 {
        font-weight: 300;
    }
`;

function findDay(date) {
    const dayOptions = { weekday: "long" };
    return date.toLocaleDateString(undefined, dayOptions);
}

export default function ForecastDay({ date, dayObj }) {
    return (
        <Container>
            <h3>{date === undefined ? findDay(dayObj.date) : date}</h3>
            <p>{dayObj.weather.name}</p>
            <p>
                {dayObj.max}&deg;&uarr; {dayObj.min}
                &deg;&darr;
            </p>
        </Container>
    );
}
