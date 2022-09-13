import { expect, describe, it } from "vitest"
import { $fetch, setup } from "@nuxt/test-utils-edge"
import { Post, User } from "@prisma/client"

await setup({
    server: true,
})

describe("API - getPosts (homePage)", () => {
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
describe("API - get post", () => {
    it("should return 200", async () => {
        const response = await $fetch("/api/post/4")
        expect(response.status).toBe(200)
    })
    it("should return post", async () => {
        const res = await $fetch("/api/post/4")
        expect(res.status).toEqual(200)
        expect(res.post).toBeTruthy()
    })
    it("should return valid post", async () => {
        const res: { status: number; post: Post } = await $fetch("/api/post/4")
        expect(res.status).toEqual(200)
        expect(res.post).toBeTruthy()
        expect(res.post.id).toBeTruthy()
        expect(res.post.title).toBeTruthy()
        expect(res.post.content).toBeTruthy()
        expect(res.post.authorId).toBeTruthy()
        expect(res.post.createdAt).toBeTruthy()
    })
})
describe("API - get users", () => {
    it("should return 200", async () => {
        const response = await $fetch("/api/user")
        expect(response.status).toBe(200)
    })
    it("should return users", async () => {
        const res = await $fetch("/api/user")
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.users)).toBeTruthy()
        expect(res.users.length).toBeGreaterThan(0)
    })
    it("should return valid users", async () => {
        const res: { status: number; users: User[] } = await $fetch("/api/user")
        res.users.forEach((user: User) => {
            expect(user.id).toBeTruthy()
            expect(user.username).toBeTruthy()
            expect(user.email).toBeTruthy()
            expect(user.createdAt).toBeTruthy()
        })
    })
    it("should return users with pagination", async () => {
        const res = await $fetch("/api/user?limit=2&offset=1")
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.users)).toBeTruthy()
        expect(res.users.length).toEqual(2)
    })
})
describe("API - getUser", () => {
    it("should return 200", async () => {
        const response = await $fetch("/api/user/apitest")
        expect(response.status).toBe(200)
    })
    it("should return a user", async () => {
        const res = await $fetch("/api/user/apitest")
        expect(res.status).toEqual(200)
        expect(res.user).toBeTruthy()
    })
    it("should return a valid user", async () => {
        const res: { status: number; user: User } = await $fetch(
            "/api/user/apitest"
        )
        expect(res.user.id).toBeTruthy()
        expect(res.user.username).toBeTruthy()
        expect(res.user.bio).toBeTruthy()
        expect(res.user.image).toBeTruthy()
    })
})
describe("API - get posts of user", () => {
    it("should return 200", async () => {
        const response = await $fetch("/api/user/apitest/posts")
        expect(response.status).toBe(200)
    })
    it("should return posts", async () => {
        const res = await $fetch("/api/user/apitest/posts")
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.posts)).toBeTruthy()
        expect(res.posts.length).toBeGreaterThan(0)
    })
    it("should return valid posts", async () => {
        const res: { status: number; posts: Post[] } = await $fetch(
            "/api/user/apitest/posts"
        )
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
        const res = await $fetch("/api/user/apitest/posts?limit=2&offset=1")
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.posts)).toBeTruthy()
        expect(res.posts.length).toEqual(2)
    })
})
