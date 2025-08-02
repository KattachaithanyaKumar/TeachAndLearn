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
import ScrollToTop from "./components/ScrollToTop";
import Psychology from "./pages/services/Psychology";
import AdultSpeech from "./pages/services/AdultSpeech";
import Physical from "./pages/services/Physical";
import AdultBehavioral from "./pages/services/AdultBehavioral";
import Facilities from "./pages/Facilities";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/child-services" element={<ChildServices />} />
        <Route path="/child-services/:name" element={<Service />} />
        <Route path="/school-readiness" element={<SchoolReadiness />} />
        <Route path="/adult-services" element={<AdultServices />} />
        <Route path="/adult-services/psychology" element={<Psychology />} />
        <Route path="/adult-services/speech-therapy" element={<AdultSpeech />} />
        <Route path="/adult-services/physical-therapy" element={<Physical />} />
        <Route path="/adult-services/behavioral-therapy" element={<AdultBehavioral />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/franchises" element={<Franchises />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
