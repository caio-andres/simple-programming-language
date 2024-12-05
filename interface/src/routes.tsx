import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Error } from "./pages/error/page";
import { Home } from "./pages/home/home";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
