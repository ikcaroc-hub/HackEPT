import { useState } from 'react';
import { Bell, Plus, TrendingUp } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { ActionButton } from '../components/ActionButton';
import { useNavigate } from 'react-router';

export function StudentDashboard() {
  const navigate = useNavigate();
  const [tasks] = useState([
    {
      id: '1',
      title: 'Cálculo II: Séries de Taylor',
      description: 'Resolver problemas do Capítulo 4: Equações Quadráticas e Parábolas',
      subject: 'Matemática',
      subjectColor: '#0057BD',
      dueDate: '24 Out',
      dueTime: '23:59',
      status: 'pending' as const,
      statusText: 'Pendente',
    },
    {
      id: '2',
      title: 'Relatório de Química Orgânica',
      description: 'Experimento sobre esterificação - incluir análise de dados',
      subject: 'Química',
      subjectColor: '#10B981',
      dueDate: '21 Out',
      dueTime: '18:00',
      status: 'submitted' as const,
      statusText: 'Enviado',
    },
    {
      id: '3',
      title: 'Ensaio: Renascimento Cultural',
      description: 'Impacto cultural e artístico do Renascimento Italiano',
      subject: 'História',
      subjectColor: '#F97316',
      dueDate: '20 Out',
      dueTime: '14:30',
      status: 'overdue' as const,
      statusText: 'Atrasado',
    },
  ]);
  
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
                <p className="text-xs text-[var(--neutral-500)]">Bem-vindo, Alex!</p>
              </div>
            </div>
            <button className="relative p-2 rounded-xl hover:bg-[var(--neutral-100)] transition-colors">
              <Bell className="w-5 h-5 text-[var(--neutral-600)]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full ring-2 ring-white" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-screen-sm mx-auto px-4 py-6 space-y-6">
        {/* Stats Card */}
        <div className="bg-gradient-to-br from-[var(--student-primary)] to-[#6E9FFF] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Progresso do Nível</p>
              <h2 className="text-2xl font-bold">1.240 / 2.000 XP</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold">
              Nível 5 ⚡
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs opacity-90">
              <span>Lvl 5</span>
              <span>Lvl 6</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#006A2D] to-[#6BFF8F] rounded-full w-3/5 shadow-lg" />
            </div>
          </div>
        </div>
        
        {/* Streak Card */}
        <div className="bg-white rounded-2xl p-6 border border-[var(--neutral-200)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wide mb-2">
                Minha Sequência 🔥
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[var(--neutral-900)]">12</span>
                <span className="text-sm font-medium text-[var(--neutral-600)]">Dias Ativos</span>
              </div>
            </div>
            <div className="flex gap-1">
              {['S', 'T', 'Q', 'Q', 'S'].map((day, i) => (
                <div
                  key={i}
                  className={`w-8 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                    i < 3
                      ? 'bg-[var(--student-primary-light)] text-[var(--student-primary)]'
                      : 'bg-[var(--neutral-100)] text-[var(--neutral-500)]'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tasks Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[var(--neutral-900)]">Próximos 7 dias</h3>
              <p className="text-sm text-[var(--neutral-500)]">Você tem {tasks.length} tarefas esta semana</p>
            </div>
            <button 
              onClick={() => navigate('/tasks')}
              className="text-sm font-semibold text-[var(--student-primary)] hover:underline"
            >
              Ver Todas
            </button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onClick={() => navigate(`/tasks/${task.id}`)}
              />
            ))}
          </div>
        </div>
        
        {/* CTA Card */}
        <div className="bg-gradient-to-br from-[var(--student-primary-light)] to-[var(--teacher-primary-light)] rounded-2xl p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-[var(--student-primary)]" />
          </div>
          <h4 className="font-semibold text-[var(--neutral-900)] mb-2">
            Sentindo-se produtivo?
          </h4>
          <p className="text-sm text-[var(--neutral-600)] mb-4">
            Crie uma nova tarefa pessoal ou meta de estudo
          </p>
          <ActionButton variant="primary" size="md" className="mx-auto">
            <Plus className="w-4 h-4" />
            Adicionar Tarefa
          </ActionButton>
        </div>
      </main>
    </div>
  );
}
