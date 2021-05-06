import { createGlobalStyle } from "styled-components";

export const primary = {
    100: "#070A43",
    200: "#151A7F",
    300: "#454BC6",
    400: "#8B90E2",
    // 500: "#C5C7E9",
};

export const neutral = {
    100: "#0C0C0C",
    // 200: "#464646",
    // 300: "#808080",
    // 400: "#BABABA",
    500: "#F4F4F4",
};

export const lightTheme = {
    topGradient: primary[300],
    bottomGradient: "#060950",
    fieldBorder: "transparent",
};

export const darkTheme = {
    topGradient: primary[100],
    bottomGradient: primary[200],
    fieldBorder: primary[300],
};

export const mediaQueries = {
    phone_landscape:
        "@media screen and (max-height: 411px) and (orientation: landscape)",
    phone_425: "@media screen and (min-width: 425px)",
    tablet_768_2col: "@media screen and (min-width: 768px)",
    tablet_768_landscape:
        "@media screen and (min-width: 768px) and (orientation: landscape) and (max-height: 830px)", // Ensures Sun component is placed at bottom of screen on tablet and large phones
    desktop_1024_3col: "@media screen and (min-width: 1024px)",
    desktop_1440: "@media screen and (min-width: 1440px)",
    desktop_2000: "@media screen and (min-width: 2000px)",
    desktop_960height:
        "@media screen and (min-height: 960px) and (min-width: 1800px)",
    desktop_1200height:
        "@media screen and (min-height: 1200px) and (min-width: 1800px)",
};

const fontFamily = `"Roboto", sans-serif`;

export const GlobalStyles = createGlobalStyle`
    html {
        color: ${neutral[500]};
        font-family: ${fontFamily};
    }

    body {
        background-color: ${lightTheme.topGradient};
        background-image: linear-gradient(180deg, ${
            lightTheme.topGradient
        } 0%, ${lightTheme.bottomGradient} 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        margin: 0;

        &::after {
            content: "";
            width: 100vw;
            height: 100vh;
            background-color: ${darkTheme.topGradient};
            background-image: linear-gradient(180deg, ${
                darkTheme.topGradient
            } 0%, ${darkTheme.bottomGradient} 100%);
            position: fixed;
            top: 0;
            left: 0;
            z-index: -9;
            opacity: 0;
            transition: opacity 0.3s linear;

            @media (prefers-reduced-motion) {
                transition: none;
            }
        }

        &.dark {
            &::after {
                opacity: 1;
            }
        }
    }

    main {
        padding-top: 60px;
        
        ${mediaQueries.tablet_768_2col} {
            padding: 60px 11vw 40px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: auto;
            grid-template-areas: 
                "c c"
                "i i"
                "w d"
        }

        ${mediaQueries.tablet_768_landscape} {
            position: relative;
            padding-bottom: 150px;
        }

        ${mediaQueries.desktop_1024_3col} {
            grid-template-columns: 1fr;
            grid-template-areas: 
                "c"
                "i"
                "w"
                "d"
        }

        ${mediaQueries.desktop_1440} {
            padding-left: 18vw;
            padding-right: 18vw;
        }

        ${mediaQueries.desktop_2000} {
            padding-left: 28vw;
            padding-right: 28vw;
        }
    }

    section {
        padding: 0 7vw;

        ${mediaQueries.tablet_768_2col} {
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
        border: 2px solid ${({ theme }) => theme.fieldBorder};
        border-radius: 8px;
        box-sizing: border-box;
        height: 32px;
        padding: 0 10px;
        font-family: ${fontFamily};
        transition: border 0.3s linear;
        
        @media (prefers-reduced-motion) {
            transition: none;
        }

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
