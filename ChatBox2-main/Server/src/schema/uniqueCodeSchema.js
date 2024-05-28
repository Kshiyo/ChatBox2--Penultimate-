import {z}from 'zod'

export const uniqueCodeSchema = z.object({
    code: z.number().min(8,"Code must be 8 digits").max(8,"Code must be 8 digits")
})
