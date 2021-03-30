import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
  }
  html {
    font-size: 18px;
  }
  body {
    background-color: hsl(0deg 0% 95%);
  }
`;
export default GlobalStyles;
