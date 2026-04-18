import { Link, useLocation } from 'react-router';
import { Home, Calendar, ListTodo, Users, BarChart3 } from 'lucide-react';
import { cn } from '../components/ui/utils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Calendar, label: 'Calendário', path: '/calendar' },
  { icon: ListTodo, label: 'Tarefas', path: '/tasks' },
  { icon: Users, label: 'Social', path: '/social' },
  { icon: BarChart3, label: 'Stats', path: '/stats' },
];

export function BottomNav() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-[var(--neutral-200)] pb-safe">
      <div className="max-w-screen-sm mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]',
                  'active:scale-95',
                  isActive 
                    ? 'text-[var(--student-primary)] bg-[var(--student-primary-light)]' 
                    : 'text-[var(--neutral-500)] hover:text-[var(--neutral-900)]'
                )}
              >
                <Icon className={cn(
                  'w-5 h-5 transition-transform',
                  isActive && 'scale-110'
                )} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
