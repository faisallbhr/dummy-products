import { ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/lib/axios";
import { ProductRequest } from "@/types/request/product";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useEditProduct = (
  options?: UseMutationOptions<AxiosResponse, AxiosError, ProductRequest>
) => {
  return useMutation({
    mutationFn: async ({ id, ...updatedProduct }: ProductRequest) => {
      return await axiosInstance.put(
        ENDPOINTS.PRODUCTS.UPDATE(id),
        updatedProduct
      );
    },
    ...options,
  });
};
