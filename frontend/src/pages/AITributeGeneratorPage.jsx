import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Flame, Copy, Check, Save, RotateCw, Download, AlertTriangle, BookOpen, Heart, Terminal, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { getMemories, saveTributeToMemory } from '../utils/storage';
import { generateAITribute, checkBackendHealth } from '../services/api';
import { playChime } from '../utils/sound';

const TRIBUTE_TYPES = [
  { id: 'letter', label: 'Remembrance Letter', desc: 'Heartfelt letter addressed to or honoring them' },
  { id: 'tribute', label: 'Eulogy / Tribute Speech', desc: 'Poignant celebration of life & character' },
  { id: 'quotes', label: 'Memory Quotes', desc: '4-5 poetic reflections inspired by their life' },
  { id: 'message', label: 'Ofrenda Blessing', desc: 'Gentle blessing beside a glowing candle' },
];

const WRITING_STYLES = [
  { id: 'Heartfelt', label: 'Heartfelt', desc: 'Deeply tender, warm, and loving' },
  { id: 'Poetic', label: 'Poetic', desc: 'Lyrical imagery of light and memory' },
  { id: 'Simple and Personal', label: 'Simple & Personal', desc: 'Direct, authentic, conversational' },
  { id: 'Nostalgic', label: 'Nostalgic', desc: 'Reflective sensory moments of the past' },
];

