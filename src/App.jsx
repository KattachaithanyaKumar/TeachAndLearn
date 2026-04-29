import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Franchises from "./pages/Franchises";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Facilities from "./pages/Facilities";
import Services from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import RouteHead from "./components/RouteHead";

const AdminModule = lazy(() => import("./admin/AdminModule"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteHead />
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
        <Route path="/services" element={<Services />} />
        <Route path="/service/:slug" element={<ServiceDetailPage />} />
        <Route path="/child-services" element={<Navigate to="/#services" replace />} />
        <Route path="/child-services/:slug" element={<Navigate to="/#services" replace />} />
        <Route path="/adult-services" element={<Navigate to="/#services" replace />} />
        <Route path="/adult-services/:slug" element={<Navigate to="/#services" replace />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/franchises" element={<Franchises />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
