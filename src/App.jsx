import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ChildServices from "./pages/ChildServices";
import AdultServices from "./pages/AdultServices";
import Franchises from "./pages/Franchises";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Facilities from "./pages/Facilities";
import ServiceDetailPage from "./pages/ServiceDetailPage";

const AdminModule = lazy(() => import("./admin/AdminModule"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-white text-neutral-600">
                  Loading admin…
                </div>
              }
            >
              <AdminModule />
            </Suspense>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/child-services" element={<ChildServices />} />
        <Route path="/child-services/:slug" element={<ServiceDetailPage audience="child" />} />
        <Route path="/adult-services" element={<AdultServices />} />
        <Route path="/adult-services/:slug" element={<ServiceDetailPage audience="adult" />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/franchises" element={<Franchises />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
