import { deleteEvent, deleteMember } from '@/lib/actions/user';
import { create } from 'zustand';

interface ModalState {
  editData: {
    name: string;
    job: string;
    imgUrl: string;
    id: string;
  };
  edit: boolean;
  setEdit: () => void;

  getEditData: (value: {
    name: string;
    job: string;
    imgUrl: string;
    id: string;
  }) => void;
}

export const useEditTeam = create<ModalState>((set) => ({
  editData: {
    name: '',
    job: '',
    imgUrl: '',
    id: '',
  },
  edit: false,
  setEdit: () => set(({ edit }) => ({ edit: !edit })),
  getEditData: (value: {
    name: string;
    job: string;
    imgUrl: string;
    id: string;
  }) => set({ editData: value }),
}));
