import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    topGradient: "#454bc6",
    bottomGradient: "#0e125e",
};

const textColor = "#f4f4f4";

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }
    
    body {
        color: ${textColor};
        background-color: ${({ theme }) => theme.topGradient};
        background-image: linear-gradient(180deg, ${({ theme }) =>
            theme.topGradient} 0%, ${({ theme }) => theme.bottomGradient} 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        margin: 0;
    }
`;
