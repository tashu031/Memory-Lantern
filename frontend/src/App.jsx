import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingEmbers from './components/FloatingEmbers';
import Toast from './components/Toast';

import LandingPage from './pages/LandingPage';
import CreateMemoryPage from './pages/CreateMemoryPage';
import MemoryGardenPage from './pages/MemoryGardenPage';
import AITributeGeneratorPage from './pages/AITributeGeneratorPage';
import VirtualOfrendaPage from './pages/VirtualOfrendaPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem('memory_lantern_active_model') || '';
  });

  const handleShowToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
    localStorage.setItem('memory_lantern_active_model', modelName);
    handleShowToast(`Active AI Model changed to ${modelName}`, 'info');
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen flex flex-col bg-[#08070F] text-[#F5EFE6] selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Ambient floating golden embers background */}
        <FloatingEmbers />

        {/* Global Navigation Bar */}
        <Navbar
          selectedModel={selectedModel}
          onModelSelect={handleModelSelect}
        />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/garden" element={<MemoryGardenPage onShowToast={handleShowToast} />} />
            <Route path="/create" element={<CreateMemoryPage onShowToast={handleShowToast} />} />
            <Route
              path="/tribute"
              element={
                <AITributeGeneratorPage
                  onShowToast={handleShowToast}
                  selectedModel={selectedModel}
                  onModelSelect={handleModelSelect}
                />
              }
            />
            <Route path="/ofrenda" element={<VirtualOfrendaPage onShowToast={handleShowToast} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Floating Toast */}
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />

      </div>
    </BrowserRouter>
  );
}
