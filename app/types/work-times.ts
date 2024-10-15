import { z } from 'zod'

export const HoursSchem = z.object({
  description: z.string(),
  time: z.string()
})

export type Hours = z.infer<typeof HoursSchem>

export const WorkTimesSchema = z.object({
  id: z.string().optional(),
  clinicId: z.string().optional(),
  week: z.string(),
  open: z.boolean(),
  times: z.array(HoursSchem)
})

export type WorkTime = z.infer<typeof WorkTimesSchema>
