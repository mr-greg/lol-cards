import { createGlobalStyle } from "styled-components";
import Roboto from "../fonts/Roboto-Regular.ttf";
import lolRegular from "../fonts/BeaufortforLOL-Regular.ttf";
import lolBold from "../fonts/BeaufortforLOL-Bold.ttf";
import lolLight from "../fonts/BeaufortforLOL-Light.ttf";
import lolMedium from "../fonts/BeaufortforLOL-Medium.ttf";

export const GlobalFonts = createGlobalStyle`
@font-face {
  font-family: "Roboto";
  src: url(${Roboto}) format("opentype");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "lol";
  src: url(${lolRegular}) format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "lol";
  src: url(${lolBold}) format("opentype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "lol";
  src: url(${lolMedium}) format("opentype");
  font-weight: 350;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "lol";
  src: url(${lolLight}) format("opentype");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

`;
