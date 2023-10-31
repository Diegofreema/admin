import { create } from 'zustand';

interface ModalState {
  editData: {
    name: string;
    videoUrl: string;
    id?: string;
  };
  edit: boolean;
  setEdit: () => void;

  getEditData: (value: { name: string; videoUrl: string; id?: string }) => void;
}

export const useEditVideo = create<ModalState>((set) => ({
  editData: {
    name: '',
    videoUrl: '',
    id: '',
  },
  edit: false,
  setEdit: () => set(({ edit }) => ({ edit: !edit })),
  getEditData: (value: { name: string; videoUrl: string; id?: string }) =>
    set({ editData: value }),
}));
