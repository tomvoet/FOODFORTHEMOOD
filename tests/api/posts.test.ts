import { describe, expect, it } from "vitest"
import type { PathMethodHandler } from "../utils"
import { setupApiAndDatabase } from "../utils"
import getAllPosts from "../../server/api/post/index.get"
import getPostById from "../../server/api/post/[id].get"
import createPost from "../../server/api/post/index.post"
import type { ReducedPost } from "../../customTypes"

const endpointBasePath = "/post"
const endpoints: PathMethodHandler[] = [
    {
        path: endpointBasePath,
        method: "get",
        handler: getAllPosts,
    },
    {
        path: `${endpointBasePath}/:id`,
        method: "get",
        handler: getPostById,
    },
    {
        path: endpointBasePath,
        method: "post",
        handler: createPost,
    },
]

//let request: SuperTest<Test>
//beforeAll(async () => {
//    const testingUtils = await setupApiAndDatabase(endpoints)
//
//    request = testingUtils.request
//})

const testingUtils = await setupApiAndDatabase(endpoints)

const request = testingUtils.request

describe(`GET ${endpointBasePath}`, async () => {
    const response = await request.get(endpointBasePath)

    it("should have status 200", () => {
        expect(response.statusCode).toBe(200)
    })

    it("should return an array", () => {
        expect(response.body).toBeInstanceOf(Array)
    })

    it("should return an array of posts", () => {
        const posts = response.body as ReducedPost[]

        expect(posts[0]).toHaveProperty("id")
        expect(posts[0]).toHaveProperty("title")
        expect(posts[0]).toHaveProperty("text")
        expect(posts[0]).toHaveProperty("createdAt")
        expect(posts[0]).toHaveProperty("updatedAt")
        expect(posts[0]).toHaveProperty("authorId")
        expect(posts[0]).toHaveProperty("rating")
        expect(posts[0]).toHaveProperty("chosenFood")
        expect(posts[0]).toHaveProperty("restaurantId")
        expect(posts[0]).toHaveProperty("restaurant")
        expect(posts[0]).toHaveProperty("author")
        expect(posts[0]).toHaveProperty("favoriteAmount")
        expect(posts[0]).toHaveProperty("commentAmount")
        expect(posts[0]).toHaveProperty("isFavorite")
    })
})

describe(`GET ${endpointBasePath}/:id`, async () => {
    const response = await request.get(`${endpointBasePath}/1`)

    it("should have status 200", () => {
        expect(response.statusCode).toBe(200)
    })

    it("should return a post", () => {
        const post = response.body as ReducedPost

        expect(post).toHaveProperty("id")
        expect(post).toHaveProperty("title")
        expect(post).toHaveProperty("text")
        expect(post).toHaveProperty("createdAt")
        expect(post).toHaveProperty("updatedAt")
        expect(post).toHaveProperty("authorId")
        expect(post).toHaveProperty("rating")
        expect(post).toHaveProperty("chosenFood")
        expect(post).toHaveProperty("restaurantId")
        expect(post).toHaveProperty("restaurant")
        expect(post).toHaveProperty("author")
        expect(post).toHaveProperty("favoriteAmount")
        expect(post).toHaveProperty("commentAmount")
        expect(post).toHaveProperty("isFavorite")
    })
})

//describe(`POST ${endpointBasePath}`, async () => {
//    const response = await request.post(endpointBasePath).send({
//        title: "test title",
//        text: "test text",
//        rating: 5,
//        chosenFood: "test food",
//        restaurantId: 1,
//    })
//
//    it("should have status 200", () => {
//        expect(response.statusCode).toBe(200)
//    })
//
//    it("should return a post", () => {
//        const post = response.body as ReducedPost
//
//        expect(post).toHaveProperty("id")
//        expect(post).toHaveProperty("title")
//        expect(post).toHaveProperty("text")
//        expect(post).toHaveProperty("createdAt")
//        expect(post).toHaveProperty("updatedAt")
//        expect(post).toHaveProperty("authorId")
//        expect(post).toHaveProperty("rating")
//        expect(post).toHaveProperty("chosenFood")
//        expect(post).toHaveProperty("restaurantId")
//        expect(post).toHaveProperty("restaurant")
//        expect(post).toHaveProperty("author")
//        expect(post).toHaveProperty("favoriteAmount")
//        expect(post).toHaveProperty("commentAmount")
//        expect(post).toHaveProperty("isFavorite")
//    })
//})
//
