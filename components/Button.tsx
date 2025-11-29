import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-secondary hover:shadow-lg hover:shadow-brand-primary/25 focus:ring-brand-primary border border-transparent dark:focus:ring-offset-slate-900",
    secondary: "bg-brand-dark text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 focus:ring-slate-500 border border-transparent dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-900",
    outline: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-light dark:hover:bg-brand-primary/10 focus:ring-brand-primary dark:focus:ring-offset-slate-900",
    ghost: "bg-transparent text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-500 dark:focus:ring-offset-slate-900",
    white: "bg-white text-brand-dark hover:bg-slate-50 hover:shadow-lg focus:ring-white border border-transparent dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:border-slate-700"
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;