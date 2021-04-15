import React from "react";
import styled from "styled-components";
import { neutral, mediaQueries } from "./Themes";
import windDirectionIcon from "../assets/icon-wind-direction.svg";

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
    margin: auto 0 auto 8px;
    transform: rotate(${(props) => props.deg}deg);
`;

export default function Details({ wind, windDirection, humidity, pressure }) {
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
                                deg={windDirection}
                                src={windDirectionIcon}
                                alt=""
                            />
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
