import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Preloader from "./Preloader";
import ScrollToTop from "./ScrollToTop";

// Lazy load pages for better code splitting
const GetInTouchPage = lazy(() => import("./pages/GetInTouchPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const FAQs = lazy(() => import("./pages/FAQs"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));

// Fallback loading component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const removeTimer = setTimeout(() => setLoading(false), 1500); // Slightly longer than fade duration
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {/* Always keep Preloader until fade finishes */}
      {loading && <Preloader fadeOut={fadeOut} />}

      {/* Page content only shows after preloader fully fades */}
      {!loading && (
        <>
          <ScrollToTop />
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/getintouch" element={<GetInTouchPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/portfolio-page" element={<PortfolioPage />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
