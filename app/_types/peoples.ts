import { z } from 'zod'

const PhoneSchema = z.object({
  phone: z.string().optional(),
  description: z.string().optional()
})

const PeopleSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string().uuid().optional(),
  fullName: z.string({ message: 'Campo fullName obrigatório!' }).min(5),
  document: z.string({ message: 'Campo document obrigatório!' }).optional(),
  type: z.string().optional(),
  dateOfBirth: z
    .string({ message: 'Campo brithDate obrigatório!' })
    .transform((string) => new Date(string))
    .optional(),
  phones: z.array(PhoneSchema),
  email: z.string({ message: 'campo email obrigatório!' }).email().optional(),
  address: z.string().min(5).optional(),
  number: z.string().min(1).optional(),
  neighborhood: z.string().min(1).optional(),
  complement: z.string().optional(),
  reference: z.string().optional(),
  city: z.string().min(1).optional(),
  state: z.string().max(2).optional(),
  zipCode: z.string().min(1).optional()
})

export type People = z.infer<typeof PeopleSchema>
export type Phone = z.infer<typeof PhoneSchema>
