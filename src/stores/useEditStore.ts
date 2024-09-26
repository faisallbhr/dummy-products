import { create } from "zustand";

interface EditStore {
  isEdit: boolean;
  setIsEdit: (edit: boolean) => void;
}

export const useEditStore = create<EditStore>()((set) => ({
  isEdit: false,
  setIsEdit: (edit) => set({ isEdit: edit }),
}));
