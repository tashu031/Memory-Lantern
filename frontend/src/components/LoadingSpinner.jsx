import React from 'react';
import { Flame } from 'lucide-react';

export default function LoadingSpinner({ text = 'Illuminating memory with Gemma AI...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Pulsing golden aura rings */}
        <div className="absolute w-20 h-20 rounded-full bg-amber-500/20 blur-xl animate-ping" />
        <div className="absolute w-16 h-16 rounded-full border border-amber-400/30 animate-spin" style={{ animationDuration: '4s' }} />
        
        {/* Candle Flame icon */}
        <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
          <Flame className="w-6 h-6 text-stone-950 animate-bounce" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-amber-100 font-serif text-lg tracking-wide">{text}</p>
        <p className="text-xs text-amber-200/50">Processing locally via Ollama • Zero cloud transmission</p>
      </div>
    </div>
  );
}
