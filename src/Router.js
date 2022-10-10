import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
