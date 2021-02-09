import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./Themes";
import Clock from "./Clock";
import Weather from "./Weather";
import CityInput from "./CityInput";
import Forecast from "./Forecast";

export default function App() {
    const [city, setCity] = useState("");

    function handleCityChange(city) {
        setCity(city);
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <Clock />
            <CityInput onCitySubmit={handleCityChange} />

            {city.length === 0 ? null : (
                <>
                    <Weather location={city} />
                    <Forecast location={city} />
                    <div>
                        <p>Data provided by OpenWeather.</p>
                    </div>
                </>
            )}
        </ThemeProvider>
    );
}
