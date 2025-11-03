import { ButtonHTMLAttributes, ReactNode } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'cyan' | 'pink' | 'purple' | 'lime';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable neon button component with glowing hover effects
 */
const NeonButton = ({ 
  children, 
  variant = 'cyan', 
  size = 'md',
  className = '',
  ...props 
}: NeonButtonProps) => {
  const variantClasses = {
    cyan: 'border-primary text-primary hover:bg-primary hover:text-background hover:shadow-[0_0_30px_hsl(var(--primary))]',
    pink: 'border-secondary text-secondary hover:bg-secondary hover:text-background hover:shadow-[0_0_30px_hsl(var(--secondary))]',
    purple: 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-background hover:shadow-[0_0_30px_rgb(168,85,247)]',
    lime: 'border-accent text-accent hover:bg-accent hover:text-background hover:shadow-[0_0_30px_hsl(var(--accent))]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`
        relative
        border-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        font-mono
        font-bold
        tracking-wider
        uppercase
        rounded-lg
        transition-all
        duration-300
        ease-in-out
        hover:scale-105
        active:scale-95
        backdrop-blur-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;
