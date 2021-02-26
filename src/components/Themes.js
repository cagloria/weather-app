import { createGlobalStyle } from "styled-components";

const primary_100 = "#070A43";
const primary_200 = "#151A7F";
const primary_300 = "#454BC6";
const primary_400 = "#8B90E2";
// const primary_500 = "#C5C7E9";
const neutral_100 = "#0C0C0C";
// const neutral_200 = "#464646";
// const neutral_300 = "#808080";
// const neutral_400 = "#BABABA";
const neutral_500 = "#F4F4F4";
// const infoBG = "#02031c";

export const lightTheme = {
    topGradient: "#2A30AB",
    bottomGradient: "#060950",
};

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }
    
    body {
        font-family: "Roboto", sans-serif;
        color: ${neutral_500};
        background-color: ${({ theme }) => theme.topGradient};
        background-image: linear-gradient(180deg, ${({ theme }) =>
            theme.topGradient} 0%, ${({ theme }) => theme.bottomGradient} 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        margin: 0;
        padding: 25px 32px;
    }

    h1 {
        font-size: 1.5em;
        font-weight: 400;
    }

    label {
        font-size: 0.9em;
    }

    input[type="text"] {
        background-color: ${primary_100};
        color: ${neutral_500};
        border: 0;
        border-radius: 8px;
        height: 32px;
        padding: 0 10px;
        &:focus {
            outline: ${primary_400} solid 3px;
        }
    }

    button {
        cursor: pointer;
        color: ${neutral_500};
        border: 0;
        border-radius: 8px;
        height: 32px;
        padding: 0 20px;
        transition: box-shadow 0.3s ease-out, 
            background-color 0.3s ease-out, 
            color 0.3s ease-out;
        background-color: ${primary_300};
        &:hover {
            box-shadow: 0px 2px 6px 0px ${primary_100};
            background-color: ${primary_400};
            color: ${neutral_100};
        }
        &:active {
            box-shadow: inset 0px 2px 4px 0px ${primary_100};
            background-color: ${primary_200};
            color: ${neutral_500}
        }
        &:focus {
            outline: ${primary_400} solid 3px;
        }
    }
`;
