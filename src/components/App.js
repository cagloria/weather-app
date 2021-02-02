import React, { useState } from "react";
import TodayWeather from "./Weather";
import CityInput from "./CityInput";
import Forecast from "./Forecast";

export default function App() {
    const [city, setCity] = useState("");

    function handleCityChange(city) {
        setCity(city);
    }

    return (
        <div className="App">
            <CityInput onCitySubmit={handleCityChange} />

            {city.length === 0 ? (
                <p>Enter a city to see the weather.</p>
            ) : (
                <>
                    <TodayWeather location={city} />
                    <Forecast />
                </>
            )}

            <div>
                <p>Data provided by OpenWeather.</p>
            </div>
        </div>
    );
}
