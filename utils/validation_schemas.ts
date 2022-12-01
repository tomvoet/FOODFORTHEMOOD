import { z } from "zod"

const postSchema = z.object({
    title: z.string().min(3).max(100),
    text: z.string().min(3).max(1000),
    rating: z.number().min(1).max(5),
    chosenFood: z.string().min(3).max(100),
    restaurantId: z.number().min(1),
    authorId: z.string().min(3).max(100),
})

const userSchema = z.object({
    username: z.string().min(3).max(100),
    email: z.string().email(),
    bio: z.string().min(3).max(1000),
    image: z.string(),
    password: z.string().min(8).max(100),
})

const commentSchema = z.object({
    text: z.string().min(3).max(1000),
    authorId: z.string().min(3).max(100),
    postId: z.number().min(1),
})

const restaurantSchema = z.object({
    name: z.string().min(3).max(100),
    cuisines: z.array(
        z.object({
            name: z.string().min(3).max(100),
            id: z.number(),
        })
    ),
    state: z.string().min(3).max(100),
    city: z.string().min(3).max(100),
    zip: z.string().min(3).max(100),
    street: z.string().min(3).max(100),
    houseNum: z.string().min(1).max(100),
    phone: z.string().min(0).max(100).nullable(),
    website: z.string().min(0).max(100).nullable(),
})

export { postSchema, userSchema, commentSchema, restaurantSchema }
