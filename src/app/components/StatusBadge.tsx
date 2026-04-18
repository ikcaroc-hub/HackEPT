import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../components/ui/utils';

export type StatusBadgeVariant = 'pending' | 'approved' | 'rejected' | 'submitted' | 'overdue';

interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant: StatusBadgeVariant;
}

const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
          {
            'bg-[var(--warning-light)] text-[var(--warning)]': variant === 'pending',
            'bg-[var(--success-light)] text-[var(--success)]': variant === 'approved' || variant === 'submitted',
            'bg-[var(--error-light)] text-[var(--error)]': variant === 'rejected' || variant === 'overdue',
          },
          className
        )}
        {...props}
      >
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          {
            'bg-[var(--warning)]': variant === 'pending',
            'bg-[var(--success)]': variant === 'approved' || variant === 'submitted',
            'bg-[var(--error)]': variant === 'rejected' || variant === 'overdue',
          }
        )} />
        {children}
      </div>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

export { StatusBadge };
