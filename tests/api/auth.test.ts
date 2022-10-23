import { describe, expect, it } from "vitest"
import type { PathMethodHandler } from "../utils"
import { setupApiAndDatabase } from "../utils"
import loginHandler from "../../server/api/auth/login.post"

const endpointBasePath = "/auth"
const endpoints: PathMethodHandler[] = [
    {
        path: `${endpointBasePath}/login`,
        method: "post",
        handler: loginHandler,
    },
]

const testingUtils = await setupApiAndDatabase(endpoints)

const request = testingUtils.request

describe(`GET ${endpointBasePath}`, async () => {
    const response = await request.post(`${endpointBasePath}/login`).send({
        username: "admin",
        password: "AdminPw@123",
    })

    it("should have status 200", async () => {
        expect(response.statusCode).toBe(200)
    })

    it("should return a user object", async () => {
        expect(response.body).toHaveProperty("user")
        expect(response.body.user).toHaveProperty("username")
    })

    it("should return a token", async () => {
        expect(response.body).toHaveProperty("access_token")
    })

    it("should set a refresh token cookie", async () => {
        expect(response.headers["set-cookie"]).toBeDefined()
    })
})
