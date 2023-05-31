import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Image from "./Components/Image";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image/:id" element={<Image />} />
      </Routes>
    </Router>
  );
}

export default App;
