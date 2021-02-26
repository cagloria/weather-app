import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Section = styled.section`
    text-align: center;
    margin-bottom: 26px;
`;

const Day = styled.h1`
    margin-top: 0;
    margin-bottom: 12px;
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
            <Day>{date.toLocaleDateString(undefined, dateOptions)}</Day>
            <Time>{date.toLocaleTimeString([], timeOptions)}</Time>
        </Section>
    );
}
