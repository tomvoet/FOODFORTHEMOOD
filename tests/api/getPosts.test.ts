import { beforeEach, describe, expect, it } from "vitest"
import type { SuperTest, Test } from "supertest"
import type { PathMethodHandler } from "../utils"
import { setupApiAndDatabase } from "../utils"
import handlerExampleGet from "../../server/api/post/index.get"

const endpointBasePath = "/post"
const endpoints: PathMethodHandler[] = [
    {
        path: endpointBasePath,
        method: "get",
        handler: handlerExampleGet,
    },
]

let request: SuperTest<Test>
beforeEach(async () => {
    const testingUtils = await setupApiAndDatabase(endpoints)

    request = testingUtils.request
})

describe(`GET ${endpointBasePath}`, () => {
    it("should have status 200", async () => {
        const response = await request.get(endpointBasePath)

        expect(response.statusCode).toBe(200)
    })
})
