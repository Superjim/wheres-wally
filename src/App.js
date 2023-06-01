import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Image from "./Components/Image";
import Header from "./Components/Header";
import Settings from "./Components/Settings";
import UserGames from "./Components/UserGames";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Image />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-games" element={<UserGames />} />
      </Routes>
    </Router>
  );
}

export default App;
