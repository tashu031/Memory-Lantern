import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ShieldCheck, Heart, Sparkles, Flower2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-amber-500/15 bg-[#06050C] text-stone-400 mt-24 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Concept */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold text-amber-100 tracking-wide">
                Memory Lantern
              </span>
            </div>

            <p className="font-serif italic text-lg text-amber-200/90 leading-relaxed max-w-md">
              "Some memories never fade. They simply find another way to shine."
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              A private digital remembrance garden blending Día de los Muertos traditions with
              open-source AI. Crafted for the Hacktoberfest 2026 Open-Source AI Challenge (Week 4: Ghost in the Machine).
            </p>

            {/* Privacy Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Local & Private • Zero Cloud Leakage</span>
            </div>
          </div>

          {/* Garden Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-amber-300 tracking-wider uppercase font-mono">
              The Remembrance Garden
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/garden" className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <Flower2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Memory Garden</span>
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Plant New Memory</span>
                </Link>
              </li>
              <li>
                <Link to="/tribute" className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>AI Tribute Generator</span>
                </Link>
              </li>
              <li>
                <Link to="/ofrenda" className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <Flower2 className="w-3.5 h-3.5 text-orange-500" />
                  <span>Virtual Ofrenda Altar</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hacktoberfest & Open Source AI */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-amber-300 tracking-wider uppercase font-mono">
              Open-Source AI
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Google Gemma Open-Weights</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Ollama Local Inference</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>FastAPI Python Backend</span>
              </li>
              <li>
                <Link to="/about" className="text-amber-300 hover:text-amber-200 underline text-xs">
                  Why Open-Source AI Matters →
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            Honoring lives and stories through open technology. Built with care.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Hacktoberfest 2026</span>
            <span>•</span>
            <span>Día de los Muertos Edition</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Heart className="w-3 h-3 fill-amber-400" /> Forever Remembered
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
