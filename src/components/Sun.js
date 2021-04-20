import React from "react";
import styled from "styled-components";
import { mediaQueries } from "./Themes";
import { icons } from "../utilities/icons";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    ${mediaQueries.tablet_650_2col} {
        position: absolute;
        bottom: 55px;
        padding: 0 8vw;
        left: 0;
        width: 100%;
        box-sizing: border-box;
    }

    ${mediaQueries.desktop_1281} {
        bottom: 80px;
    }

    ${mediaQueries.desktop_1441} {
        padding-left: 10vw;
        padding-right: 10vw;
    }
    
    ${mediaQueries.desktop_2000} {
        padding-left: 16vw;
        padding-right: 16vw;
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
