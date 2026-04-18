import { useState } from 'react';
import { Bell, ChevronRight, Plus, TrendingUp, AlertCircle } from 'lucide-react';
import { ActionButton } from '../components/ActionButton';
import { StatusBadge } from '../components/StatusBadge';

interface NegotiationRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  taskTitle: string;
  currentDate: string;
  proposedDate: string;
  reason: string;
  timestamp: string;
}

export function TeacherPanel() {
  const [negotiations] = useState<NegotiationRequest[]>([
    {
      id: '1',
      studentName: 'Alex Rivera',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      taskTitle: 'Cálculo II: Séries de Taylor',
      currentDate: '24 Out, 2024',
      proposedDate: '28 Out, 2024',
      reason: 'Tenho outra prova no mesmo dia e gostaria de me preparar adequadamente para ambas.',
      timestamp: 'Há 2 horas',
    },
    {
      id: '2',
      studentName: 'Sarah Chen',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      taskTitle: 'Relatório de Química',
      currentDate: '21 Out, 2024',
      proposedDate: '23 Out, 2024',
      reason: 'Preciso de mais tempo para completar o experimento de laboratório.',
      timestamp: 'Há 5 horas',
    },
  ]);
  
  const [stats] = useState({
    activeGroups: 3,
    totalStudents: 64,
    onTrack: 18,
    atRisk: 2,
    completionRate: 14,
    unreadMessages: 8,
  });
  
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[var(--teacher-primary)] to-[#8B5CF6] text-white sticky top-0 z-40">
        <div className="max-w-screen-sm mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
                MT
              </div>
              <div>
                <h1 className="text-lg font-bold">Painel do Professor</h1>
                <p className="text-sm opacity-90">Ms. Thompson</p>
              </div>
            </div>
            <button className="relative p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <Bell className="w-5 h-5" />
              {stats.unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--error)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {stats.unreadMessages}
                </span>
              )}
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs opacity-90 mb-1">Turmas Ativas</p>
              <p className="text-2xl font-bold">{stats.activeGroups}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-xs opacity-90 mb-1">Total de Alunos</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-screen-sm mx-auto px-4 py-6 space-y-6">
        {/* Pending Negotiations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[var(--neutral-900)]">Negociações Pendentes</h3>
              <p className="text-sm text-[var(--neutral-500)]">{negotiations.length} solicitações aguardando</p>
            </div>
            <StatusBadge variant="pending">
              {negotiations.length} Pendente{negotiations.length !== 1 ? 's' : ''}
            </StatusBadge>
          </div>
          
          <div className="space-y-3">
            {negotiations.map((negotiation) => (
              <div 
                key={negotiation.id}
                className="bg-white rounded-2xl p-4 border border-[var(--neutral-200)] hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={negotiation.studentAvatar}
                    alt={negotiation.studentName}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-[var(--neutral-900)]">
                        {negotiation.studentName}
                      </h4>
                      <span className="text-xs text-[var(--neutral-500)] whitespace-nowrap">
                        {negotiation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--neutral-600)] mb-2">
                      {negotiation.taskTitle}
                    </p>
                  </div>
                </div>
                
                <div className="bg-[var(--neutral-50)] rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs text-[var(--neutral-500)] mb-0.5">Data Atual</p>
                      <p className="text-sm font-semibold text-[var(--neutral-900)]">
                        {negotiation.currentDate}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--neutral-400)]" />
                    <div>
                      <p className="text-xs text-[var(--neutral-500)] mb-0.5">Data Proposta</p>
                      <p className="text-sm font-semibold text-[var(--accent)]">
                        {negotiation.proposedDate}
                      </p>
                    </div>
                  </div>
                  
                  {negotiation.reason && (
                    <div className="pt-2 border-t border-[var(--neutral-200)]">
                      <p className="text-xs text-[var(--neutral-500)] mb-1">Motivo:</p>
                      <p className="text-sm text-[var(--neutral-700)]">{negotiation.reason}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <ActionButton variant="accept" size="sm" fullWidth>
                    Aceitar
                  </ActionButton>
                  <ActionButton variant="reject" size="sm" fullWidth>
                    Recusar
                  </ActionButton>
                  <ActionButton variant="propose" size="sm">
                    Contrapropor
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Class Performance */}
        <div className="bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--neutral-900)]">Turma AP História Mundial</h3>
            <ChevronRight className="w-5 h-5 text-[var(--neutral-400)]" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[var(--success-light)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                <p className="text-xs font-medium text-[var(--success)]">No Prazo</p>
              </div>
              <p className="text-2xl font-bold text-[var(--success)]">{stats.onTrack}</p>
            </div>
            <div className="bg-[var(--error-light)] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-[var(--error)]" />
                <p className="text-xs font-medium text-[var(--error)]">Em Risco</p>
              </div>
              <p className="text-2xl font-bold text-[var(--error)]">{stats.atRisk}</p>
            </div>
          </div>
          
          <div className="bg-[var(--neutral-50)] rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[var(--neutral-500)]">Taxa de Conclusão</p>
              <p className="text-sm font-semibold text-[var(--neutral-900)]">{stats.completionRate}%</p>
            </div>
            <div className="h-2 bg-[var(--neutral-200)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--teacher-primary)] to-[#8B5CF6] rounded-full transition-all"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <ActionButton variant="primary" size="md" className="flex-col h-auto py-4">
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs">Nova Tarefa</span>
          </ActionButton>
          <ActionButton variant="secondary" size="md" className="flex-col h-auto py-4">
            <TrendingUp className="w-6 h-6 mb-1" />
            <span className="text-xs">Relatórios</span>
          </ActionButton>
        </div>
      </main>
    </div>
  );
}
