import React, { useState, useEffect } from "react";

export default function Clock() {
    const [date, setDate] = useState(new Date());
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [date]);

    return (
        <div>
            <p>{date.toLocaleDateString(undefined, dateOptions)}</p>
            <p>{date.toLocaleTimeString([], timeOptions)}</p>
        </div>
    );
}
