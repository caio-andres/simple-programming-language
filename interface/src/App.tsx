import React from "react";
import { RoutesApp } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <RoutesApp />
    </>
  );
};

export default App;
