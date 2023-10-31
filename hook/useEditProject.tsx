import { create } from 'zustand';

interface ModalState {
  editData: {
    name: string;
    imgUrl: string;
    id?: string;
  };
  edit: boolean;
  setEdit: () => void;

  getEditData: (value: { name: string; imgUrl: string; id?: string }) => void;
}

export const useProjectEdit = create<ModalState>((set) => ({
  editData: {
    name: '',
    imgUrl: '',
    id: '',
  },
  edit: false,
  setEdit: () => set(({ edit }) => ({ edit: !edit })),
  getEditData: (value: { name: string; imgUrl: string; id?: string }) =>
    set({ editData: value }),
}));
