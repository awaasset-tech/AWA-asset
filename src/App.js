import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComingSoon from './pages/ComingSoon';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import './styles.css';

function JoinUsTab() {
  return (
    <a
      href="https://awa-backend.onrender.com/partner_enrollment_final.html"
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        transformOrigin: 'right center',
        background: '#c8973a',
        color: '#fff',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.05em',
        padding: '10px 20px',
        textDecoration: 'none',
        zIndex: 999,
        borderRadius: '4px 4px 0 0',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
        whiteSpace: 'nowrap',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
      onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
    >
      Join Us
    </a>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <JoinUsTab />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;