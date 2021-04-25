import React from "react";
import styled from "styled-components";
import { mediaQueries } from "./Themes";
import { convertToCelsius } from "../utilities/functions";

const P = styled.p`
    font-size: clamp(6em, 18vw, 8em);
    font-weight: 400;
    text-align: center;
    margin: 0;
    grid-area: t;

    ${mediaQueries.desktop_1025_3col} {
        margin: 0;
        text-align: left;
    }
`;

export default function Temperature({ scale, temp }) {
    return <P>{scale === "F" ? temp : convertToCelsius(temp)}&deg;</P>;
}
