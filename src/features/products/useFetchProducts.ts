import { ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/lib/axios";
import { ProductProps } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export const useFetchProducts = () => {
  return useQuery<ProductProps[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ products: ProductProps[] }>(
        ENDPOINTS.PRODUCTS.GET
      );
      return response.data.products;
    },
  });
};
