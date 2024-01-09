import { createGlobalStyle } from "styled-components";
import Roboto from "../fonts/Roboto-Regular.ttf";

export const GlobalFonts = createGlobalStyle`
@font-face {
  font-family: "Roboto";
  src: url(${Roboto}) format("opentype");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
`;
