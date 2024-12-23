import { z } from "zod"

const ServiceSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string().uuid().optional(),
  name: z.string({ message: "Campo nome obrigatório!" }).min(5),
  total: z.number().optional(),
})

export type Service = z.infer<typeof ServiceSchema>
