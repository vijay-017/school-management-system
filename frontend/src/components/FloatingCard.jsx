import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const FloatingCard = ({ children, className, delay = 0 }) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 anti-gravity",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default FloatingCard;
