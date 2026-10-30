import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Heart, Shield, Lock, Cpu, Flower2, ArrowRight, BookOpen, Quote, CheckCircle, Star } from 'lucide-react';
import LanternVisual from '../components/LanternVisual';
import Button from '../components/Button';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden space-y-24 sm:space-y-32">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-gradient-to-b from-amber-500/15 via-orange-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Theme Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Hacktoberfest 2026 • Ghost in the Machine</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-stone-100 leading-[1.08]">
                  Keep Their Light <br />
                  <span className="gold-gradient-text italic font-normal">Alive.</span>
                </h1>
                
                <p className="font-serif italic text-xl sm:text-2xl text-amber-200/90 max-w-xl mx-auto lg:mx-0">
                  "Some memories never fade. They simply find another way to shine."
                </p>

                <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Memory Lantern is a private, emotional digital remembrance garden. Preserve personal
                  stories, favorite recipes, and timeless melodies of your loved ones—and transform them
                  into heartfelt tribute letters powered by open-source Google Gemma AI, running entirely on your machine.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/create">
                  <Button variant="primary" size="lg" icon={Flame} className="w-full sm:w-auto">
                    Create a Memory
                  </Button>
                </Link>

                <Link to="/garden">
                  <Button variant="secondary" size="lg" icon={Flower2} className="w-full sm:w-auto">
                    Explore Memory Garden
                  </Button>
                </Link>
              </div>

              {/* Trust & Privacy Pill */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>100% In-Browser Local Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Local Google Gemma via Ollama</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span>Zero Cloud Tracking</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative p-6 sm:p-10 rounded-full bg-gradient-to-b from-amber-500/10 via-amber-950/20 to-transparent border border-amber-500/20 shadow-2xl">
                <LanternVisual size="lg" isLit={true} />
              </div>

              {/* Subtle dedication note beneath lantern */}
              <div className="mt-4 text-center">
                <span className="font-serif italic text-sm text-amber-300/80">
                  A sanctuary of light for those we cherish forever
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 1: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Simple, Meaningful & Peaceful
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
            How Memory Lantern Works
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Crafted to be an intimate refuge where personal grief and warm remembrance are held with utmost tenderness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Preserve Stories',
              desc: 'Enter their name, special qualities, favorite foods, songs, and cherished life anecdotes into your personal memory journal.',
              icon: BookOpen,
            },
            {
              step: '02',
              title: 'Light a Candle',
              desc: 'Light a persistent digital candle on their memory card or our Día de los Muertos virtual ofrenda altar.',
              icon: Flame,
            },
            {
              step: '03',
              title: 'AI Tribute Synthesis',
              desc: 'Our local Google Gemma AI crafts respectful remembrance letters, eulogies, or poetic quotes strictly from the facts you shared.',
              icon: Sparkles,
            },
            {
              step: '04',
              title: 'Cherish Privately',
              desc: 'All stories and tributes remain safely stored in your browser LocalStorage. No data ever leaves your device.',
              icon: Shield,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl space-y-4 border border-amber-500/15 hover:border-amber-400/35 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-amber-500/40 group-hover:text-amber-400 transition-colors">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100">{item.title}</h3>
              <p className="text-sm text-stone-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 2: PRESERVE THEIR STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-amber-500/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                Preserve What Matters Most
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 leading-tight">
                Not Just a Name. <br />
                <span className="gold-gradient-text italic">Their Entire Essence.</span>
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Too often, digital memorials reduce lives to dry birth and death dates. Memory Lantern
                is crafted to remember the way their laugh sounded, the music that made them dance,
                the dish they prepared when someone felt down, and the gentle wisdom they passed on.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Capture favorite dishes, baked goods, and Sunday morning recipes',
                  'Record their favorite boleros, jazz melodies, or acoustic ballads',
                  'Chronicle their distinct quirks, laughter, and lifelong virtues',
                  'Dedicate special remembrance dates and Día de los Muertos offerings',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-stone-200">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/create">
                  <Button variant="primary" icon={ArrowRight}>
                    Write a Remembrance Story
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Example Card */}
            <div className="relative">
              <div className="p-6 sm:p-8 rounded-3xl bg-stone-950/80 border border-amber-500/30 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-amber-300 font-mono">Abuelita Elena • Grandmother</span>
                  </div>
                  <span className="text-xs text-stone-500 font-mono">Nov 2, Día de los Muertos</span>
                </div>

                <div className="font-serif italic text-stone-200 text-base leading-relaxed">
                  "Every Sunday morning, she would play classic boleros and bake fresh conchas.
                  Her secret was always extra cinnamon and a mountain of patience. She believed
                  a home should always smell like something warm was waiting for you."
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Conchas & Spiced Chocolate
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/20">
                    Mariachi & Boleros
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
                    Gentle Laughter & Roses
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 3: AI-POWERED TRIBUTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Compassionate Artificial Intelligence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
            Four Meaningful AI Tribute Formats
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Powered by Google Gemma open-weight models running on Ollama. The AI is strictly
            grounded in your memories, honoring their dignity without making up fictional details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              type: 'Remembrance Letter',
              style: 'Heartfelt & Personal',
              desc: 'An intimate, loving letter reminiscing upon shared moments, gratitude, and lasting bond.',
              preview: '"Dear Abuelita, every time the autumn wind brings the scent of cinnamon..."',
            },
            {
              type: 'Eulogy / Tribute Speech',
              style: 'Poetic & Uplifting',
              desc: 'A poignant tribute speech celebrating their character, laughter, and light.',
              preview: '"We do not remember them with silence, but with the melodies they loved most..."',
            },
            {
              type: 'Memory Quotes Collection',
              style: 'Nostalgic & Reflective',
              desc: 'Four to five timeless poetic quotes capturing their unique spirit and wisdom.',
              preview: '"1. In every garden of roses, her quiet patience still blooms with the morning dew."',
            },
            {
              type: 'Ofrenda Blessing Message',
              style: 'Simple & Sacred',
              desc: 'A loving blessing suitable to leave beside a glowing candle and marigolds on the altar.',
              preview: '"May this golden flame guide your spirit home to the warmth of our eternal love."',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between border border-amber-500/15 hover:border-amber-400/35 transition-all duration-300 space-y-4"
            >
              <div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                  {card.style}
                </span>
                <h3 className="font-serif text-xl font-bold text-amber-100 mt-2">{card.type}</h3>
                <p className="text-xs text-stone-300 leading-relaxed mt-2">{card.desc}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 font-serif italic text-xs text-amber-200/80 leading-relaxed">
                {card.preview}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/tribute">
            <Button variant="marigold" size="lg" icon={Sparkles}>
              Try the AI Tribute Generator
            </Button>
          </Link>
        </div>
      </section>


      {/* SECTION 4: VIRTUAL OFRENDA & GARDEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-mono">
              <Flower2 className="w-3.5 h-3.5" />
              <span>Día de los Muertos Tradition</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 leading-tight">
              A Virtual Ofrenda <br />
              <span className="marigold-gradient-text italic">Adorned in Marigold & Light.</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              In Mexican tradition, the Día de los Muertos ofrenda welcomes the spirits of loved ones
              with cempasúchil (marigold petals), warm candle flames, and the foods they loved.
              Memory Lantern provides a peaceful virtual altar where you can light persistent candles
              and reflect in serene quiet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/ofrenda">
                <Button variant="primary" icon={Flame}>
                  Visit Virtual Ofrenda
                </Button>
              </Link>
              <Link to="/garden">
                <Button variant="secondary" icon={Flower2}>
                  Browse Memory Garden
                </Button>
              </Link>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-amber-500/25 shadow-2xl relative text-center space-y-6">
            <div className="flex justify-center items-center gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center animate-pulse">
                  <Flame className="w-7 h-7 text-amber-400 animate-flicker" />
                </div>
                <span className="text-xs text-amber-200 font-serif">Grandmother</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="w-14 h-20 rounded-full bg-orange-500/25 border border-orange-400/50 flex items-center justify-center animate-pulse">
                  <Flame className="w-9 h-9 text-orange-400 animate-flicker" />
                </div>
                <span className="text-xs text-orange-200 font-serif font-bold">Papa Art</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded-full bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center animate-pulse">
                  <Flame className="w-7 h-7 text-yellow-300 animate-flicker" />
                </div>
                <span className="text-xs text-yellow-100 font-serif">Beloved Mentor</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-serif italic max-w-sm mx-auto">
              "To live in hearts we leave behind is not to die."
            </p>
          </div>

        </div>
      </section>


      {/* SECTION 5: WHY OPEN-SOURCE AI MATTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-emerald-500/20 shadow-2xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Ethical AI & Data Sovereignty
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              Why Open-Source AI Matters for Remembrance
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Memories of lost family members and dear friends are the most intimate data humans possess.
              They should never be monetized, tracked, or fed to proprietary cloud surveillance models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-stone-950/60 border border-emerald-500/15 space-y-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h3 className="font-serif text-lg font-bold text-stone-200">Zero Cloud Transmission</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Your memories never leave your browser or device. All AI generation happens via your local Ollama runtime.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950/60 border border-emerald-500/15 space-y-3">
              <Cpu className="w-6 h-6 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-stone-200">Google Gemma Open Weights</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Built upon Google's state-of-the-art open-weight Gemma architecture, providing high emotional resonance with low compute overhead.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950/60 border border-emerald-500/15 space-y-3">
              <Heart className="w-6 h-6 text-rose-400" />
              <h3 className="font-serif text-lg font-bold text-stone-200">No Paywalls, Forever Free</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Remembrance should not require a monthly subscription. Open-source AI ensures access belongs to all people for all time.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
