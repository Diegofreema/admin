import { create } from 'zustand';

interface ModalState {
  editData: {
    heading?: string;
    description?: string;
    imgUrl: string;
    id: string;
  };
  edit: boolean;
  setEdit: () => void;

  getEditData: (value: {
    heading?: string;
    description?: string;
    imgUrl: string;
    id: string;
  }) => void;
}

export const useEdit = create<ModalState>((set) => ({
  editData: {
    heading: '',
    description: '',
    imgUrl: '',
    id: '',
  },
  edit: false,
  setEdit: () => set(({ edit }) => ({ edit: !edit })),
  getEditData: (value: {
    heading?: string;
    description?: string;
    imgUrl: string;
    id: string;
  }) => set({ editData: value }),
}));
