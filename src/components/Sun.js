import React from "react";
import styled from "styled-components";
import { mediaQueries } from "./Themes";
import { icons } from "../icons";

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    ${mediaQueries.tablet_650_2col} {
        flex-direction: column;
        > *:first-child {
            margin-bottom: 24px;
        }
    }

    ${mediaQueries.desktop_769} {
        flex-direction: row;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 2 / 4;
        grid-column: 3;
        flex-direction: column;
        align-items: flex-end;
    }

    ${mediaQueries.desktop_1441} {
        flex-direction: row;
        margin: auto 0 auto auto;
        width: 100%;
        max-width: 270px;

        > *:first-child {
            margin-bottom: 0;
        }
    }
`;

const SunTime = styled.div`
    text-align: center;
    p {
        margin: 0;

        &:first-child {
            margin-bottom: 2px;
        }
    }

    img {
        margin-top: 8px;
    }
`;

export default function Sun({ sunrise, sunset }) {
    return (
        <Container>
            <SunTime>
                <p>Sunrise</p>
                <p>{sunrise}</p>
                <img src={icons.sunrise} alt="" className="size-24" />
            </SunTime>
            <SunTime>
                <p>Sunset</p>
                <p>{sunset}</p>
                <img src={icons.sunset} alt="" className="size-24" />
            </SunTime>
        </Container>
    );
}
