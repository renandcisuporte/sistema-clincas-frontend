import { z } from 'zod'
import { WorkTimesSchema } from './work-times'

const ClinicSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  id: z.string().optional(),
  userId: z.string().optional(),
  code: z.string(),
  title: z.string(),
  fantasy: z.string(),
  cnpj: z.string(),
  ie: z.string(),
  phone: z.string().optional(),
  mobilePhone: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  complement: z.string().optional(),
  reference: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  workTimes: z.array(WorkTimesSchema).optional(),
  workTimesRecommended: z.array(WorkTimesSchema).optional()
})

export type Clinic = z.infer<typeof ClinicSchema>
