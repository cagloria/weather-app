import React, { useState } from "react";

export default function CityInput({ onCitySubmit }) {
    const [city, setCity] = useState("");

    function handleChange(event) {
        setCity(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onCitySubmit(city);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="city-input">Enter a city</label>
            <input
                type="text"
                id="city-input"
                value={city}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
