import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Terminal, Cpu } from 'lucide-react';
import { checkBackendHealth } from '../services/api';

export default function ModelStatusBadge({ onModelSelect, selectedModel }) {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const data = await checkBackendHealth();
      setHealth(data);
    } catch (err) {
      setHealth({
        status: 'error',
        ollama_connected: false,
        active_model: 'gemma3:1b',
        installed_models: [],
        message: 'Could not contact backend server.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    // Poll every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const isConnected = health && health.ollama_connected;
  const currentModel = selectedModel || health?.active_model || 'gemma3:1b';
  const isModelReady = health?.model_ready || (health?.installed_models || []).includes(currentModel);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-stone-900/90 border border-amber-500/25 hover:border-amber-400/60 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-amber-500/10"
        title="Click to view local Gemma AI & Ollama status"
      >
        <span className="relative flex h-2 w-2">
          {isConnected && isModelReady ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          ) : isConnected ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          )}
        </span>

        <span className="text-amber-200/90 font-mono tracking-tight flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-amber-400" />
          <span>{currentModel}</span>
        </span>

        <span className="hidden sm:inline text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20">
          {isConnected && isModelReady ? 'Ready' : isConnected ? 'Ollama Online' : 'Offline'}
        </span>
      </button>

      {/* Info & Setup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 border border-amber-500/30 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-amber-100">Local AI Engine Status</h3>
                  <p className="text-xs text-stone-400">Google Gemma open-weight model via Ollama</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-stone-400 hover:text-stone-100 text-xl font-bold p-1 cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Status overview cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-950/60 border border-amber-500/15">
                <div className="flex items-center gap-3 text-sm">
                  {health?.status === 'ok' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  )}
                  <div>
                    <div className="font-medium text-stone-200">FastAPI Backend</div>
                    <div className="text-xs text-stone-400">http://127.0.0.1:8000</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  {health?.status === 'ok' ? 'Connected' : 'Degraded'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-950/60 border border-amber-500/15">
                <div className="flex items-center gap-3 text-sm">
                  {isConnected ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <div>
                    <div className="font-medium text-stone-200">Ollama Local API</div>
                    <div className="text-xs text-stone-400">{health?.ollama_url || 'http://localhost:11434'}</div>
                  </div>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${isConnected ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>

            {/* Installed models selector */}
            {health?.installed_models && health.installed_models.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-amber-200 uppercase tracking-wider">
                  Available Local Models (Click to switch):
                </label>
                <div className="flex flex-wrap gap-2">
                  {health.installed_models.map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => {
                        if (onModelSelect) onModelSelect(mod);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                        currentModel === mod
                          ? 'bg-amber-500 text-stone-950 font-semibold border-amber-400 shadow-md shadow-amber-500/20'
                          : 'bg-stone-900/80 text-amber-200 border-amber-500/20 hover:border-amber-400/50'
                      }`}
                    >
                      {mod} {currentModel === mod ? '✓ (Active)' : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Setup instructions banner if needed */}
            {(!isConnected || !isModelReady) && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                  <Terminal className="w-4 h-4" />
                  <span>Setup Guide for Gemma AI with Ollama</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Memory Lantern uses 100% private, local inference via Ollama. If you haven't pulled your desired model yet, run:
                </p>
                <div className="p-2.5 rounded-lg bg-black/70 font-mono text-xs text-amber-300 select-all border border-amber-500/20">
                  ollama pull gemma3:1b
                </div>
                <p className="text-[11px] text-stone-400">
                  Or pull any other Gemma version such as <code className="text-amber-200">ollama pull gemma2:2b</code>.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-amber-500/15">
              <button
                onClick={fetchHealth}
                disabled={loading}
                className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Recheck Connection</span>
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
