import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import Strategies from './pages/Strategies/Strategies';
import Portfolio from './pages/Portfolio/Portfolio';
import Analytics from './pages/Analytics/Analytics';
import { Toaster } from './components/UI/Toaster';
import SplineBackground from './components/Background/SplineBackground';
import LoadingScreen from './components/Loading/LoadingScreen';
import './styles/globals.css';

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 100); // Start loading immediately

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowApp(true);
  };

  if (isInitialLoading || !showApp) {
    return (
      <LoadingScreen 
        isLoading={!showApp} 
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <WalletProvider>
      <DataProvider>
        <Router>
          <SplineBackground />
          <div className="min-h-screen bg-gradient-to-br from-[#0f0f23]/80 via-[#1a1a2e]/70 to-[#16213e]/80 text-white relative z-10">
            <Header />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/strategies" element={<Strategies />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </DataProvider>
    </WalletProvider>
  );
}

export default App;