import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Flower2, Heart, Volume2, VolumeX, Sparkles, PlusCircle, Star, Utensils, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../components/Button';
import { getMemories, toggleCandle } from '../utils/storage';
import { playChime, playOfrendaHarmonics } from '../utils/sound';

export default function VirtualOfrendaPage({ onShowToast }) {
  const [memories, setMemories] = useState([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const loadMemories = () => {
    const list = getMemories();
    setMemories(list);
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const handleCandleClick = (id, name, isCurrentlyLit) => {
    const updated = toggleCandle(id);
    if (updated) {
      loadMemories();
      if (!isCurrentlyLit) {
        playChime(528);
        try {
          confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#F59E0B', '#EA580C', '#FEF08A'],
          });
        } catch (e) {}
      } else {
        playChime(392);
      }
      if (onShowToast) {
        onShowToast(
          !isCurrentlyLit
            ? `Candle illuminated for ${name} on the altar.`
            : `Candle gently extinguished for ${name}.`,
          'info'
        );
      }
    }
  };

  const handleLightAll = () => {
    let changed = false;
    memories.forEach((m) => {
      if (!m.isCandleLit) {
        toggleCandle(m.id);
        changed = true;
      }
    });
    if (changed) {
      loadMemories();
      playOfrendaHarmonics();
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#FBBF24', '#EA580C', '#FEF08A'],
        });
      } catch (e) {}
      if (onShowToast) onShowToast('All candles on the altar have been lit in remembrance.', 'success');
    }
  };

  const handleToggleHarmonics = () => {
    const next = !isAudioEnabled;
    setIsAudioEnabled(next);
    if (next) {
      playOfrendaHarmonics();
      if (onShowToast) onShowToast('Peaceful ofrenda chime activated.', 'info');
    }
  };

  const litCount = memories.filter((m) => m.isCandleLit).length;

  return (
    <div className="relative min-h-screen py-10 sm:py-16 overflow-hidden">
      
      {/* Warm Altar Ambient Radial Backdrop */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-gradient-to-b from-orange-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header & Marigold Arch */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          
          {/* Decorative Día de los Muertos Banner */}
          <div className="flex items-center justify-center gap-3 text-orange-400">
            <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-orange-500/60" />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-serif italic text-orange-200">
              <Flower2 className="w-4 h-4 text-orange-400" />
              <span>Día de los Muertos • Altar de Recuerdos</span>
              <Flower2 className="w-4 h-4 text-orange-400" />
            </div>
            <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-orange-500/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-amber-100 tracking-tight">
            The Virtual Ofrenda
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 leading-relaxed max-w-2xl mx-auto">
            "A sacred space adorned in cempasúchil petals and candlelight, guiding beloved spirits
            home across the bridge of time and memory."
          </p>

          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Click any candle to light or extinguish its flame. Each golden flame is preserved in your
            browser storage and burns in honored dedication to their life.
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="marigold"
              size="sm"
              icon={Flame}
              onClick={handleLightAll}
            >
              Light All Candles ({memories.length})
            </Button>

            <button
              onClick={handleToggleHarmonics}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-stone-900/80 border border-amber-500/25 text-amber-200 hover:border-amber-400/50 transition-all cursor-pointer"
              title="Play peaceful wind chimes"
            >
              {isAudioEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
              <span>{isAudioEnabled ? 'Peaceful Chime' : 'Sound Ambient'}</span>
            </button>
          </div>

        </div>

        {/* Cempasúchil (Marigold) Decorative Divider */}
        <div className="flex items-center justify-center gap-2 text-amber-500/40 py-2 select-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <Flower2
              key={i}
              className={`w-5 h-5 ${i % 2 === 0 ? 'text-amber-500/70' : 'text-orange-500/80'} animate-pulse`}
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>

        {/* TIERED OFRENDA ALTAR */}
        <div className="glass-panel rounded-3xl p-6 sm:p-12 border border-orange-500/30 bg-[#0A0714]/80 shadow-2xl space-y-12 relative overflow-hidden">
          
          {/* Top Altar Plaque */}
          <div className="text-center pb-6 border-b border-orange-500/20">
            <h2 className="font-serif text-2xl font-bold text-amber-200">
              Honoring Those We Hold in Our Hearts
            </h2>
            <div className="text-xs text-amber-300/70 font-mono mt-1">
              {litCount} of {memories.length} Candles Currently Illuminated
            </div>
          </div>

          {/* Memory Candle Offering Grid */}
          {memories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {memories.map((mem) => {
                const isLit = !!mem.isCandleLit;

                return (
                  <div
                    key={mem.id}
                    onClick={() => handleCandleClick(mem.id, mem.name, isLit)}
                    className={`group relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer flex flex-col items-center text-center space-y-4 select-none ${
                      isLit
                        ? 'bg-gradient-to-b from-stone-900/90 to-amber-950/40 border-amber-500/45 shadow-2xl shadow-amber-950/40 ring-1 ring-amber-500/20 scale-[1.02]'
                        : 'bg-stone-950/70 border-stone-800/80 hover:border-amber-500/30 hover:bg-stone-900/60'
                    }`}
                  >
                    {/* Golden Marigold Petal Accents */}
                    <div className="absolute top-3 left-3 text-amber-500/60">
                      <Flower2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute top-3 right-3 text-orange-500/60">
                      <Flower2 className="w-3.5 h-3.5" />
                    </div>

                    {/* DIGITAL CANDLE WITH REALISTIC FLICKER */}
                    <div className="relative pt-2">
                      {/* Aura glow behind candle */}
                      {isLit && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-500/30 rounded-full blur-xl pointer-events-none animate-pulse-aura" />
                      )}

                      <div className="flex flex-col items-center">
                        {/* Flame */}
                        <div className="h-10 flex items-center justify-center">
                          {isLit ? (
                            <div className="relative flex items-center justify-center animate-flicker">
                              {/* Outer Flame */}
                              <div className="w-5 h-8 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-full shadow-lg shadow-amber-500/50 transform origin-bottom" />
                              {/* Inner White Core */}
                              <div className="absolute w-2 h-4 bg-white/90 rounded-full bottom-1" />
                            </div>
                          ) : (
                            /* Unlit wick */
                            <div className="w-0.5 h-4 bg-stone-600 rounded-full mt-2" />
                          )}
                        </div>

                        {/* Wax Pillar */}
                        <div className={`w-14 h-20 rounded-lg flex flex-col justify-between p-1 transition-all ${
                          isLit
                            ? 'bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200 border border-amber-300 shadow-md shadow-amber-500/20'
                            : 'bg-stone-800 border border-stone-700 opacity-60'
                        }`}>
                          {/* Candle drips */}
                          <div className="flex justify-around">
                            <span className={`w-2 h-2 rounded-full ${isLit ? 'bg-amber-300' : 'bg-stone-700'}`} />
                            <span className={`w-1.5 h-3 rounded-full ${isLit ? 'bg-amber-300' : 'bg-stone-700'}`} />
                            <span className={`w-2 h-1.5 rounded-full ${isLit ? 'bg-amber-300' : 'bg-stone-700'}`} />
                          </div>
                          
                          <div className="text-center pb-1">
                            <Flame className={`w-4 h-4 mx-auto ${isLit ? 'text-amber-800' : 'text-stone-600'}`} />
                          </div>
                        </div>

                        {/* Candle Holder Base */}
                        <div className="w-20 h-3 rounded-full bg-stone-800 border border-stone-700 mt-0.5 shadow-sm" />
                      </div>
                    </div>

                    {/* Honoree Info */}
                    <div className="space-y-1 w-full">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/15">
                        {mem.relationship}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-amber-100 tracking-wide mt-1">
                        {mem.name}
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-2 px-2 font-serif italic">
                        {mem.description || mem.favorite_memories || 'Forever remembered with love.'}
                      </p>
                    </div>

                    {/* Favorite Offerings Icons (Pan de Muerto, Favorite Food/Music) */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-300/80">
                      {mem.favorite_food && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-950/70 border border-stone-800" title={`Offering: ${mem.favorite_food}`}>
                          <Utensils className="w-3 h-3 text-amber-400" />
                          <span className="truncate max-w-[90px]">{mem.favorite_food}</span>
                        </span>
                      )}
                      {mem.favorite_music && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-950/70 border border-stone-800" title={`Melody: ${mem.favorite_music}`}>
                          <Music className="w-3 h-3 text-orange-400" />
                          <span className="truncate max-w-[90px]">{mem.favorite_music}</span>
                        </span>
                      )}
                    </div>

                    {/* Candle Status Prompt */}
                    <div className="pt-2 text-[11px] font-mono text-stone-400">
                      {isLit ? (
                        <span className="text-amber-300 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> Burning Softly • Click to blow out
                        </span>
                      ) : (
                        <span className="group-hover:text-amber-300 transition-colors">
                          Click to light this candle
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <Flower2 className="w-12 h-12 text-amber-500/40 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-amber-100">The Altar Awaits Your Loved Ones</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Plant a memory in your garden first, and their candle and photo plaque will appear here on the ofrenda.
                </p>
              </div>
              <Link to="/create">
                <Button variant="primary" size="sm" icon={PlusCircle}>
                  Plant a Memory
                </Button>
              </Link>
            </div>
          )}

          {/* Bottom Remembrance Inscription */}
          <div className="pt-8 border-t border-orange-500/20 text-center max-w-xl mx-auto space-y-2">
            <p className="font-serif italic text-base text-amber-200/90 leading-relaxed">
              "Hay tres muertes: la primera cuando nuestros cuerpos mueren, la segunda cuando nos entierran,
              y la tercera cuando nadie nos recuerda. Aquí, nadie es olvidado."
            </p>
            <p className="text-xs text-stone-500">
              There are three deaths: when our bodies fail, when we are laid to rest, and when we are no longer spoken of. Here, their light never fades.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
