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
    // const [sunrise, setSunrise] = useState(undefined);
    // const [sunset, setSunset] = useState(undefined);
    const [onLightMode, setOnLightMode] = useState(true);

    useEffect(() => {
        if (tempScale === "") {
            setTempScale("F");
        }
    }, [tempScale]);

    // useEffect(() => {
    //     if (sunrise !== undefined && sunset !== undefined) {
    //         // const afterSunrise = date.getTime() > sunrise.getTime();
    //         // const beforeSunset = date.getTime() < sunset.getTime();
    //         // afterSunrise && beforeSunset
    //         //     ? setOnLightMode(true)
    //         //     : setOnLightMode(false);
    //     } else {
    //         setOnLightMode(true);
    //     }
    // }, [date, sunrise, sunset]);

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
        // FIXME: setState called too many times
        // setSunrise(sunrise);
        // setSunset(sunset);
        // try {
        //     setSunTimes({ sunrise: sunrise, sunset: sunset });
        // } catch (error) {
        //     console.error(error);
        // }
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
