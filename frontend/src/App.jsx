import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Vision from './components/Vision';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = usePortfolio();
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <TechStack />
      <Projects />
      <Vision />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
