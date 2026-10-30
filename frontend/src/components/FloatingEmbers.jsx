import React, { useMemo } from 'react';

export default function FloatingEmbers() {
  // Generate random static points for floating embers
  const embers = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.7 + 7) % 96}%`,
      bottom: `${(i * 7 + 10) % 90}%`,
      size: `${Math.max(2, (i % 4) + 2)}px`,
      delay: `${(i * 0.7) % 5}s`,
      duration: `${6 + (i % 6)}s`,
      opacity: 0.2 + ((i % 5) * 0.12),
      color: i % 3 === 0 ? '#F59E0B' : i % 3 === 1 ? '#FB923C' : '#FDE68A',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {embers.map((ember) => (
        <span
          key={ember.id}
          className="absolute rounded-full"
          style={{
            left: ember.left,
            bottom: ember.bottom,
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 8px 2px ${ember.color}`,
            opacity: ember.opacity,
            animation: `ember-rise ${ember.duration} infinite ease-in-out`,
            animationDelay: ember.delay,
          }}
        />
      ))}
    </div>
  );
}
