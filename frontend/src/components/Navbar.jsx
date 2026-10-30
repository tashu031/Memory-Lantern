import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, PlusCircle, Sparkles, Flower2, Heart, Menu, X, BookOpen } from 'lucide-react';
import ModelStatusBadge from './ModelStatusBadge';

export default function Navbar({ selectedModel, onModelSelect }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/garden', label: 'Memory Garden', icon: Flower2 },
    { to: '/create', label: 'Plant Memory', icon: PlusCircle },
    { to: '/tribute', label: 'AI Tribute', icon: Sparkles },
    { to: '/ofrenda', label: 'Virtual Ofrenda', icon: Flame },
    { to: '/about', label: 'About & Privacy', icon: BookOpen },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08070F]/85 backdrop-blur-xl border-b border-amber-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Theme Title */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-all duration-300">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400 group-hover:scale-110 group-hover:text-amber-300 transition-all" />
              </div>
            </div>

            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-amber-100 flex items-center gap-2">
                Memory Lantern
              </div>
              <div className="text-[10px] tracking-widest text-amber-300/60 uppercase font-sans">
                A Private AI Remembrance Garden
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-amber-200 bg-amber-500/15 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                      : 'text-stone-300 hover:text-amber-100 hover:bg-stone-800/50'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-stone-400'}`} />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Model Status */}
          <div className="hidden sm:flex items-center gap-3">
            <ModelStatusBadge selectedModel={selectedModel} onModelSelect={onModelSelect} />

            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 shadow-md shadow-amber-500/20 transition-all duration-200"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Plant Memory</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ModelStatusBadge selectedModel={selectedModel} onModelSelect={onModelSelect} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-300 hover:text-amber-200 hover:bg-stone-800/60 border border-stone-800 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-500/15 bg-stone-950/95 backdrop-blur-2xl px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                  active
                    ? 'text-amber-200 bg-amber-500/20 border border-amber-500/30'
                    : 'text-stone-300 hover:text-amber-100 hover:bg-stone-900'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 text-amber-400" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-amber-500/15">
            <Link
              to="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-orange-400"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plant a Memory</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
