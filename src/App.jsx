// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

import { GlobalFonts } from "./assets/styles/fonts";
import { GlobalResetStyle } from "./assets/styles/cssReset";
import Home from "./Home";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <>
      <GlobalFonts />
      <GlobalResetStyle />
      <Routes>
        <Route path="/inventory/:userId" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
