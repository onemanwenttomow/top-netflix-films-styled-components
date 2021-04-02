import { createGlobalStyle } from "styled-components";
// need to switch how i import the fonts
const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
    }
    html {
      font-size: 18px;
    }
    body {
      font-family: 'Raleway', sans-serif;
      background-color: hsl(0deg 0% 95%);
    }
`;
export default GlobalStyles;
