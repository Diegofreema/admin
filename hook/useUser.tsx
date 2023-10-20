import { createAdmin, login } from '@/lib/actions/user';
import { create } from 'zustand';
interface ModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}
let loggedIn = false;
if (typeof window !== 'undefined') {
  loggedIn = Boolean(window.localStorage.getItem('loggedIn')) || false;
}

export const useUser = create<ModalState>((set) => ({
  loggedIn: loggedIn,
  login: async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('loggedIn', 'true');
    }

    set({ loggedIn: true });
  },
  logout: async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('loggedIn');
    }

    set({ loggedIn: false });
  },
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
