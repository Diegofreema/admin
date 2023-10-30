import { create } from 'zustand';

interface ModalState {
  editData: {
    heading: string;
    description: string;
    id: string;
  };
  edit: boolean;
  setEdit: () => void;

  getEditGoal: (value: {
    heading: string;
    description: string;
    id: string;
  }) => void;
}

export const useEditGoal = create<ModalState>((set) => ({
  editData: {
    heading: '',
    description: '',

    id: '',
  },
  edit: false,
  setEdit: () => set(({ edit }) => ({ edit: !edit })),
  getEditGoal: (value: {
    heading: string;
    description: string;

    id: string;
  }) => set({ editData: value }),
}));
