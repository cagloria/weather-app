import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    topGradient: "#454bc6",
    bottomGradient: "#0e125e",
};

const textColor = "#f4f4f4";
// const infoBG = "#02031c";

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }
    
    body {
        font-family: "Roboto", sans-serif;
        color: ${textColor};
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
`;
