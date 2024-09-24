import { QueryClient } from "@tanstack/react-query";

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
