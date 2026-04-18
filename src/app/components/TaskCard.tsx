import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '../components/ui/utils';
import { StatusBadge, StatusBadgeVariant } from './StatusBadge';
import { Calendar, Clock } from 'lucide-react';

interface TaskCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  subject: string;
  subjectColor: string;
  dueDate: string;
  dueTime?: string;
  status: StatusBadgeVariant;
  statusText: string;
  onClick?: () => void;
  actions?: ReactNode;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ 
    className, 
    title, 
    description, 
    subject, 
    subjectColor,
    dueDate, 
    dueTime,
    status, 
    statusText,
    onClick,
    actions,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-2xl p-4 border border-[var(--neutral-200)] transition-all',
          'hover:shadow-md hover:border-[var(--neutral-300)]',
          onClick && 'cursor-pointer active:scale-[0.99]',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Border indicator */}
        <div 
          className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full" 
          style={{ backgroundColor: subjectColor }}
        />
        
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <span className="text-xs font-medium px-2 py-1 rounded-md inline-block w-fit" style={{ 
                backgroundColor: `${subjectColor}15`,
                color: subjectColor
              }}>
                {subject}
              </span>
              <h4 className="font-semibold text-[var(--neutral-900)] leading-snug">{title}</h4>
            </div>
            <StatusBadge variant={status}>{statusText}</StatusBadge>
          </div>
          
          {/* Description */}
          {description && (
            <p className="text-sm text-[var(--neutral-600)] line-clamp-2">{description}</p>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--neutral-100)]">
            <div className="flex items-center gap-3 text-xs text-[var(--neutral-500)]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dueDate}</span>
              </div>
              {dueTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{dueTime}</span>
                </div>
              )}
            </div>
            {actions}
          </div>
        </div>
      </div>
    );
  }
);

TaskCard.displayName = 'TaskCard';

export { TaskCard };
