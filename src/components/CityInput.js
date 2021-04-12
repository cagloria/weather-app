import React, { useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "./Themes";

const Section = styled.section`
    margin-bottom: 32px;

    ${mediaQueries.twoCol} {
        grid-row: 2;
        grid-column: 1 / -1;
        margin-bottom: 60px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;

    ${mediaQueries.tablet} {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: auto auto;
        row-gap: 12px;
        column-gap: 12px;
    }
`;

const Label = styled.label`
    margin: 0 0 8px 10px;

    ${mediaQueries.tablet} {
        grid-row: 1;
        grid-column: 1 / -1;
        margin-bottom: 0;
    }
`;

const Textfield = styled.input`
    margin-bottom: 8px;

    ${mediaQueries.tablet} {
        grid-row: 2;
        grid-column: 1;
        margin-bottom: 0;
    }
`;

const SubmitButton = styled.button`
    ${mediaQueries.tablet} {
        grid-row: 2;
        grid-column: 2;
    }
`;

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
