import { z } from "zod"

const ServiceInProductSchema = z.object({
  id: z.string(),
  serviceName: z.string(),
  productName: z.string(),
  productPrice: z.string(),
  productQuantity: z.string(),
  clinicId: z.string(),
  productId: z.string(),
  serviceId: z.string(),
  rental: z.number(),
  rentalPrice: z.string(),
})

export type ServiceInProduct = z.infer<typeof ServiceInProductSchema>
