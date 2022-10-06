import { Post } from "@prisma/client"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type singleLike = {
    username: string
}

type minimalRestaurant = {
    id: number
    name: string
}

interface FullPost extends Post {
    favorites: singleLike[]
    comments: {
        id: number
        authorId: string
        createdAt: Date
        text: string
    }[]
    restaurant: {
        name: string
    }
    author: {
        username: string
    }
}
