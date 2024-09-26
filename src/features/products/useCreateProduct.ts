import { ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/lib/axios";
import { ProductRequest } from "@/types/request/product";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useCreateProduct = (
  options?: UseMutationOptions<AxiosResponse, AxiosError, ProductRequest>
) => {
  return useMutation({
    mutationFn: async (newProduct: ProductRequest) => {
      return await axiosInstance.post(ENDPOINTS.PRODUCTS.POST, newProduct);
    },
    ...options,
  });
};
