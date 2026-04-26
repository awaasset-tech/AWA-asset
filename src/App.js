import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComingSoon from './pages/ComingSoon';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import Bonds from './pages/Bonds';
import MutualFunds from './pages/MutualFunds';
import ETFs from './pages/ETFs';
import Stocks from './pages/Stocks';

import './styles.css';

function JoinUsTab() {
  return (
    <a
      href="https://awa-backend.onrender.com/partner_enrollment_final.html"
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#c8973a',
        color: '#fff',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '14px 18px',
        textDecoration: 'none',
        zIndex: 999,
        borderRadius: '8px 0 0 8px',
        boxShadow: '-4px 0 16px rgba(0,0,0,0.25)',
        whiteSpace: 'nowrap',
        writingMode: 'horizontal-tb',
        transition: 'background 0.2s, padding-right 0.2s',
        border: '2px solid rgba(255,255,255,0.25)',
        borderRight: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.paddingRight = '24px'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#c8973a'; e.currentTarget.style.paddingRight = '18px'; }}
    >
      🤝 Be a Partner
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
        <Route path="/assets/debt/bonds" element={<Bonds />} />
        <Route path="/assets/equity/mutual-funds" element={<MutualFunds />} />
        <Route path="/assets/equity/etfs" element={<ETFs />} />
        <Route path="/assets/equity/stocks" element={<Stocks />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;