export default function AITributeGeneratorPage({ onShowToast, selectedModel, onModelSelect }) {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('id');

  const [memories, setMemories] = useState([]);
  const [selectedMemoryId, setSelectedMemoryId] = useState(preselectedId || '');
  const [tributeType, setTributeType] = useState('letter');
  const [writingStyle, setWritingStyle] = useState('Heartfelt');

  // Editable fields for generation
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [description, setDescription] = useState('');
  const [favoriteMemories, setFavoriteMemories] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [favoriteMusic, setFavoriteMusic] = useState('');
  const [specialQualities, setSpecialQualities] = useState('');
  const [dateOrOccasion, setDateOrOccasion] = useState('');

  // AI Generation State
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTribute, setGeneratedTribute] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [backendHealth, setBackendHealth] = useState(null);

  // Load memories from LocalStorage
  useEffect(() => {
    const list = getMemories();
    setMemories(list);
    checkBackendHealth().then((h) => setBackendHealth(h));
  }, []);

  // When selection changes or initially loads
  useEffect(() => {
    if (selectedMemoryId) {
      const mem = memories.find((m) => m.id === selectedMemoryId);
      if (mem) {
        setName(mem.name || '');
        setRelationship(mem.relationship || '');
        setDescription(mem.description || '');
        setFavoriteMemories(mem.favorite_memories || '');
        setFavoriteFood(mem.favorite_food || '');
        setFavoriteMusic(mem.favorite_music || '');
        setSpecialQualities(mem.special_qualities || '');
        setDateOrOccasion(mem.date_or_occasion || '');
      }
    }
  }, [selectedMemoryId, memories]);

  const handleGenerate = async () => {
    if (!name.trim()) {
      if (onShowToast) onShowToast('Please specify the name of the person being honored.', 'error');
      return;
    }

    setIsLoading(true);
    setErrorDetails(null);
    setCopied(false);
    setSaved(false);

    try {
      const activeModel = selectedModel || backendHealth?.active_model || 'gemma3:1b';
      const payload = {
        name: name.trim(),
        relationship: relationship.trim() || 'Loved One',
        description: description.trim() || undefined,
        favorite_memories: favoriteMemories.trim() || undefined,
        favorite_food: favoriteFood.trim() || undefined,
        favorite_music: favoriteMusic.trim() || undefined,
        special_qualities: specialQualities.trim() || undefined,
        date_or_occasion: dateOrOccasion.trim() || undefined,
        style: writingStyle,
        tribute_type: tributeType,
        model: activeModel,
      };

      const result = await generateAITribute(payload);
      setGeneratedTribute(result);
      playChime(528);

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F59E0B', '#FBBF24', '#EA580C'],
        });
      } catch (e) {
        // Ignore
      }

      if (onShowToast) {
        onShowToast('Tribute generated successfully with Google Gemma AI.', 'success');
      }
    } catch (err) {
      console.error('Tribute generation failed:', err);
      setErrorDetails({
        message: err.message || 'Failed to connect to Gemma via Ollama.',
        status: err.status,
        data: err.data,
      });
      if (onShowToast) {
        onShowToast(err.message || 'AI service error.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedTribute?.tribute) return;
    try {
      await navigator.clipboard.writeText(generatedTribute.tribute);
      setCopied(true);
      if (onShowToast) onShowToast('Tribute copied to clipboard.', 'success');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      if (onShowToast) onShowToast('Failed to copy to clipboard.', 'error');
    }
  };

  const handleSaveToMemory = () => {
    if (!generatedTribute || !selectedMemoryId) {
      if (onShowToast) onShowToast('Select a saved memory first to attach this tribute.', 'info');
      return;
    }
    const savedObj = saveTributeToMemory(selectedMemoryId, {
      tribute: generatedTribute.tribute,
      type: generatedTribute.tribute_type,
      style: generatedTribute.style,
      model: generatedTribute.model,
    });
    if (savedObj) {
      setSaved(true);
      playChime(659.25);
      if (onShowToast) onShowToast('Tribute permanently saved to this memory card!', 'success');
    }
  };

  const handleDownload = () => {
    if (!generatedTribute?.tribute) return;
    const blob = new Blob([generatedTribute.tribute], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Memory_Lantern_Tribute_${name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Page Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Local Open-Source Gemma AI</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 tracking-tight">
          AI Tribute Generator
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Transform your cherished memories into heartfelt letters, eulogies, or poetic reflections.
          Our model is strictly instructed to honor only the genuine details you provide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Memory Selector & Configuration (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl space-y-6">
          
          {/* Select Existing Memory or Manual */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
              Choose a Saved Memory
            </label>
            <select
              value={selectedMemoryId}
              onChange={(e) => setSelectedMemoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-950/80 border border-amber-500/25 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm cursor-pointer"
            >
              <option value="">— Write Ad-Hoc / Custom Memory —</option>
              {memories.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.relationship})
                </option>
              ))}
            </select>
          </div>

          {/* Quick info if selected */}
          <div className="space-y-4 pt-2 border-t border-amber-500/15">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-amber-300 uppercase">Honoree Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Abuelita Elena"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-amber-300 uppercase">Relationship</label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Grandmother, Father, Best Friend"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-amber-300 uppercase">Key Story or Memories</label>
              <textarea
                rows={3}
                value={favoriteMemories || description}
                onChange={(e) => setFavoriteMemories(e.target.value)}
                placeholder="Share a specific story or what you loved doing together..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-100 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            {/* Little Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-amber-300/80 uppercase">Favorite Food</label>
                <input
                  type="text"
                  value={favoriteFood}
                  onChange={(e) => setFavoriteFood(e.target.value)}
                  placeholder="e.g. Conchas"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-100 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-amber-300/80 uppercase">Favorite Music</label>
                <input
                  type="text"
                  value={favoriteMusic}
                  onChange={(e) => setFavoriteMusic(e.target.value)}
                  placeholder="e.g. Boleros"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-100 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Tribute Type Selection */}
          <div className="space-y-2 pt-2 border-t border-amber-500/15">
            <label className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
              Tribute Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TRIBUTE_TYPES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTributeType(t.id)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                    tributeType === t.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-md shadow-amber-500/15'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-amber-500/30 hover:text-stone-200'
                  }`}
                >
                  <div className="font-serif text-xs font-bold text-amber-200">{t.label}</div>
                  <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Writing Style Selection */}
          <div className="space-y-2 pt-2 border-t border-amber-500/15">
            <label className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
              Writing Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {WRITING_STYLES.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setWritingStyle(s.id)}
                  className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer border ${
                    writingStyle === s.id
                      ? 'bg-amber-500 text-stone-950 font-semibold border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-amber-500/30'
                  }`}
                >
                  <div className="text-xs font-medium">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-4">
            <Button
              type="button"
              variant="primary"
              size="lg"
              loading={isLoading}
              onClick={handleGenerate}
              icon={Sparkles}
              className="w-full"
            >
              Generate Tribute with Gemma
            </Button>
          </div>

        </div>

        {/* Right Column: Output / Tribute Display (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Loading State */}
          {isLoading && (
            <div className="glass-panel rounded-3xl p-12 border border-amber-500/30 text-center animate-in fade-in duration-200">
              <LoadingSpinner text={`Synthesizing ${writingStyle.toLowerCase()} tribute for ${name || 'your loved one'} with Google Gemma...`} />
            </div>
          )}

          {/* Error Message Card */}
          {errorDetails && !isLoading && (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/40 bg-stone-950/90 shadow-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-rose-200">Local AI Connection Notice</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {errorDetails.message}
                  </p>
                </div>
              </div>

              {/* Setup Guidance Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-stone-800 space-y-2 font-mono text-xs text-amber-300">
                <div className="flex items-center gap-2 text-stone-400">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>To start Ollama and pull Gemma:</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 select-all border border-amber-500/20">
                  ollama pull gemma3:1b
                </div>
                <div className="text-[11px] text-stone-400">
                  If you already have another model installed (e.g. <code className="text-amber-200">gemma2:2b</code>), you can select it from the top-right model badge!
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <Button variant="secondary" size="sm" onClick={handleGenerate} icon={RotateCw}>
                  Retry Generation
                </Button>
              </div>
            </div>
          )}

          {/* Generated Result Card */}
          {generatedTribute && !isLoading && (
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/35 bg-stone-950/80 shadow-2xl space-y-6 relative animate-in fade-in duration-300">
              
              {/* Top Accent Ribbon */}
              <div className="flex items-center justify-between border-b border-amber-500/15 pb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400 animate-flicker" />
                  <span className="font-serif font-bold text-amber-100 text-lg">
                    In Loving Memory of {generatedTribute.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                    {generatedTribute.style} Style
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-amber-400" />
                    <span>{generatedTribute.model}</span>
                  </span>
                </div>
              </div>

              {/* Tribute Content */}
              <div className="relative py-2">
                <div className="font-serif text-lg sm:text-xl text-stone-100 leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide font-normal">
                  {generatedTribute.tribute}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-6 border-t border-amber-500/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopy}
                    icon={copied ? Check : Copy}
                  >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownload}
                    icon={Download}
                  >
                    Export .txt
                  </Button>

                  {selectedMemoryId && (
                    <Button
                      variant={saved ? 'secondary' : 'marigold'}
                      size="sm"
                      onClick={handleSaveToMemory}
                      icon={saved ? Check : Save}
                    >
                      {saved ? 'Saved to Memory' : 'Save to Garden'}
                    </Button>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerate}
                  icon={RotateCw}
                  className="text-stone-400 hover:text-amber-200"
                >
                  Regenerate
                </Button>
              </div>

            </div>
          )}

          {/* Idle / Blank state when no generation yet */}
          {!generatedTribute && !isLoading && !errorDetails && (
            <div className="glass-panel rounded-3xl p-12 border border-dashed border-stone-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-amber-100">Ready to Illuminate</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                  Select a saved memory or enter details on the left, choose your preferred format and writing style, and click Generate.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
