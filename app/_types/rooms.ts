import { z } from 'zod'

const RoomSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string().uuid().optional(),
  clinicId: z.string().uuid().optional(),
  code: z.string().optional(),
  room: z.string().optional(),
  description: z.string().optional(),
  averageService: z.string().optional(),
  active: z.boolean().optional()
})

export type Room = z.infer<typeof RoomSchema>
