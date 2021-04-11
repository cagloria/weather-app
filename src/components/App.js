import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./Themes";
import TempToggle from "./TempToggle";
import Clock from "./Clock";
import Weather from "./Weather";
import CityInput from "./CityInput";

export default function App() {
    const [city, setCity] = useState("");
    const [tempScale, setTempScale] = useState("");

    useEffect(() => {
        if (tempScale === "") {
            setTempScale("F");
        }
    }, [tempScale]);

    function handleTempScaleChange(scale) {
        setTempScale(scale);
    }

    function handleCityChange(city) {
        setCity(city);
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <main>
                <h1 className="hidden">Weather App</h1>
                <TempToggle onScaleChange={handleTempScaleChange} />
                <Clock />
                <CityInput onCitySubmit={handleCityChange} />
                {city.length === 0 ? null : (
                    <Weather tempScale={tempScale} location={city} />
                )}
            </main>
        </ThemeProvider>
    );
}
