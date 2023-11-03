import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import { Registration } from "../components/Registration";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route exact path="/login" element={<Login />} /> */}
      <Route exact path="/signup" element={<Registration />} />
    </Routes>
  </Router>
);
