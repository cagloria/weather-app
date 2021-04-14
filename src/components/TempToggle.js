import React, { useState } from "react";
import styled from "styled-components";
import { primary, neutral, mediaQueries } from "./Themes";

const Toggle = styled.button`
    width: 42px;
    height: 24px;
    border-radius: 16px;
    background-color: transparent;
    border: 2px solid ${primary[400]};
    color: ${neutral[500]};
    padding: 0;
    position: absolute;
    top: 20px;
    right: 7vw;
    transition: padding 0.2s ease-out;

    ${mediaQueries.tablet_426} {
        right: 8vw;
    }

    ${mediaQueries.desktop_769} {
        right: 14vw;
    }

    ${mediaQueries.desktop_1441} {
        right: 18vw;
    }

    ${mediaQueries.desktop_2000} {
        right: 28vw;
    }

    &.left {
        padding: 0 0 0 16px;
        &::after {
            left: 3px;
        }
    }

    &.right {
        padding: 0 16px 0 0;
        &::after {
            left: 19px;
        }
    }

    &::after {
        content: "";
        width: 16px;
        height: 16px;
        background-color: ${primary[400]};
        position: absolute;
        top: 2px;
        border-radius: 50%;
        transition: left 0.3s ease-out, box-shadow 0.2s ease-in-out;
    }

    &:hover {
        background-color: transparent;
        color: ${neutral[500]};
        box-shadow: inset 0 2px 6px 0 ${primary[100]};
        &::after {
            box-shadow: 0 2px 8px 2px ${primary[100]};
        }
    }

    &:active {
        &::after {
            box-shadow: inset 0 2px 2px 0px ${primary[100]};
        }
    }
`;

export default function TempToggle({ onScaleChange, defaultScale }) {
    const [scale, setScale] = useState(defaultScale);
    const [alt, setAlt] = useState("celsius");
    const [toggle, setToggle] = useState("left");

    function changeScale() {
        let newScale = scale === "F" ? "C" : "F";
        setScale(newScale);
        toggle === "left" ? setToggle("right") : setToggle("left");
        alt === "celsius" ? setAlt("fahrenheit") : setAlt("celsius");
        onScaleChange(newScale);
    }

    return (
        <Toggle
            className={toggle}
            onClick={changeScale}
            aria-label={`Change to ${alt}`}
        >
            {scale}
        </Toggle>
    );
}
