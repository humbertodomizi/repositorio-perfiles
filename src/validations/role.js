import z from 'zod'

export const roleSchema = z.object({
  name: z.string().nonempty().min(3).max(50)
})
