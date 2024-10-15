import { z } from 'zod'

const RoomSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string().uuid().optional(),
  clinicId: z.string().uuid().optional(),
  room: z.string().optional(),
  description: z.string().optional()
})

export type Room = z.infer<typeof RoomSchema>
