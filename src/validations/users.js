import z from 'zod'

export const userSchema = z.object({
  name: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8),
  roleId: z.number()
})
