import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  id: string;
  getId: (id: string) => void;
  variant: 'video' | 'pic';
  getVariant: (variant: 'video' | 'pic') => void;
}

export const useDeleteProject = create<ModalState>((set) => ({
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () => set({ isOpen: false }),
  id: '',
  getId: (id: string) => set({ id }),

  variant: 'pic',
  getVariant: (variant: 'video' | 'pic') => set({ variant }),
}));
