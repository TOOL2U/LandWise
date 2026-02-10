import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest';
  
  const variants = {
    primary: 'bg-clay hover:bg-[#B5684F] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-forest hover:bg-[#254040] text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-forest text-forest hover:bg-forest hover:text-white',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
