import { deleteEvent, deleteMember } from '@/lib/actions/user';
import { create } from 'zustand';

export interface Range {
  range1: { startDate: Date; endDate: Date };
}
interface ModalState {
  editData: {
    name?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date: Range;
    id: string;
  };
  edit: boolean;
  setEdit: () => void;

  getEditData: (value: {
    name?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date: Range;
    id: string;
  }) => void;
}

export const useEditEvent = create<ModalState>((set) => ({
  editData: {
    name: '',
    venue: '',
    description: '',
    imgUrl: '',
    date: { range1: { startDate: new Date(), endDate: new Date() } },
    id: '',
  },
  edit: false,
  setEdit: () => set(({ edit }) => ({ edit: !edit })),
  getEditData: (value: {
    name?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date: Range;
    id: string;
  }) => set({ editData: value }),
}));
