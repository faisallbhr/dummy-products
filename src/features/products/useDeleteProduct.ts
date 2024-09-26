import { ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useDeleteProduct = (
  options?: UseMutationOptions<AxiosResponse, AxiosError, number>
) => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await axiosInstance.delete(ENDPOINTS.PRODUCTS.DELETE(id));
    },
    ...options,
  });
};
