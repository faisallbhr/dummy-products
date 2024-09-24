"use client";

import { useFetchProducts } from "@/features/products/useFetchProducts";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

function ProductListContent() {
  const { data, isLoading, error } = useFetchProducts();

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      error={error ? error.message : undefined}
    />
  );
}

export default function ProductList({
  dehydrateState,
}: {
  dehydrateState: DehydratedState;
}) {
  return (
    <HydrationBoundary state={dehydrateState}>
      <ProductListContent />
    </HydrationBoundary>
  );
}
