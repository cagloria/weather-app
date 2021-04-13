import { createGlobalStyle } from "styled-components";

export const primary = {
    100: "#070A43",
    200: "#151A7F",
    300: "#454BC6",
    400: "#8B90E2",
    500: "#C5C7E9",
};

export const neutral = {
    100: "#0C0C0C",
    200: "#464646",
    300: "#808080",
    400: "#BABABA",
    500: "#F4F4F4",
};

export const lightTheme = {
    topGradient: "#2A30AB",
    bottomGradient: "#060950",
};

export const mediaQueries = {
    tablet: "@media screen and (min-width: 426px)",
    twoCol: "@media screen and (min-width: 650px)",
    laptop: "@media screen and (min-width: 769px)",
    laptopLarge: "@media screen and (min-width: 1025px)",
    largePC: "@media screen and (min-width: 1441px)",
};

const fontFamily = `"Roboto", sans-serif`;

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: ${fontFamily};
        color: ${neutral[500]};
        background-color: ${({ theme }) => theme.topGradient};
        background-image: linear-gradient(180deg, ${({ theme }) =>
            theme.topGradient} 0%, ${({ theme }) => theme.bottomGradient} 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        margin: 0;
        padding-top: 40px;

        ${mediaQueries.twoCol} {
            padding-bottom: 40px;
        }

        ${mediaQueries.laptopLarge} {
            padding-top: 60px;
        }
    }

    main {
        ${mediaQueries.twoCol} {
            padding: 0 8vw;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: auto;
            column-gap: 60px;
        }

        ${mediaQueries.laptop} {
            padding: 0 14vw;
        }
    }

    section {
        padding: 0 7vw;

        ${mediaQueries.twoCol} {
            padding: 0;
        }
    }

    label {
        font-size: 0.9em;
    }

    p {
        font-weight: 300;
    }

    input[type="text"] {
        background-color: ${primary[100]};
        color: ${neutral[500]};
        border: 0;
        border-radius: 8px;
        height: 32px;
        padding: 0 10px;
        font-family: ${fontFamily};
        &:focus {
            outline: ${primary[400]} solid 3px;
        }
    }

    button {
        cursor: pointer;
        color: ${neutral[500]};
        border: 0;
        border-radius: 8px;
        height: 32px;
        padding: 0 20px;
        transition: box-shadow 0.3s ease-out, 
            background-color 0.3s ease-out, 
            color 0.3s ease-out;
        background-color: ${primary[300]};
        font-family: ${fontFamily};
        &:hover {
            box-shadow: 0 2px 6px 0 ${primary[100]};
            background-color: ${primary[400]};
            color: ${neutral[100]};
        }
        &:active {
            box-shadow: inset 0 2px 4px 0 ${primary[100]};
            background-color: ${primary[200]};
            color: ${neutral[500]}
        }
        &:focus {
            outline: ${primary[400]} solid 3px;
        }
    }

    .hidden {
        position: absolute;
        top: -100%;
    }

    .size-24 {
        width: 24px;
        height: 24px;
    }
`;
