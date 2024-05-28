import {z} from 'zod'

export const usernameValidation = z.
    string()
    .min(4,"Username must be more than 4 characters")
    .max(12,"Username shoukd within 12 characters")
    .regex(/^[a-zA-Z0-9_]/,"Username must not contain any special characters")

export const userSchema = z.object({
    username: usernameValidation,
    email: z.email({message: "Invalid email address"}),
    password: z.string().min(6,{message: "Password must be atleast 6 characters"})
})    