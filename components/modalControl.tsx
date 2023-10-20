import { deleteEvent, deleteMember } from '@/lib/actions/user';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  id: string;
  getId: (id: string) => void;
}

export const useDeleteModal = create<ModalState>((set) => ({
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () => set({ isOpen: false }),
  id: '',
  getId: (id: string) => set({ id }),
}));
