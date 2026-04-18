# Planno - Plataforma Escolar de Negociação de Prazos

Uma plataforma web mobile-first onde professores e alunos negociam datas de entrega de trabalhos através de um calendário virtual interativo.

## 🎨 Design System

### Cores Principais

- **Student Primary**: `#0057BD` - Azul para ações e componentes de alunos
- **Teacher Primary**: `#6A37D4` - Roxo para ações e componentes de professores  
- **Accent**: `#F97316` - Laranja para negociações e destaques

### Tipografia

- **Font**: Inter (400, 500, 600, 700)
- **Tamanho mínimo**: 14px no mobile
- **Títulos**: Weight 600-700
- **Corpo**: Weight 400-500

### Espaçamento

- **Grid base**: 4px
- **Padding cards**: 16px mobile / 24px desktop
- **Botões mínimos**: 44px de altura (mobile touch target)

## 📱 Funcionalidades

### Para Alunos

- Dashboard com tarefas e progresso
- Calendário interativo com swipe
- Visualização detalhada de tarefas
- Negociação de prazos com professores
- Sistema de gamificação (XP, níveis, streaks)

### Para Professores

- Painel de controle de turmas
- Aprovação/rejeição de negociações
- Controle de progresso dos alunos
- Estatísticas de desempenho

## 🏗️ Arquitetura

### Componentes Reutilizáveis

#### ActionButton
Botão com variants para diferentes ações:
- `accept` - Verde para aprovar
- `reject` - Vermelho para recusar
- `propose` - Laranja para propor
- `primary` - Azul principal
- `secondary` - Neutro

Tamanhos: `sm`, `md`, `lg`

#### StatusBadge
Badge de status com variants:
- `pending` - Amarelo
- `approved` - Verde
- `rejected` - Vermelho
- `submitted` - Verde
- `overdue` - Vermelho

#### TaskCard
Card de tarefa com indicador colorido lateral, status e metadados.

#### MobileCalendar
Calendário responsivo com:
- Navegação por swipe
- Indicadores visuais de tarefas
- Legenda de cores
- Seleção de data

## 🛠️ Tecnologias

- **React 18** com TypeScript
- **React Router 7** para navegação
- **Tailwind CSS v4** para estilização
- **Motion** (Framer Motion) para animações e gestos
- **Lucide React** para ícones
- **Vite** como bundler

## 📂 Estrutura de Pastas

```
/src
  /app
    /components
      - ActionButton.tsx
      - StatusBadge.tsx
      - TaskCard.tsx
      - MobileCalendar.tsx
      - BottomNav.tsx
    /pages
      - StudentDashboard.tsx
      - CalendarView.tsx
      - TaskDetail.tsx
      - TeacherPanel.tsx
      - Placeholder.tsx
    - routes.tsx
    - App.tsx
  /styles
    - theme.css
    - fonts.css
    - index.css
```

## 🎯 Mobile First

- Design otimizado para 375px (iPhone) e 390px (Android)
- Touch targets mínimos de 44px
- Gestos de swipe no calendário
- Bottom navigation fixo
- Tipografia legível sem zoom

## 🚀 Como Usar

### Instalação

```bash
pnpm install
pnpm dev
```

### Navegação Principal

1. **Início** - Dashboard do aluno com tarefas e progresso
2. **Calendário** - Visualização mensal com tarefas agendadas
3. **Tarefas** - Lista completa de tarefas (em desenvolvimento)
4. **Social** - Feed de atividades (em desenvolvimento)
5. **Stats** - Estatísticas detalhadas (em desenvolvimento)

### URL Especial

- `/teacher` - Acesso ao painel do professor

## 🎨 Inspiração de Design

O design foi inspirado em:
- **Linear** - Interface limpa e minimalista
- **Notion** - Organização e hierarquia visual
- **Google Classroom** - Funcionalidade educacional

## 📝 Notas de Desenvolvimento

### Componentes com Variants

Todos os componentes principais suportam variants para diferentes estados:
- Padrão (default)
- Hover
- Ativo (active)
- Desabilitado (disabled)

### Acessibilidade

- ARIA labels em botões de navegação
- Contraste de cores WCAG AA
- Touch targets adequados
- Feedback visual em todas as interações

### Responsividade

Grid de 4px garante alinhamento consistente em todos os breakpoints.
