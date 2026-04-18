import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../components/ui/utils';

export type ActionButtonVariant = 'accept' | 'reject' | 'propose' | 'primary' | 'secondary';
export type ActionButtonSize = 'sm' | 'md' | 'lg';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  fullWidth?: boolean;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          
          // Size variants
          {
            'h-[44px] px-4 text-sm': size === 'md',
            'h-[36px] px-3 text-xs': size === 'sm',
            'h-[52px] px-6 text-base': size === 'lg',
          },
          
          // Color variants
          {
            // Accept - Success green
            'bg-[var(--success)] text-white shadow-sm hover:bg-[#059669] active:scale-[0.98] focus-visible:ring-[var(--success)]':
              variant === 'accept' && !disabled,
            
            // Reject - Error red
            'bg-[var(--error)] text-white shadow-sm hover:bg-[#DC2626] active:scale-[0.98] focus-visible:ring-[var(--error)]':
              variant === 'reject' && !disabled,
            
            // Propose - Accent orange
            'bg-[var(--accent)] text-white shadow-sm hover:bg-[#EA580C] active:scale-[0.98] focus-visible:ring-[var(--accent)]':
              variant === 'propose' && !disabled,
            
            // Primary - Student blue
            'bg-[var(--student-primary)] text-white shadow-sm hover:bg-[#004A9C] active:scale-[0.98] focus-visible:ring-[var(--student-primary)]':
              variant === 'primary' && !disabled,
            
            // Secondary - Neutral
            'bg-[var(--neutral-100)] text-[var(--neutral-900)] border border-[var(--neutral-200)] hover:bg-[var(--neutral-200)] active:scale-[0.98] focus-visible:ring-[var(--neutral-400)]':
              variant === 'secondary' && !disabled,
          },
          
          // Full width
          fullWidth && 'w-full',
          
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export { ActionButton };
