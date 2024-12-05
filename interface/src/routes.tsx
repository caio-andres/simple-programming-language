import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Content } from "./content";
import { Error } from "./error/page";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
