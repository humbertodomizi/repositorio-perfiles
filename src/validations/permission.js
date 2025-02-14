import z from 'zod'

export const permissionSchema = z.object({
  action: z.string().nonempty()
})
