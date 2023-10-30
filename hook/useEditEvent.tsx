import { deleteEvent, deleteMember } from '@/lib/actions/user';
import { create } from 'zustand';

interface ModalState {
  editData: {
    name?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date?: Date;
    id: string;
  };
  edit: boolean;
  setEdit: () => void;

  getEditData: (value: {
    name?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date?: Date;
    id: string;
  }) => void;
}

export const useEditEvent = create<ModalState>((set) => ({
  editData: {
    name: '',
    venue: '',
    description: '',
    imgUrl: '',
    date: new Date(),
    id: '',
  },
  edit: false,
  setEdit: () => set(({ edit }) => ({ edit: !edit })),
  getEditData: (value: {
    name?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date?: Date;
    id: string;
  }) => set({ editData: value }),
}));
