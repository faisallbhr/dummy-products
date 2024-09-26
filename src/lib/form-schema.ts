import { z } from "zod";

export const formSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  thumbnail: z.instanceof(File).optional(),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  price: z.number().gt(0, {
    message: "Price must be greater than 0.",
  }),
});
