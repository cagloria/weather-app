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

    // Change the background gradient to match if it's daytime or nighttime in
    // the entered city
    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        const sunTimesDefined =
            sunTimes.sunrise !== undefined && sunTimes.sunset !== undefined;
        const isDayTime = sunTimesDefined
            ? date.getTime() > sunTimes.sunrise.getTime() &&
              date.getTime() < sunTimes.sunset.getTime()
            : true;

        setOnLightMode(isDayTime);
        isDayTime ? body.classList.remove("dark") : body.classList.add("dark");
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
