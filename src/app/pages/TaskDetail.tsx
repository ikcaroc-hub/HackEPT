import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Calendar, Clock, FileText, MessageSquare, Upload } from 'lucide-react';
import { ActionButton } from '../components/ActionButton';
import { StatusBadge } from '../components/StatusBadge';

export function TaskDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showNegotiation, setShowNegotiation] = useState(false);
  
  // Mock task data
  const task = {
    id,
    title: 'Mecânica Orbital e Movimento de Satélites',
    subject: 'Física',
    subjectColor: '#0057BD',
    teacher: 'Ms. Thompson',
    dueDate: '24 Out, 2024',
    dueTime: '23:59',
    status: 'pending' as const,
    description: 'Complete os problemas de prática sobre as Leis de Kepler do Movimento Planetário. Calcule a velocidade de escape para diferentes planetas no sistema solar.',
    requirements: [
      'Mostre todo o trabalho matemático',
      'Inclua pelo menos um diagrama para cada questão',
      'Formate como um PDF de página única',
    ],
    teacherFeedback: 'Excelente trabalho nas derivações, Marcus! A lógica estava clara e bem organizada. Mantenha!',
  };
  
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40">
        <div className="max-w-screen-sm mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl hover:bg-[var(--neutral-100)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--neutral-600)]" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-[var(--neutral-900)] truncate">Detalhes da Tarefa</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-screen-sm mx-auto px-4 py-6 space-y-6">
        {/* Status Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-2">
            <StatusBadge variant="pending">Pendente</StatusBadge>
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${task.subjectColor}15`,
                color: task.subjectColor
              }}
            >
              {task.subject}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--teacher-primary-light)] text-[var(--teacher-primary)]">
            Professor
          </span>
        </div>
        
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-[var(--neutral-900)] mb-2">
            {task.title}
          </h2>
          <div className="flex items-center gap-2 text-sm text-[var(--neutral-600)]">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
              alt={task.teacher}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>Atribuído por {task.teacher}</span>
          </div>
        </div>
        
        {/* Date & Time */}
        <div className="bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Calendar className="w-5 h-5 text-[var(--neutral-500)]" />
              <div>
                <p className="text-xs text-[var(--neutral-500)]">Data de Entrega</p>
                <p className="font-semibold text-[var(--neutral-900)]">{task.dueDate}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-[var(--neutral-200)]" />
            <div className="flex items-center gap-2 flex-1">
              <Clock className="w-5 h-5 text-[var(--neutral-500)]" />
              <div>
                <p className="text-xs text-[var(--neutral-500)]">Horário</p>
                <p className="font-semibold text-[var(--neutral-900)]">{task.dueTime}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-[var(--neutral-600)]" />
            <h3 className="font-semibold text-[var(--neutral-900)]">Descrição da Tarefa</h3>
          </div>
          <p className="text-sm text-[var(--neutral-700)] leading-relaxed">
            {task.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-[var(--neutral-200)]">
            <h4 className="text-sm font-semibold text-[var(--neutral-900)] mb-2">Requisitos:</h4>
            <ul className="space-y-2">
              {task.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--neutral-700)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--student-primary)] mt-1.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Negotiation Section */}
        {!showNegotiation ? (
          <div className="bg-[var(--accent-light)] rounded-2xl p-4 border border-[var(--accent)]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[var(--neutral-900)] mb-1">
                  Precisa de mais tempo?
                </h4>
                <p className="text-sm text-[var(--neutral-600)] mb-3">
                  Você pode propor uma nova data de entrega para negociar com o professor
                </p>
                <ActionButton 
                  variant="propose" 
                  size="sm"
                  onClick={() => setShowNegotiation(true)}
                >
                  <Calendar className="w-4 h-4" />
                  Propor Nova Data
                </ActionButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-[var(--neutral-200)]">
            <h4 className="font-semibold text-[var(--neutral-900)] mb-3">Negociar Prazo</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-[var(--neutral-700)] mb-1.5 block">
                  Nova data proposta
                </label>
                <input 
                  type="date"
                  className="w-full h-11 px-3 rounded-xl border border-[var(--neutral-200)] focus:border-[var(--student-primary)] focus:ring-2 focus:ring-[var(--student-primary)]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--neutral-700)] mb-1.5 block">
                  Motivo (opcional)
                </label>
                <textarea 
                  rows={3}
                  placeholder="Explique por que você precisa de mais tempo..."
                  className="w-full px-3 py-2 rounded-xl border border-[var(--neutral-200)] focus:border-[var(--student-primary)] focus:ring-2 focus:ring-[var(--student-primary)]/20 outline-none transition-all resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <ActionButton variant="propose" fullWidth>
                  Enviar Proposta
                </ActionButton>
                <ActionButton 
                  variant="secondary"
                  onClick={() => setShowNegotiation(false)}
                >
                  Cancelar
                </ActionButton>
              </div>
            </div>
          </div>
        )}
        
        {/* Teacher Feedback */}
        <div className="bg-[var(--teacher-primary-light)] rounded-2xl p-4 border border-[var(--teacher-primary)]/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[var(--teacher-primary)]/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[var(--teacher-primary)]" />
            </div>
            <h4 className="font-semibold text-[var(--neutral-900)]">Feedback do Professor</h4>
          </div>
          <p className="text-sm text-[var(--neutral-700)] leading-relaxed pl-10">
            {task.teacherFeedback}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="sticky bottom-20 bg-white rounded-2xl p-4 border border-[var(--neutral-200)] shadow-lg">
          <ActionButton variant="primary" size="lg" fullWidth>
            <Upload className="w-5 h-5" />
            Enviar Trabalho
          </ActionButton>
        </div>
      </main>
    </div>
  );
}
