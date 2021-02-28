import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./Themes";
import Clock from "./Clock";
import Weather from "./Weather";
import CityInput from "./CityInput";

export default function App() {
    const [city, setCity] = useState("");

    function handleCityChange(city) {
        setCity(city);
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <main>
                <h1 className="hidden">Weather App</h1>
                <Clock />
                <CityInput onCitySubmit={handleCityChange} />
                {city.length === 0 ? null : <Weather location={city} />}
            </main>
        </ThemeProvider>
    );
}
