import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({
  message,
  type = 'success',
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-300 shrink-0" />,
  };

  const borders = {
    success: 'border-amber-500/40 shadow-amber-500/10',
    error: 'border-rose-500/40 shadow-rose-500/10',
    info: 'border-amber-400/30 shadow-amber-400/10',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`glass-panel p-4 rounded-2xl flex items-start gap-3 shadow-2xl border ${borders[type] || borders.info}`}>
        {icons[type] || icons.info}
        <div className="flex-1 text-sm text-stone-200 leading-snug">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-200 p-0.5 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
