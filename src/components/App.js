import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./Themes";
import TempToggle from "./TempToggle";
import Clock from "./Clock";
import Weather from "./Weather";
import CityInput from "./CityInput";

export default function App() {
    const [city, setCity] = useState("");
    const [tempScale, setTempScale] = useState("F");
    const [date, setDate] = useState(undefined);
    const [sunTimes, setSunTimes] = useState({
        sunrise: undefined,
        sunset: undefined,
    });
    const [onLightMode, setOnLightMode] = useState(true);

    useEffect(() => {
        if (tempScale === "") {
            setTempScale("F");
        }
    }, [tempScale]);

    useEffect(() => {
        if (sunTimes.sunrise !== undefined && sunTimes.sunset !== undefined) {
            const afterSunrise = date.getTime() > sunTimes.sunrise.getTime();
            const beforeSunset = date.getTime() < sunTimes.sunset.getTime();
            afterSunrise && beforeSunset
                ? setOnLightMode(true)
                : setOnLightMode(false);
        } else {
            setOnLightMode(true);
        }
    }, [date, sunTimes]);

    function handleTempScaleChange(scale) {
        setTempScale(scale);
    }

    function handleCityChange(city) {
        setCity(city);
    }

    function handleTimeChange(date) {
        setDate(date);
    }

    function handleSunFetch(sunrise, sunset) {
        setSunTimes({ sunrise: sunrise, sunset: sunset });
    }

    return (
        <ThemeProvider theme={onLightMode ? lightTheme : darkTheme}>
            <GlobalStyles />
            <main>
                <h1 className="hidden">Weather App</h1>
                <TempToggle
                    onScaleChange={handleTempScaleChange}
                    defaultScale={tempScale}
                />
                <Clock onTimeChange={handleTimeChange} />
                <CityInput onCitySubmit={handleCityChange} />
                {city.length === 0 ? null : (
                    <Weather
                        tempScale={tempScale}
                        location={city}
                        onSunFetch={handleSunFetch}
                    />
                )}
            </main>
        </ThemeProvider>
    );
}
