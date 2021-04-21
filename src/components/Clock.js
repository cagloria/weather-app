import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mediaQueries } from "./Themes";

const Section = styled.section`
    text-align: center;
    margin-bottom: 26px;

    ${mediaQueries.tablet_850_2col} {
        grid-area: c;
    }

    ${mediaQueries.desktop_1025_3col} {
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const Day = styled.p`
    margin: 0 0 12px;
    line-height: 150%;
    font-size: 2em;
    font-weight: 300;

    ${mediaQueries.desktop_1025_3col} {
        margin: 0;
    }
`;

const Time = styled.p`
    font-size: 1.5em;
    margin: 0;

    ${mediaQueries.desktop_1025_3col} {
        font-size: 2em;
    }
`;

export default function Clock({ onTimeChange }) {
    const [date, setDate] = useState(new Date());
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const timeOptions = {
        hour: "numeric",
        minute: "2-digit",
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
            onTimeChange(date);
        }, 1000);
        return () => clearInterval(interval);
    }, [date, onTimeChange]);

    return (
        <Section>
            <h2 className="hidden">Today</h2>
            <Day>{date.toLocaleDateString(undefined, dateOptions)}</Day>
            <Time>{date.toLocaleTimeString([], timeOptions)}</Time>
        </Section>
    );
}
