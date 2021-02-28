import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
    margin-bottom: 32px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin: 0 0 8px 10px;
`;

const Textfield = styled.input`
    margin-bottom: 8px;
`;

const SubmitButton = styled.button``;

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
        <Section>
            <h2 className="hidden">City Input</h2>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="city-input">Enter a city</Label>
                <Textfield
                    type="text"
                    id="city-input"
                    value={city}
                    onChange={handleChange}
                />
                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
        </Section>
    );
}
