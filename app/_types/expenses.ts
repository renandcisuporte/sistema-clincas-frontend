import { z } from 'zod'

const ExpenseSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string().uuid().optional(),
  clinicId: z.string().uuid({ message: 'Selecione uma Clinica' }).optional(),
  description: z.string().min(1, { message: 'Campo obrigatório!' }),
  active: z.boolean().optional().default(true),
  type: z.enum(['fixed', 'variable']).optional().default('fixed')
})

export type Expense = z.infer<typeof ExpenseSchema>
