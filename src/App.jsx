import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ChildServices from "./pages/ChildServices";
import SchoolReadiness from "./pages/SchoolReadiness";
import AdultServices from "./pages/AdultServices";
import Franchises from "./pages/Franchises";
import Contact from "./pages/Contact";
import Service from "./pages/Service";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/child-services" element={<ChildServices />} />
        <Route path="/child-services/:name" element={<Service />} />
        <Route path="/school-readiness" element={<SchoolReadiness />} />
        <Route path="/adult-services" element={<AdultServices />} />
        <Route path="/franchises" element={<Franchises />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
