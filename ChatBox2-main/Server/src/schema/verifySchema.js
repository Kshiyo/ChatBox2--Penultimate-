import {z}from 'zod'

export const verifySchema = z.object({
    code: z.string().min(8,"Verfication Code must be 8 digits")
})
