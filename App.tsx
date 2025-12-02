import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { NAV_ITEMS } from './constants';

// Lazy load pages
const HomePage = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/Services'));
const ContactPage = lazy(() => import('./pages/Contact'));
const AboutPage = lazy(() => import('./pages/About'));
const InsightsPage = lazy(() => import('./pages/Insights'));

// --- ScrollToTop Helper ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
    <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout navItems={NAV_ITEMS}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};

export default App;