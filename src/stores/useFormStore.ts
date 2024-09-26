import { ProductRequest } from "@/types/request/product";
import { create } from "zustand";

interface FormStore {
  formData: ProductRequest;
  setFormData: (data: ProductRequest) => void;
}

export const useFormStore = create<FormStore>()((set) => ({
  formData: {
    id: 0,
    thumbnail: undefined,
    title: "",
    category: "",
    price: 0,
  },
  setFormData: (data: ProductRequest) => set({ formData: { ...data } }),
}));
