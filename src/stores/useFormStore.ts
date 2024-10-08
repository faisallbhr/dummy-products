import { ProductRequest } from "@/types/request/product";
import { create } from "zustand";

interface FormStore {
  formData: ProductRequest;
  setFormData: (data: Partial<ProductRequest>) => void;
}

const defaultValues: ProductRequest = {
  id: 0,
  thumbnail: undefined,
  title: "",
  category: "",
  price: 0,
};

export const useFormStore = create<FormStore>()((set) => ({
  formData: defaultValues,
  setFormData: (data: Partial<ProductRequest>) =>
    set(() => ({
      formData:
        Object.keys(data).length === 0
          ? defaultValues
          : { ...defaultValues, ...data },
    })),
}));
