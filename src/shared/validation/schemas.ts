import { z } from 'zod'

export const clientFormSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  phone: z.string()
    .min(1, 'Номер телефона обязателен')
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона'),
  address: z.string().min(1, 'Адрес обязателен'),
  comment: z.string().optional()
})

export type ClientForm = z.infer<typeof clientFormSchema>
