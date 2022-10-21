import { FullPost, PartialBy } from "@/customTypes"

interface dbPost extends PartialBy<FullPost, "comments"> {
    _count: {
        favorites: number
        comments: number
    }
}

export const reducePosts = (posts: dbPost[]) => {
    return posts.map((post) => {
        return {
            id: post.id,
            authorId: post.authorId,
            title: post.title,
            rating: post.rating,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            chosenFood: post.chosenFood,
            restaurantId: post.restaurantId,
            restaurant: post.restaurant,
            author: post.author,
            favoriteAmount: post._count.favorites,
            commentAmount: post._count.comments,
            isFavorite: post.favorites.length > 0,
        }
    })
}
