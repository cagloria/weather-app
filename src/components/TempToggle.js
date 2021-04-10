import React, { useState } from "react";
import styled from "styled-components";
import { primary, neutral } from "./Themes";

const Toggle = styled.button`
    width: 42px;
    height: 24px;
    border-radius: 16px;
    background-color: transparent;
    border: 2px solid ${primary[400]};
    color: ${neutral[500]};
    padding: 0;
    position: absolute;
    top: 12px;
    right: 25px;
    transition: padding 0.2s ease-out;

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
        transition: left 0.3s ease-out;
    }
`;

export default function TempToggle() {
    const [scale, setScale] = useState("F");
    const [alt, setAlt] = useState("celsius");
    const [toggle, setToggle] = useState("left");

    function changeScale() {
        scale === "F" ? setScale("C") : setScale("F");
        toggle === "left" ? setToggle("right") : setToggle("left");
        alt === "celsius" ? setAlt("fahrenheit") : setAlt("celsius");
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
