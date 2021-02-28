import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Section = styled.section`
    text-align: center;
    margin-bottom: 26px;
`;

const Day = styled.p`
    margin: 0 0 12px;
    line-height: 150%;
    font-size: 2em;
    font-weight: 300;
`;

const Time = styled.p`
    font-size: 1.5em;
    margin: 0;
`;

export default function Clock() {
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
        }, 1000);
        return () => clearInterval(interval);
    }, [date]);

    return (
        <Section>
            <h2 className="hidden">Today</h2>
            <Day>{date.toLocaleDateString(undefined, dateOptions)}</Day>
            <Time>{date.toLocaleTimeString([], timeOptions)}</Time>
        </Section>
    );
}
