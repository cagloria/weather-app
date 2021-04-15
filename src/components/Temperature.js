import React from "react";
import styled from "styled-components";
import { mediaQueries } from "./Themes";
import { convertToCelsius } from "../utilities/functions";

const P = styled.p`
    font-size: 8em;
    font-weight: 400;
    text-align: center;
    margin: 6px 0;

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 2;
        grid-column: 1;
        margin: 0;
        text-align: left;
    }
`;

export default function Temperature({ scale, temp }) {
    return <P>{scale === "F" ? temp : convertToCelsius(temp)}&deg;</P>;
}
