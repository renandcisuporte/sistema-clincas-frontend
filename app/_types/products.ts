import { z } from "zod"

const ProductSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string().uuid().optional(),
  name: z.string({ message: "Campo nome obrigatório!" }).min(5),
  quantity: z.string(),
  price: z.string(),
  retail: z.string(),
})

export type Product = z.infer<typeof ProductSchema>
