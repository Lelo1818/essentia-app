import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  callback: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const {
          key,
          ctrl = false,
          alt = false,
          shift = false,
          callback
        } = shortcut;

        const ctrlPressed = event.ctrlKey || event.metaKey; // Support both Ctrl and Cmd
        const altPressed = event.altKey;
        const shiftPressed = event.shiftKey;

        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          ctrlPressed === ctrl &&
          altPressed === alt &&
          shiftPressed === shift
        ) {
          event.preventDefault();
          callback();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return shortcuts;
}

// Common keyboard shortcuts for each app context
export const FINANCIAL_SHORTCUTS: ShortcutConfig[] = [
  {
    key: 'n',
    ctrl: true,
    callback: () => console.log('New transaction'),
    description: 'Nova transação'
  },
  {
    key: 'r',
    ctrl: true,
    callback: () => console.log('Add income'),
    description: 'Adicionar renda'
  },
  {
    key: 'e',
    ctrl: true,
    callback: () => console.log('Add expense'),
    description: 'Adicionar gasto'
  },
  {
    key: 'p',
    ctrl: true,
    callback: () => window.location.href = '/planning',
    description: 'Abrir planejamento'
  },
  {
    key: 'g',
    ctrl: true,
    callback: () => window.location.href = '/goals',
    description: 'Abrir metas'
  }
];

export const EDUCATIONAL_SHORTCUTS: ShortcutConfig[] = [
  {
    key: 'l',
    ctrl: true,
    callback: () => window.location.href = '/learning-paths',
    description: 'Trilhas de aprendizado'
  },
  {
    key: 'm',
    ctrl: true,
    callback: () => window.location.href = '/materials',
    description: 'Materiais de estudo'
  },
  {
    key: 's',
    ctrl: true,
    callback: () => console.log('Start study session'),
    description: 'Iniciar sessão de estudo'
  },
  {
    key: 'p',
    ctrl: true,
    callback: () => window.location.href = '/progress',
    description: 'Ver progresso'
  }
];

export const SPIRITUAL_SHORTCUTS: ShortcutConfig[] = [
  {
    key: 'j',
    ctrl: true,
    callback: () => window.location.href = '/journey',
    description: 'Jornada espiritual'
  },
  {
    key: 'd',
    ctrl: true,
    callback: () => window.location.href = '/diary',
    description: 'Diário reflexivo'
  },
  {
    key: 'm',
    ctrl: true,
    callback: () => console.log('Start meditation'),
    description: 'Iniciar meditação'
  },
  {
    key: 'r',
    ctrl: true,
    callback: () => console.log('Add reflection'),
    description: 'Nova reflexão'
  }
];