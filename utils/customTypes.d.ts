import { Post, Restaurant } from "@prisma/client"

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

interface ReducedPost extends Post {
    favoriteAmount: number
    commentAmount: number
    restaurant: { name: string }
    author: { username: string }
    isFavorite: boolean
}

type simpleRestaurant = {
    name: string
    id: number
    cuisines: {
        id: number
        name: string
    }[]
    state: string
    city: string
}

interface ExtendedRestaurant extends Restaurant {
    cuisines: {
        id: number
        name: string
    }[]
}
