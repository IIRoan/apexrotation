import { useMemo } from 'react';

type RotationMode = 'ranked' | 'normal' | 'ltm';

interface ModeColors {
  text: string;
  textMuted: string;
  border: string;
  badge: string;
  progressBg: string;
  progressFill: string;
  accent: string;
  position: string;
}

/**
 * Hook that returns color classes based on rotation mode
 * @param mode - The current rotation mode
 * @returns Object containing color classes for different UI elements
 */
export const useModeColors = (mode: RotationMode): ModeColors => {
  return useMemo(() => {
    switch (mode) {
      case 'ranked':
        return {
          text: 'text-purple-400',
          textMuted: 'text-purple-400/70',
          border: 'border-purple-400/20',
          badge: 'bg-purple-400/10',
          progressBg: 'bg-purple-400/10',
          progressFill: 'bg-purple-400',
          accent: 'bg-purple-400',
          position: 'right-0 rounded-l-full'
        };
      case 'normal':
        return {
          text: 'text-emerald-400',
          textMuted: 'text-emerald-400/70',
          border: 'border-emerald-400/20',
          badge: 'bg-emerald-400/10',
          progressBg: 'bg-emerald-400/10',
          progressFill: 'bg-emerald-400',
          accent: 'bg-emerald-400',
          position: 'left-0 rounded-r-full'
        };
      case 'ltm':
        return {
          text: 'text-yellow-400',
          textMuted: 'text-yellow-400/70',
          border: 'border-yellow-400/20',
          badge: 'bg-yellow-400/10',
          progressBg: 'bg-yellow-400/10',
          progressFill: 'bg-yellow-400',
          accent: 'bg-yellow-400',
          position: 'left-0 rounded-r-full'
        };
    }
  }, [mode]);
};