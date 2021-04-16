import React from "react";
import styled from "styled-components";
import { neutral, mediaQueries } from "./Themes";
import windDirectionIcon from "../assets/icon-wind-direction.svg";

export const CARDINAL_DIRECTION = (() => {
    const _interval = 22.5;
    const _directions = [
        { abbreviation: "N", name: "North", min: 348.75, max: 11.25 },
        { abbreviation: "NNE", name: "North-northeast" },
        { abbreviation: "NE", name: "Northeast" },
        { abbreviation: "ENE", name: "East-northeast" },
        { abbreviation: "E", name: "East" },
        { abbreviation: "ESE", name: "East-southeast" },
        { abbreviation: "SE", name: "Southeast" },
        { abbreviation: "SSE", name: "South-southeast" },
        { abbreviation: "S", name: "South" },
        { abbreviation: "SSW", name: "South-southwest" },
        { abbreviation: "SW", name: "Southwest" },
        { abbreviation: "WSW", name: "West-southwest" },
        { abbreviation: "W", name: "West" },
        { abbreviation: "WNW", name: "West-northwest" },
        { abbreviation: "NW", name: "Northwest" },
        { abbreviation: "NNW", name: "North-northwest" },
    ];

    // Set the minimum and maximum degrees for each direction
    for (let i = 1; i < _directions.length; i++) {
        _directions[i].min = _directions[i - 1].max;
        _directions[i].max = _directions[i].min + _interval;
    }

    function findCardinalDirection(deg) {
        const N = _directions[0];
        let result;
        if (deg >= N.min || deg <= N.max) {
            result = N;
        } else {
            _directions.forEach((direction) => {
                if (deg >= direction.min && deg <= direction.max) {
                    result = direction;
                }
            });
        }

        return { abbreviation: result.abbreviation, name: result.name };
    }

    return { findCardinalDirection };
})();

const Container = styled.section`
    margin-bottom: 32px;

    ${mediaQueries.tablet_650_2col} {
        grid-row: 3;
        grid-column: 1;
        margin-bottom: 0;
    }

    ${mediaQueries.desktop_1025_3col} {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
    }
`;

const Table = styled.table`
    padding: 15px 20px;
    border: 2px solid ${neutral[500]};
    border-radius: 6px;
    width: 100%;
    font-size: 0.9em;

    th {
        font-weight: 400;
        text-align: left;
    }

    ${mediaQueries.tablet_650_2col} {
        padding: 15px 8px;
    }

    ${mediaQueries.desktop_1025_3col} {
        padding: 16px;
    }
`;

const WindIcon = styled.img`
    width: 10px;
    height: 10px;
    margin: auto 8px;
    transform: rotate(${(props) => props.deg}deg);
`;

export default function Details({ wind, windDegrees, humidity, pressure }) {
    const cardinalDirection = CARDINAL_DIRECTION.findCardinalDirection(
        windDegrees
    );

    return (
        <Container>
            <h2 className="hidden">Weather Details</h2>
            <Table>
                <tbody>
                    <tr>
                        <th>Wind</th>
                        <td>
                            {wind} mph
                            <WindIcon
                                deg={windDegrees}
                                src={windDirectionIcon}
                                alt=""
                            />
                            {cardinalDirection.name}
                        </td>
                    </tr>
                    <tr>
                        <th>Humidity</th>
                        <td>{humidity}%</td>
                    </tr>
                    <tr>
                        <th>Pressure</th>
                        <td>{pressure} hPa</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}
