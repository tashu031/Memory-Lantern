import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Sparkles, Flower2, Heart, ArrowRight, CheckCircle2, AlertCircle, Calendar, Music, Utensils, Star, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../components/Button';
import { saveMemory } from '../utils/storage';
import { playChime } from '../utils/sound';

const PRESET_RELATIONSHIPS = [
  'Grandmother',
  'Grandfather',
  'Mother',
  'Father',
  'Partner / Spouse',
  'Sibling',
  'Beloved Friend',
  'Mentor / Teacher',
  'Beloved Pet',
];

export default function CreateMemoryPage({ onShowToast }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    relationship: 'Grandmother',
    customRelationship: '',
    description: '',
    favorite_memories: '',
    favorite_food: '',
    favorite_music: '',
    special_qualities: '',
    date_or_occasion: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedMemory, setSavedMemory] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide the name of the person or pet you are honoring.';
    }
    const finalRel = formData.relationship === 'Other' ? formData.customRelationship : formData.relationship;
    if (!finalRel || !finalRel.trim()) {
      errs.relationship = 'Please select or enter your relationship.';
    }
    if (!formData.description.trim() && !formData.favorite_memories.trim()) {
      errs.description = 'Please share at least a short description or a favorite memory.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRelationshipSelect = (rel) => {
    setFormData((prev) => ({
      ...prev,
      relationship: rel,
      customRelationship: rel === 'Other' ? prev.customRelationship : '',
    }));
    if (errors.relationship) {
      setErrors((prev) => ({ ...prev, relationship: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const finalRelationship =
        formData.relationship === 'Other'
          ? formData.customRelationship.trim()
          : formData.relationship;

      const memoryToSave = {
        name: formData.name.trim(),
        relationship: finalRelationship,
        description: formData.description.trim(),
        favorite_memories: formData.favorite_memories.trim(),
        favorite_food: formData.favorite_food.trim(),
        favorite_music: formData.favorite_music.trim(),
        special_qualities: formData.special_qualities.trim(),
        date_or_occasion: formData.date_or_occasion.trim(),
      };

      const result = saveMemory(memoryToSave);
      setSavedMemory(result);
      playChime(659.25);

      // Warm amber & gold confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#FBBF24', '#EA580C', '#FEF08A'],
        });
      } catch (err) {
        // Ignore if confetti fails
      }

      if (onShowToast) {
        onShowToast(`Memory for ${result.name} has been planted in your garden.`, 'success');
      }
    } catch (err) {
      if (onShowToast) {
        onShowToast('Failed to save memory to LocalStorage.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSavedMemory(null);
    setFormData({
      name: '',
      relationship: 'Grandmother',
      customRelationship: '',
      description: '',
      favorite_memories: '',
      favorite_food: '',
      favorite_music: '',
      special_qualities: '',
      date_or_occasion: '',
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5" />
          <span>Private Remembrance Journal</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 tracking-tight">
          Plant a Cherished Memory
        </h1>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Record their stories, tastes, melodies, and quirks. These details will live forever in your
          private browser garden and guide the Gemma AI in crafting deeply meaningful tributes.
        </p>
      </div>

      {/* Success State View */}
      {savedMemory ? (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/30 text-center space-y-8 animate-in fade-in duration-300 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 mx-auto shadow-xl shadow-amber-500/30">
            <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-amber-100">
              Memory Preserved for {savedMemory.name}
            </h2>
            <p className="font-serif italic text-amber-200/90 text-lg">
              "Their lantern now burns softly in your garden."
            </p>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              Your memory is saved securely in your browser's LocalStorage. You can generate a personalized AI tribute letter, explore your garden, or plant another memory.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to={`/tribute?id=${savedMemory.id}`}>
              <Button variant="primary" size="lg" icon={Sparkles} className="w-full sm:w-auto">
                Generate AI Tribute Now
              </Button>
            </Link>

            <Link to="/garden">
              <Button variant="secondary" size="lg" icon={Flower2} className="w-full sm:w-auto">
                View in Memory Garden
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="md"
              onClick={handleResetForm}
              className="w-full sm:w-auto text-stone-400"
            >
              Plant Another Memory
            </Button>
          </div>
        </div>
      ) : (
        /* Form View */
        <form
          onSubmit={handleSubmit}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-2xl space-y-8"
        >
          {/* Section 1: Honoree Details */}
          <div className="space-y-6">
            <div className="border-b border-amber-500/15 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif text-xl font-bold text-amber-100">1. Who are you honoring?</h3>
              </div>
              <span className="text-[11px] font-mono text-stone-400">* Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
                  Full Name or Loving Nickname *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Abuelita Elena or Arthur Pendelton"
                  className={`w-full px-4 py-3 rounded-2xl bg-stone-950/70 border text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                    errors.name ? 'border-rose-500/80' : 'border-stone-800 focus:border-amber-500/50'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Date or Occasion */}
              <div className="space-y-2">
                <label htmlFor="date_or_occasion" className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
                  Important Date or Dedication (Optional)
                </label>
                <div className="relative">
                  <input
                    id="date_or_occasion"
                    type="text"
                    name="date_or_occasion"
                    value={formData.date_or_occasion}
                    onChange={handleChange}
                    placeholder="e.g. Día de los Muertos, 1942–2023, Sunday Morning"
                    className="w-full px-4 py-3 rounded-2xl bg-stone-950/70 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                  />
                  <Calendar className="w-4 h-4 text-stone-500 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Relationship Chips */}
            <div className="space-y-3">
              <label className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
                Relationship *
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_RELATIONSHIPS.map((rel) => {
                  const isSelected = formData.relationship === rel;
                  return (
                    <button
                      type="button"
                      key={rel}
                      onClick={() => handleRelationshipSelect(rel)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20 border border-amber-400'
                          : 'bg-stone-950/60 text-stone-300 border border-stone-800 hover:border-amber-500/30 hover:text-amber-200'
                      }`}
                    >
                      {rel}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => handleRelationshipSelect('Other')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    formData.relationship === 'Other'
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20 border border-amber-400'
                      : 'bg-stone-950/60 text-stone-300 border border-stone-800 hover:border-amber-500/30'
                  }`}
                >
                  Custom...
                </button>
              </div>

              {formData.relationship === 'Other' && (
                <div className="pt-2">
                  <input
                    type="text"
                    name="customRelationship"
                    value={formData.customRelationship}
                    onChange={handleChange}
                    placeholder="Specify relationship (e.g. Favorite Aunt, Childhood Neighbor)"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Their Life & Memories */}
          <div className="space-y-6 pt-4 border-t border-amber-500/15">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif text-xl font-bold text-amber-100">2. Life & Cherished Stories</h3>
            </div>

            {/* Short description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
                Short Description or Essence
              </label>
              <input
                id="description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. A warm soul who loved tending to her marigolds and hosting family dinners."
                className={`w-full px-4 py-3 rounded-2xl bg-stone-950/70 border text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                  errors.description ? 'border-rose-500/80' : 'border-stone-800 focus:border-amber-500/50'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            {/* Favorite Memories */}
            <div className="space-y-2">
              <label htmlFor="favorite_memories" className="block text-xs font-medium text-amber-200 uppercase tracking-wider">
                Favorite Memories & Moments That Bring a Smile
              </label>
              <textarea
                id="favorite_memories"
                name="favorite_memories"
                rows={4}
                value={formData.favorite_memories}
                onChange={handleChange}
                placeholder="Tell a specific story: What did they do on Sunday mornings? What was a memorable trip or holiday? What funny or touching moment stays with you?"
                className="w-full px-4 py-3 rounded-2xl bg-stone-950/70 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Section 3: The Little Things (Food, Music, Qualities) */}
          <div className="space-y-6 pt-4 border-t border-amber-500/15">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif text-xl font-bold text-amber-100">3. The Little Things</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Food */}
              <div className="space-y-2">
                <label htmlFor="favorite_food" className="block text-xs font-medium text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>Favorite Food & Treats</span>
                </label>
                <input
                  id="favorite_food"
                  type="text"
                  name="favorite_food"
                  value={formData.favorite_food}
                  onChange={handleChange}
                  placeholder="e.g. Conchas, blackberry pie, black coffee"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-950/70 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>

              {/* Music */}
              <div className="space-y-2">
                <label htmlFor="favorite_music" className="block text-xs font-medium text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-amber-400" />
                  <span>Favorite Music & Songs</span>
                </label>
                <input
                  id="favorite_music"
                  type="text"
                  name="favorite_music"
                  value={formData.favorite_music}
                  onChange={handleChange}
                  placeholder="e.g. Classic boleros, jazz trumpet, acoustic guitar"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-950/70 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>

              {/* Qualities */}
              <div className="space-y-2">
                <label htmlFor="special_qualities" className="block text-xs font-medium text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>Special Qualities & Wisdom</span>
                </label>
                <input
                  id="special_qualities"
                  type="text"
                  name="special_qualities"
                  value={formData.special_qualities}
                  onChange={handleChange}
                  placeholder="e.g. Unflappable patience, infectious laughter"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-950/70 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit Button & Actions */}
          <div className="pt-6 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-400 flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Memories are stored locally in your browser.</span>
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/garden')}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                icon={Flame}
                className="w-full sm:w-auto"
              >
                Plant Memory
              </Button>
            </div>
          </div>
        </form>
      )}

    </div>
  );
}
