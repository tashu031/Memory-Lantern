import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Calendar, Heart, Trash2, Edit3, Eye, Music, Utensils, Star } from 'lucide-react';
import { playChime } from '../utils/sound';

export default function MemoryCard({
  memory,
  onToggleCandle,
  onDelete,
  onEdit,
  onView,
}) {
  const handleCandleClick = (e) => {
    e.stopPropagation();
    if (onToggleCandle) {
      onToggleCandle(memory.id);
      playChime(memory.isCandleLit ? 392 : 528);
    }
  };

  const formattedDate = memory.createdAt
    ? new Date(memory.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div
      className={`group relative glass-panel rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
        memory.isCandleLit
          ? 'border-amber-500/40 shadow-xl shadow-amber-950/30 bg-stone-900/80 ring-1 ring-amber-500/20'
          : 'border-stone-800/80 hover:border-amber-500/30 hover:bg-stone-900/60'
      }`}
    >
      {/* Candle Top Aura if lit */}
      {memory.isCandleLit && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-24 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
      )}

      <div>
        {/* Header Row: Relationship & Candle light button */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/25">
            <Heart className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{memory.relationship}</span>
          </span>

          <button
            onClick={handleCandleClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              memory.isCandleLit
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold shadow-md shadow-amber-500/30'
                : 'bg-stone-950/60 text-stone-400 hover:text-amber-300 border border-stone-800 hover:border-amber-500/30'
            }`}
            title={memory.isCandleLit ? 'Candle is burning bright. Click to extinguish.' : 'Click to light a candle in remembrance'}
          >
            <Flame className={`w-3.5 h-3.5 ${memory.isCandleLit ? 'fill-current animate-flicker text-amber-950' : 'text-stone-400'}`} />
            <span>{memory.isCandleLit ? 'Candle Lit' : 'Light Candle'}</span>
          </button>
        </div>

        {/* Person's Name */}
        <h3 className="font-serif text-2xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors tracking-wide mb-2">
          {memory.name}
        </h3>

        {/* Short description */}
        <p className="text-sm text-stone-300 leading-relaxed mb-4 line-clamp-3">
          {memory.description || memory.favorite_memories || 'A cherished soul held forever in warm remembrance.'}
        </p>

        {/* Quick Highlights / Favorites */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {memory.favorite_food && (
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-stone-950/60 text-amber-200/80 border border-amber-500/15" title="Favorite food">
              <Utensils className="w-3 h-3 text-amber-400/80" />
              <span className="truncate max-w-[120px]">{memory.favorite_food}</span>
            </span>
          )}
          {memory.favorite_music && (
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-stone-950/60 text-amber-200/80 border border-amber-500/15" title="Favorite music">
              <Music className="w-3 h-3 text-amber-400/80" />
              <span className="truncate max-w-[120px]">{memory.favorite_music}</span>
            </span>
          )}
          {memory.special_qualities && (
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-stone-950/60 text-amber-200/80 border border-amber-500/15" title="Special qualities">
              <Star className="w-3 h-3 text-amber-400/80" />
              <span className="truncate max-w-[120px]">{memory.special_qualities}</span>
            </span>
          )}
        </div>
      </div>

      {/* Footer Area: Date & Action buttons */}
      <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-1.5 text-stone-500 font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-1">
          {onView && (
            <button
              onClick={() => onView(memory)}
              className="p-2 rounded-xl text-stone-400 hover:text-amber-200 hover:bg-stone-800/60 transition-colors cursor-pointer"
              title="View full memory"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <Link
            to={`/tribute?id=${memory.id}`}
            className="p-2 rounded-xl text-amber-400 hover:text-amber-200 hover:bg-amber-500/15 transition-colors"
            title="Generate AI Tribute with Gemma"
          >
            <Sparkles className="w-4 h-4" />
          </Link>

          {onEdit && (
            <button
              onClick={() => onEdit(memory)}
              className="p-2 rounded-xl text-stone-400 hover:text-amber-200 hover:bg-stone-800/60 transition-colors cursor-pointer"
              title="Edit memory details"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(memory.id)}
              className="p-2 rounded-xl text-stone-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Remove memory"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
