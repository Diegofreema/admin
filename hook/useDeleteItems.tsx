import { deleteEvent, deleteMember } from '@/lib/actions/user';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  id: string;
  getId: (id: string) => void;
  variant: 'OBJECTIVE' | 'GOAL' | 'PRIORITY';
  getVariant: (variant: 'OBJECTIVE' | 'GOAL' | 'PRIORITY') => void;
}

export const useDeleteItem = create<ModalState>((set) => ({
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () => set({ isOpen: false }),
  id: '',
  getId: (id: string) => set({ id }),

  variant: 'OBJECTIVE',
  getVariant: (variant: 'OBJECTIVE' | 'GOAL' | 'PRIORITY') => set({ variant }),
}));
