import {z}from 'zod'

export const messageSchema = z.object({
    content: z.string().max(200,"Message cannot be more than 200 characters")
})
