import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  icon: React.ReactNode;
}

export function Placeholder({ title, icon }: PlaceholderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <header className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-40">
        <div className="max-w-screen-sm mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-2 -ml-2 rounded-xl hover:bg-[var(--neutral-100)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--neutral-600)]" />
            </button>
            <h1 className="text-lg font-bold text-[var(--neutral-900)]">{title}</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-screen-sm mx-auto px-4 py-12">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--neutral-100)] flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-[var(--neutral-900)] mb-2">
            Em Desenvolvimento
          </h2>
          <p className="text-sm text-[var(--neutral-600)]">
            Esta funcionalidade estará disponível em breve.
          </p>
        </div>
      </main>
    </div>
  );
}
