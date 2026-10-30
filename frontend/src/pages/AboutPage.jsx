import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ShieldCheck, Cpu, Lock, Sparkles, BookOpen, Heart, Flower2, Code, Terminal, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Philosophy & Architecture</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-amber-100 tracking-tight">
          About Memory Lantern
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 leading-relaxed">
          "Some memories never fade. They simply find another way to shine."
        </p>
      </div>

      {/* The Ghost in the Machine Story */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/20 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-amber-100">
              The Hacktoberfest 2026 Theme: Ghost in the Machine
            </h2>
            <div className="text-xs text-amber-400/80 font-mono">Week 4 Open-Source AI Challenge</div>
          </div>
        </div>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          For decades, philosophy and science fiction have pondered Gilbert Ryle's famous concept of the
          <em> "Ghost in the Machine"</em>—the elusive, intangible consciousness residing within mechanical vessels.
        </p>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          In <strong>Memory Lantern</strong>, we re-imagine this relationship not as a spooky horror trope,
          but as an act of profound human tenderness. Drawing inspiration from <em>Día de los Muertos</em>,
          Halloween, and personal grief, we explore how computing machinery—when completely open-source, local,
          and transparent—can become a compassionate, respectful vessel for preserving human memories.
        </p>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          The "ghost" here is not an algorithm impersonating a human. It is the living spark of memory:
          the recipe for Sunday conchas, the jazz tune hummed at dusk, the sound of grandfather's chuckle,
          and the lessons that continue to guide us long after someone has passed away.
        </p>
      </section>

      {/* Pillar Grid: What, Why, How, Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pillar 1: What is Memory Lantern */}
        <div className="glass-panel rounded-3xl p-8 border border-amber-500/15 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
              <Flower2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-amber-100">A Private Digital Remembrance Garden</h3>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">
            Memory Lantern is a calm, contemplative digital garden designed to help people honor loved ones,
            ancestors, mentors, and cherished pets. Unlike public social media tributes filled with ads and metrics,
            Memory Lantern is an intimate, private sanctuary where you alone tend the lights.
          </p>
        </div>

        {/* Pillar 2: Why Memories Matter */}
        <div className="glass-panel rounded-3xl p-8 border border-amber-500/15 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-amber-100">Why Granular Memories Matter</h3>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">
            We remember people through specific sensory anchors: the smell of their kitchen, their favorite
            melodies, their trademark sayings, and their quiet kindnesses. By storing these rich details,
            Memory Lantern keeps their genuine personality vivid across generations.
          </p>
        </div>

        {/* Pillar 3: Open-Source AI (Gemma + Ollama) */}
        <div className="glass-panel rounded-3xl p-8 border border-amber-500/15 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-amber-100">Google Gemma Open-Weight AI</h3>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">
            The tribute generator is powered by Google's Gemma open-weight models running locally via Ollama.
            Instead of querying a paid cloud API, your computer runs the neural network directly, generating
            graceful eulogies, letters, and quotes with zero external dependencies.
          </p>
        </div>

        {/* Pillar 4: Why Local Privacy is Essential */}
        <div className="glass-panel rounded-3xl p-8 border border-amber-500/15 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-amber-100">Zero Cloud Data Transmission</h3>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">
            Personal grief and intimate family memories must never be commercialized or scraped to train
            proprietary advertising algorithms. In Memory Lantern, 100% of memories are preserved in your
            browser's LocalStorage, and all AI processing stays within your machine.
          </p>
        </div>

      </div>

      {/* Technical Architecture Breakdown */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/20 shadow-2xl space-y-6">
        <h2 className="font-serif text-2xl font-bold text-amber-100 flex items-center gap-2">
          <Code className="w-5 h-5 text-amber-400" />
          <span>Architecture & Stack</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="text-xs font-mono text-amber-300 uppercase">Frontend</div>
            <div className="font-serif font-bold text-stone-100">React + Vite</div>
            <p className="text-xs text-stone-400">
              Modern component architecture, Tailwind CSS styling, responsive layout, React Router.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="text-xs font-mono text-amber-300 uppercase">Backend</div>
            <div className="font-serif font-bold text-stone-100">Python FastAPI</div>
            <p className="text-xs text-stone-400">
              High-performance asynchronous API, Pydantic data validation, HTTP error handling.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="text-xs font-mono text-amber-300 uppercase">AI Runtime</div>
            <div className="font-serif font-bold text-stone-100">Gemma on Ollama</div>
            <p className="text-xs text-stone-400">
              Local inference via Ollama chat API, defaulting to gemma3:1b with support for gemma2:2b.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="text-xs font-mono text-amber-300 uppercase">Persistence</div>
            <div className="font-serif font-bold text-stone-100">LocalStorage</div>
            <p className="text-xs text-stone-400">
              Zero database setup required. Complete client-side sovereignty and offline access.
            </p>
          </div>
        </div>

        {/* Quick Ollama commands */}
        <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/20 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <Terminal className="w-4 h-4" />
            <span>Running Gemma locally with Ollama</span>
          </div>
          <div className="space-y-1 text-stone-300">
            <div className="p-2 rounded bg-black/80 select-all border border-stone-800">
              # 1. Install & start Ollama
              <br />
              ollama serve
            </div>
            <div className="p-2 rounded bg-black/80 select-all border border-stone-800">
              # 2. Pull the Gemma model
              <br />
              ollama pull gemma3:1b
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div className="text-center pt-4 space-y-4">
        <h3 className="font-serif text-2xl font-bold text-amber-100">Ready to light your first lantern?</h3>
        <div className="flex items-center justify-center gap-4">
          <Link to="/create">
            <Button variant="primary" size="lg" icon={Flame}>
              Plant a Memory
            </Button>
          </Link>
          <Link to="/garden">
            <Button variant="secondary" size="lg" icon={Flower2}>
              Explore Garden
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
