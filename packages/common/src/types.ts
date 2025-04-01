import {z} from "zod"

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    name: z.string(),
    password: z.string()
})

export const SignInSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(4).max(20)
})