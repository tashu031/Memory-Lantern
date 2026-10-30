import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Flame, Search, PlusCircle, Sparkles, Filter, Heart, Eye, Edit3, Trash2, Calendar, Utensils, Music, Star, X } from 'lucide-react';
import MemoryCard from '../components/MemoryCard';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { getMemories, deleteMemory, toggleCandle, updateMemory } from '../utils/storage';
import { playChime } from '../utils/sound';

export default function MemoryGardenPage({ onShowToast }) {
  const [memories, setMemories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [litOnly, setLitOnly] = useState(false);

  // Modals state
  const [viewingMemory, setViewingMemory] = useState(null);
  const [editingMemory, setEditingMemory] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Edit form state
  const [editForm, setEditForm] = useState({});

  const refreshMemories = () => {
    const list = getMemories();
    setMemories(list);
  };

  useEffect(() => {
    refreshMemories();
  }, []);

  const handleToggleCandle = (id) => {
    const updated = toggleCandle(id);
    if (updated) {
      refreshMemories();
      if (viewingMemory && viewingMemory.id === id) {
        setViewingMemory(updated);
      }
      if (onShowToast) {
        onShowToast(
          updated.isCandleLit
            ? `Candle lit in remembrance of ${updated.name}.`
            : `Candle extinguished for ${updated.name}.`,
          'info'
        );
      }
    }
  };

  const handleOpenEdit = (memory) => {
    setEditingMemory(memory);
    setEditForm({ ...memory });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.name?.trim()) {
      if (onShowToast) onShowToast('Name cannot be empty.', 'error');
      return;
    }
    try {
      updateMemory(editingMemory.id, editForm);
      refreshMemories();
      setEditingMemory(null);
      if (onShowToast) onShowToast('Memory updated successfully.', 'success');
    } catch (err) {
      if (onShowToast) onShowToast('Failed to update memory.', 'error');
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    deleteMemory(deletingId);
    refreshMemories();
    setDeletingId(null);
    if (onShowToast) onShowToast('Memory removed from garden.', 'info');
  };

  // Filter memories
  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.relationship?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.favorite_memories?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.favorite_food?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.favorite_music?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'ALL' || m.relationship === selectedFilter;
    const matchesLit = !litOnly || m.isCandleLit;

    return matchesSearch && matchesFilter && matchesLit;
  });

  const totalLitCandles = memories.filter((m) => m.isCandleLit).length;
  const totalTributesCount = memories.reduce((acc, m) => acc + (m.tributes?.length || 0), 0);

  // Distinct relationships for filter
  const relationships = Array.from(new Set(memories.map((m) => m.relationship).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Garden Header & Stats Banner */}
      <div className="space-y-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Flower2 className="w-3.5 h-3.5" />
            <span>Sacred Remembrance Space</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 tracking-tight">
            The Memory Garden
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            A peaceful sanctuary where every memory blossoms like an eternal flower.
            Light a candle, revisit stories, or compose tribute letters.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="glass-panel p-4 rounded-2xl text-center border border-amber-500/15">
            <div className="text-2xl font-serif font-bold text-amber-300">{memories.length}</div>
            <div className="text-xs text-stone-400">Cherished Souls Planted</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center border border-amber-500/15">
            <div className="text-2xl font-serif font-bold text-orange-400 flex items-center justify-center gap-1.5">
              <Flame className="w-5 h-5 animate-flicker text-amber-400" />
              <span>{totalLitCandles}</span>
            </div>
            <div className="text-xs text-stone-400">Candles Burning Softly</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center border border-amber-500/15">
            <div className="text-2xl font-serif font-bold text-yellow-300 flex items-center justify-center gap-1.5">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>{totalTributesCount}</span>
            </div>
            <div className="text-xs text-stone-400">AI Tributes Illuminated</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-amber-500/15 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, story, food, music..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <button
            onClick={() => setLitOnly(!litOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
              litOnly
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:border-amber-500/30'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${litOnly ? 'animate-flicker text-amber-950' : 'text-stone-400'}`} />
            <span>Lit Candles Only</span>
          </button>

          {relationships.length > 0 && (
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer"
            >
              <option value="ALL">All Relationships</option>
              {relationships.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          )}

          <Link to="/create">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Plant Memory
            </Button>
          </Link>
        </div>

      </div>

      {/* Memory Cards Grid */}
      {filteredMemories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((mem) => (
            <MemoryCard
              key={mem.id}
              memory={mem}
              onToggleCandle={handleToggleCandle}
              onView={(m) => setViewingMemory(m)}
              onEdit={(m) => handleOpenEdit(m)}
              onDelete={(id) => setDeletingId(id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-3xl p-12 sm:p-16 text-center space-y-6 border border-dashed border-stone-800 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
            <Flower2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-amber-100">
              {searchQuery || litOnly ? 'No Memories Match Your Filter' : 'Your Memory Garden is Quiet'}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm mx-auto">
              {searchQuery || litOnly
                ? 'Try clearing your search terms or filters to reveal all planted memories.'
                : 'Preserve the first story of a loved one, parent, grandparent, or dear companion.'}
            </p>
          </div>

          <div>
            {searchQuery || litOnly ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('ALL');
                  setLitOnly(false);
                }}
              >
                Clear All Filters
              </Button>
            ) : (
              <Link to="/create">
                <Button variant="primary" size="md" icon={PlusCircle}>
                  Plant First Memory
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* VIEW MEMORY DETAIL MODAL */}
      <Modal
        isOpen={!!viewingMemory}
        onClose={() => setViewingMemory(null)}
        title={viewingMemory?.name}
        subtitle={`${viewingMemory?.relationship} • Preserved in your private garden`}
      >
        {viewingMemory && (
          <div className="space-y-6 text-stone-200">
            {/* Candle Bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-950/70 border border-amber-500/20">
              <div className="flex items-center gap-3">
                <Flame className={`w-6 h-6 ${viewingMemory.isCandleLit ? 'text-amber-400 animate-flicker' : 'text-stone-500'}`} />
                <div>
                  <div className="font-medium text-sm text-amber-100">
                    {viewingMemory.isCandleLit ? 'A candle is burning in their honor' : 'No candle lit currently'}
                  </div>
                  <div className="text-xs text-stone-400">
                    {viewingMemory.date_or_occasion || 'Every memory keeps their spirit shining'}
                  </div>
                </div>
              </div>

              <Button
                variant={viewingMemory.isCandleLit ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleToggleCandle(viewingMemory.id)}
                icon={Flame}
              >
                {viewingMemory.isCandleLit ? 'Candle Lit' : 'Light Candle'}
              </Button>
            </div>

            {/* Description & Stories */}
            {viewingMemory.description && (
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">About Them</h4>
                <p className="text-sm text-stone-200 leading-relaxed">{viewingMemory.description}</p>
              </div>
            )}

            {viewingMemory.favorite_memories && (
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">Cherished Memories</h4>
                <div className="p-4 rounded-2xl bg-stone-950/50 border border-amber-500/15 font-serif italic text-sm text-amber-100 leading-relaxed">
                  "{viewingMemory.favorite_memories}"
                </div>
              </div>
            )}

            {/* The Little Things */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {viewingMemory.favorite_food && (
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <Utensils className="w-3.5 h-3.5" />
                    <span className="font-mono uppercase text-[10px]">Favorite Food</span>
                  </div>
                  <div className="text-xs text-stone-200 font-medium">{viewingMemory.favorite_food}</div>
                </div>
              )}

              {viewingMemory.favorite_music && (
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <Music className="w-3.5 h-3.5" />
                    <span className="font-mono uppercase text-[10px]">Favorite Music</span>
                  </div>
                  <div className="text-xs text-stone-200 font-medium">{viewingMemory.favorite_music}</div>
                </div>
              )}

              {viewingMemory.special_qualities && (
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <Star className="w-3.5 h-3.5" />
                    <span className="font-mono uppercase text-[10px]">Special Qualities</span>
                  </div>
                  <div className="text-xs text-stone-200 font-medium">{viewingMemory.special_qualities}</div>
                </div>
              )}
            </div>

            {/* Saved Tributes */}
            {viewingMemory.tributes && viewingMemory.tributes.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Illuminated Tributes ({viewingMemory.tributes.length})
                </h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {viewingMemory.tributes.map((trib, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                        <span className="text-amber-300 capitalize">{trib.style} {trib.type}</span>
                        <span>{new Date(trib.date).toLocaleDateString()}</span>
                      </div>
                      <p className="font-serif text-sm text-stone-200 whitespace-pre-line leading-relaxed italic">
                        {trib.tribute}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewingMemory(null)}
              >
                Close
              </Button>

              <Link to={`/tribute?id=${viewingMemory.id}`}>
                <Button variant="primary" size="sm" icon={Sparkles}>
                  Generate New AI Tribute
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Modal>

      {/* EDIT MEMORY MODAL */}
      <Modal
        isOpen={!!editingMemory}
        onClose={() => setEditingMemory(null)}
        title={`Edit Memory: ${editingMemory?.name}`}
        subtitle="Update stories and details in your private journal"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-amber-200 font-mono uppercase">Name *</label>
              <input
                type="text"
                value={editForm.name || ''}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-amber-200 font-mono uppercase">Relationship *</label>
              <input
                type="text"
                value={editForm.relationship || ''}
                onChange={(e) => setEditForm({ ...editForm, relationship: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-amber-200 font-mono uppercase">Short Description</label>
            <input
              type="text"
              value={editForm.description || ''}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-amber-200 font-mono uppercase">Favorite Memories & Stories</label>
            <textarea
              rows={3}
              value={editForm.favorite_memories || ''}
              onChange={(e) => setEditForm({ ...editForm, favorite_memories: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-amber-200 font-mono uppercase">Favorite Food</label>
              <input
                type="text"
                value={editForm.favorite_food || ''}
                onChange={(e) => setEditForm({ ...editForm, favorite_food: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-100 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-amber-200 font-mono uppercase">Favorite Music</label>
              <input
                type="text"
                value={editForm.favorite_music || ''}
                onChange={(e) => setEditForm({ ...editForm, favorite_music: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-100 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-amber-200 font-mono uppercase">Special Qualities</label>
              <input
                type="text"
                value={editForm.special_qualities || ''}
                onChange={(e) => setEditForm({ ...editForm, special_qualities: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-100 text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/15 flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setEditingMemory(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Remove Memory from Garden?"
        subtitle="This action will delete this entry and its saved tributes from your browser storage."
        maxWidth="max-w-md"
      >
        <div className="space-y-4 pt-2">
          <p className="text-sm text-stone-300 leading-relaxed">
            Are you sure you want to remove this memory? This cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
              Keep Memory
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete} icon={Trash2}>
              Delete Memory
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
