import { expect, describe, it } from "vitest"
import { $fetch, setup } from "@nuxt/test-utils-edge"
import { Post } from "@prisma/client"

await setup({
    server: true,
})

describe("getPosts - homePage", () => {
    it("should return 200", async () => {
        const response = await $fetch("/api/post")
        expect(response.status).toBe(200)
    })
    it("should return posts", async () => {
        const res = await $fetch("/api/post")
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.posts)).toBeTruthy()
        expect(res.posts.length).toBeGreaterThan(0)
    })
    it("should return valid posts", async () => {
        const res: { status: number; posts: Post[] } = await $fetch("/api/post")
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.posts)).toBeTruthy()
        expect(res.posts.length).toBeGreaterThan(0)
        res.posts.forEach((post: Post) => {
            expect(post.id).toBeTruthy()
            expect(post.title).toBeTruthy()
            expect(post.content).toBeTruthy()
            expect(post.authorId).toBeTruthy()
            expect(post.createdAt).toBeTruthy()
        })
    })
    it("should return posts with pagination", async () => {
        const res = await $fetch("/api/post?limit=2&offset=1")
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.posts)).toBeTruthy()
        expect(res.posts.length).toEqual(2)
    })
})
