"use client";

import { useFetchProducts } from "@/features/products/useFetchProducts";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

export default function Product({
  dehydrateState,
}: {
  dehydrateState: DehydratedState;
}) {
  const { data, isLoading, error } = useFetchProducts();
  return (
    <HydrationBoundary state={dehydrateState}>
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        error={error ? error.message : undefined}
      />
    </HydrationBoundary>
  );
}
