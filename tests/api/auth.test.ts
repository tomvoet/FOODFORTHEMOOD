import { describe, expect, it } from "vitest"
import type { PathMethodHandler } from "../utils"
import { setupApiAndDatabase } from "../utils"
import loginHandler from "../../server/api/auth/login.post"
import refreshTokenHandler from "../../server/api/auth/refresh_token"

const endpointBasePath = "/auth"
const endpoints: PathMethodHandler[] = [
    {
        path: `${endpointBasePath}/login`,
        method: "post",
        handler: loginHandler,
    },
    {
        path: `${endpointBasePath}/refresh_token`,
        method: "get",
        handler: refreshTokenHandler,
    },
]

const testingUtils = await setupApiAndDatabase(endpoints)

const request = testingUtils.request

let refresh_token = ""

describe(`/auth`, async () => {
    describe("POST /login", async () => {
        describe("with valid credentials", async () => {
            const response = await request
                .post(`${endpointBasePath}/login`)
                .send({
                    username: "admin",
                    password: "AdminPw@123",
                })
            refresh_token = response.headers["set-cookie"][0]
                .split(";")[0]
                .split("=")[1]

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
                expect(response.headers["set-cookie"][0]).toMatch(
                    /refresh_token/
                )
            })
        })
        describe("with invalid credentials", async () => {
            const response = await request
                .post(`${endpointBasePath}/login`)
                .send({
                    username: "admin",
                    password: "wrongpassword",
                })

            it("should have status 401", async () => {
                expect(response.statusCode).toBe(401)
            })
            it("should return an error message", async () => {
                expect(response.body).toHaveProperty("statusMessage")
                expect(response.body.statusMessage).toBe("Unauthorized")
            })
        })
    })
    describe("GET /refresh_token", async () => {
        describe("with valid refresh token", async () => {
            const response = await request
                .get(`${endpointBasePath}/refresh_token`)
                .set("Cookie", `refresh_token=${refresh_token}`)

            it("should have status 200", async () => {
                expect(response.statusCode).toBe(200)
            })

            it("should return a token", async () => {
                expect(response.body).toHaveProperty("access_token")
            })
        })
        describe("with invalid refresh token", async () => {
            const response = await request
                .get(`${endpointBasePath}/refresh_token`)
                .set("Cookie", `refresh_token=invalidtoken`)

            it("should have status 401", async () => {
                expect(response.statusCode).toBe(401)
            })
        })
    })
})
