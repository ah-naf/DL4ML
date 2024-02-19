import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Operations from "./Pages/Operations";

function App() {
  return (
    <div className="p-6 px-8">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/operation" element={<Operations />} />
      </Routes>
    </div>
  );
}

export default App;
