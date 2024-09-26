import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
