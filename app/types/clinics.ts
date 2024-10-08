import { z } from 'zod'

const AddressClinicSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  number: z.string().optional(),
  address: z.string().optional(),
  complement: z.string().optional()
})

export type AddressClinic = z.infer<typeof AddressClinicSchema>

const ClinicSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  id: z.union([z.string(), z.number()]),
  userId: z.union([z.string(), z.number()]),
  code: z.string(),
  title: z.string(),
  fantasy: z.string(),
  cnpj: z.string(),
  ie: z.string(),
  phones: z.array(z.unknown()),
  address: AddressClinicSchema
})

export type Clinic = z.infer<typeof ClinicSchema>
