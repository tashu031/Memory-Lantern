import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 active:scale-[0.98] select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:brightness-105 border border-amber-300/30',
    secondary:
      'bg-stone-900/80 text-amber-100 border border-amber-500/30 hover:border-amber-400/60 hover:bg-stone-800/80 hover:text-white shadow-md shadow-black/40',
    marigold:
      'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 text-white font-medium shadow-lg shadow-orange-600/25 hover:shadow-orange-500/40 hover:brightness-110 border border-orange-400/30',
    ghost:
      'bg-transparent text-amber-200/80 hover:text-amber-100 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20',
    danger:
      'bg-red-950/60 text-red-200 border border-red-800/40 hover:bg-red-900/60 hover:border-red-700/60 shadow-md',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-xl',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : Icon ? (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      ) : null}
      {children}
    </button>
  );
}
