import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../components/ui/utils';
import { motion, AnimatePresence } from 'motion/react';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Array<{
    id: string;
    color: string;
    type: 'student' | 'teacher';
  }>;
}

interface MobileCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

interface PanInfo {
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

export function MobileCalendar({ selectedDate, onDateSelect }: MobileCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: CalendarDay[] = [];
    
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        tasks: [],
      });
    }
    
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        i === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();
      
      const tasks = [];
      if (i === 15 || i === 20 || i === 25) {
        tasks.push({ id: '1', color: 'var(--student-primary)', type: 'student' as const });
      }
      if (i === 18 || i === 22) {
        tasks.push({ id: '2', color: 'var(--teacher-primary)', type: 'teacher' as const });
      }
      if (i === 20) {
        tasks.push({ id: '3', color: 'var(--accent)', type: 'student' as const });
      }
      
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday,
        tasks,
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        tasks: [],
      });
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentMonth);
  
  const previousMonth = () => {
    setDirection(-1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setDirection(1);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      previousMonth();
    } else if (info.offset.x < -swipeThreshold) {
      nextMonth();
    }
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };
  
  return (
    <div className="bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-[var(--neutral-900)]">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <p className="text-xs text-[var(--neutral-500)] mt-0.5">
            {days.filter(d => d.isCurrentMonth && d.tasks.length > 0).length} tarefas este mês
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--neutral-600)]" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors"
            aria-label="Próximo mês"
          >
            <ChevronRight className="w-5 h-5 text-[var(--neutral-600)]" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-[var(--neutral-500)] py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentMonth.toISOString()}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="grid grid-cols-7 gap-1 cursor-grab active:cursor-grabbing"
          >
            {days.map((day, index) => {
              const isSelected = selectedDate && 
                day.date === selectedDate.getDate() &&
                currentMonth.getMonth() === selectedDate.getMonth() &&
                day.isCurrentMonth;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (day.isCurrentMonth && onDateSelect) {
                      onDateSelect(new Date(
                        currentMonth.getFullYear(), 
                        currentMonth.getMonth(), 
                        day.date
                      ));
                    }
                  }}
                  disabled={!day.isCurrentMonth}
                  className={cn(
                    'relative aspect-square rounded-xl p-1 transition-all',
                    'flex flex-col items-center justify-between',
                    'min-h-[48px]',
                    day.isCurrentMonth 
                      ? 'hover:bg-[var(--neutral-100)] cursor-pointer' 
                      : 'opacity-30 cursor-default',
                    day.isToday && 'ring-2 ring-[var(--student-primary)] ring-inset',
                    isSelected && 'bg-[var(--student-primary)] text-white hover:bg-[var(--student-primary)]'
                  )}
                >
                  <span className={cn(
                    'text-sm font-medium',
                    !day.isCurrentMonth && 'text-[var(--neutral-400)]',
                    day.isCurrentMonth && !isSelected && 'text-[var(--neutral-900)]',
                    isSelected && 'text-white'
                  )}>
                    {day.date}
                  </span>
                  
                  {day.tasks.length > 0 && (
                    <div className="flex gap-0.5 mt-auto">
                      {day.tasks.slice(0, 3).map((task, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: isSelected ? 'white' : task.color }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[var(--neutral-200)]">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--student-primary)' }} />
          <span className="text-[var(--neutral-600)]">Aluno</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--teacher-primary)' }} />
          <span className="text-[var(--neutral-600)]">Professor</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="text-[var(--neutral-600)]">Negociação</span>
        </div>
      </div>
    </div>
  );
}
