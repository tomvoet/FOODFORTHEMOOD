import { expect } from "chai"
import { describe, it } from "vitest"
import { $fetch, setup } from "@nuxt/test-utils-edge"

await setup({
    server: true,
})

describe("getPosts - homePage", () => {
    it("should return posts", async () => {
        const res = await $fetch("/api/post")
        expect(res.status).to.equal(200)
    })
})
