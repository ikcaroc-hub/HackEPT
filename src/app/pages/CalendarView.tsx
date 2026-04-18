import { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { MobileCalendar } from '../components/MobileCalendar';
import { TaskCard } from '../components/TaskCard';
import { ActionButton } from '../components/ActionButton';

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock tasks for selected date
  const tasksForDate = [
    {
      id: '1',
      title: 'Quiz de Álgebra Avançada',
      description: 'Capítulo 4: Equações Quadráticas e Parábolas',
      subject: 'Matemática',
      subjectColor: '#0057BD',
      dueDate: '09 Out',
      dueTime: '09:00',
      status: 'pending' as const,
      statusText: 'Ativo Hoje',
    },
    {
      id: '2',
      title: 'Ensaio de Literatura',
      description: 'Enviar rascunho final da análise "To Kill a Mockingbird"',
      subject: 'Inglês',
      subjectColor: '#6A37D4',
      dueDate: '09 Out',
      dueTime: '11:30',
      status: 'submitted' as const,
      statusText: 'Enviado',
    },
    {
      id: '3',
      title: 'Debate de História Mundial',
      description: 'A Revolução Industrial: Prós e Contras',
      subject: 'História',
      subjectColor: '#F97316',
      dueDate: '09 Out',
      dueTime: '14:00',
      status: 'pending' as const,
      statusText: 'Pendente',
    },
  ];
  
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40">
        <div className="max-w-screen-sm mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--student-primary)] to-[#6E9FFF] flex items-center justify-center text-white font-semibold text-sm">
                AS
              </div>
              <div>
                <h1 className="text-lg font-bold text-[var(--neutral-900)]">Planno</h1>
                <p className="text-xs text-[var(--neutral-500)]">Calendário</p>
              </div>
            </div>
            <button className="relative p-2 rounded-xl hover:bg-[var(--neutral-100)] transition-colors">
              <Bell className="w-5 h-5 text-[var(--neutral-600)]" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-screen-sm mx-auto px-4 py-6 space-y-6">
        {/* Calendar */}
        <MobileCalendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        
        {/* Tasks for selected date */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[var(--neutral-900)]">
                {selectedDate.toLocaleDateString('pt-BR', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </h3>
              <p className="text-sm text-[var(--neutral-500)]">
                {tasksForDate.length} tarefa{tasksForDate.length !== 1 ? 's' : ''} agendada{tasksForDate.length !== 1 ? 's' : ''}
              </p>
            </div>
            <ActionButton variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              Nova
            </ActionButton>
          </div>
          
          <div className="space-y-3">
            {tasksForDate.length > 0 ? (
              tasksForDate.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--neutral-100)] flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-8 h-8 text-[var(--neutral-400)]" />
                </div>
                <h4 className="font-semibold text-[var(--neutral-900)] mb-1">
                  Nenhuma tarefa
                </h4>
                <p className="text-sm text-[var(--neutral-500)]">
                  Aproveite seu dia livre!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
