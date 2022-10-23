import { describe, expect, it } from "vitest"
import type { PathMethodHandler } from "../utils"
import { setupApiAndDatabase } from "../utils"
import getUserByUsername from "../../server/api/user/[username].get"

const endpointBasePath = "/user"
const endpoints: PathMethodHandler[] = [
    {
        path: `${endpointBasePath}/:username`,
        method: "get",
        handler: getUserByUsername,
    },
]

const testingUtils = await setupApiAndDatabase(endpoints)

const request = testingUtils.request

describe(`GET ${endpointBasePath}`, async () => {
    const response = await request.get(`${endpointBasePath}/tomvoet`)
    it("should have status 200", async () => {
        expect(response.statusCode).toBe(200)
    })
})
