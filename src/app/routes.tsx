import { createBrowserRouter } from 'react-router';
import { StudentDashboard } from './pages/StudentDashboard';
import { CalendarView } from './pages/CalendarView';
import { TaskDetail } from './pages/TaskDetail';
import { TeacherPanel } from './pages/TeacherPanel';
import { Placeholder } from './pages/Placeholder';
import { BottomNav } from './components/BottomNav';
import { ListTodo, Users, BarChart3 } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <BottomNav />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <StudentDashboard />
      </Layout>
    ),
  },
  {
    path: '/calendar',
    element: (
      <Layout>
        <CalendarView />
      </Layout>
    ),
  },
  {
    path: '/tasks',
    element: (
      <Layout>
        <Placeholder 
          title="Tarefas" 
          icon={<ListTodo className="w-10 h-10 text-[var(--neutral-400)]" />}
        />
      </Layout>
    ),
  },
  {
    path: '/tasks/:id',
    element: (
      <Layout>
        <TaskDetail />
      </Layout>
    ),
  },
  {
    path: '/social',
    element: (
      <Layout>
        <Placeholder 
          title="Social" 
          icon={<Users className="w-10 h-10 text-[var(--neutral-400)]" />}
        />
      </Layout>
    ),
  },
  {
    path: '/stats',
    element: (
      <Layout>
        <Placeholder 
          title="Estatísticas" 
          icon={<BarChart3 className="w-10 h-10 text-[var(--neutral-400)]" />}
        />
      </Layout>
    ),
  },
  {
    path: '/teacher',
    element: (
      <Layout>
        <TeacherPanel />
      </Layout>
    ),
  },
]);
