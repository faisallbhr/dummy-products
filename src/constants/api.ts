export const ENDPOINTS = {
  PRODUCTS: {
    GET: "/products",
    POST: "/products/add",
    UPDATE: (id: number) => `/products/${id}`,
    DELETE: (id: number) => `/products/${id}`,
  },
};
