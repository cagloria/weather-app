import React from "react";
import styled from "styled-components";
import { mediaQueries } from "./Themes";
import { icons } from "../utilities/icons";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    grid-area: s;

    ${mediaQueries.tablet_850_2col} {
        position: absolute;
        bottom: 6vh;
        padding: 0 8vw;
        left: 0;
        width: 100%;
        box-sizing: border-box;
    }

    ${mediaQueries.desktop_1441} {
        padding-left: 10vw;
        padding-right: 10vw;
    }

    ${mediaQueries.desktop_2000} {
        padding-left: 16vw;
        padding-right: 16vw;
    }

    ${mediaQueries.desktop_960height} {
        bottom: 13vh;
    }

    ${mediaQueries.desktop_1200height} {
        bottom: 21vh;
    }
`;

const SunTime = styled.div`
    text-align: center;
    p {
        margin: 0;
        font-size: 1.2em;

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
