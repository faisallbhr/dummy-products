import { InfoDialog } from "@/components/dialog";
import Modal from "@/components/modal";
import Product from "@/components/products";
import { Toaster } from "@/components/ui/toaster";
import { ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/lib/axios";
import { dehydrate, QueryClient } from "@tanstack/react-query";

async function fetchProducts() {
  const response = await axiosInstance.get(ENDPOINTS.PRODUCTS.GET);
  return response.data.products;
}

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <main className="container my-6 px-4 mx-auto">
      <h1 className="font-extrabold text-2xl md:text-4xl text-center">
        DUMMY PRODUCTS
      </h1>
      <InfoDialog />
      <div className="my-6 space-y-4">
        <Modal />
        <Product dehydrateState={dehydrateState} />
      </div>
      <Toaster />
    </main>
  );
}
