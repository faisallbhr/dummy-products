import { ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/lib/axios";
import { ProductResponse } from "@/types/response/product";
import { useQuery } from "@tanstack/react-query";

export const useFetchProducts = () => {
  return useQuery<ProductResponse[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ products: ProductResponse[] }>(
        ENDPOINTS.PRODUCTS.GET
      );
      return response.data.products;
    },
  });
};
