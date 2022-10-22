/*
import { createApp, createRouter } from "h3"
import type { CompatibilityEventHandler, RouterMethod } from "h3"
import type { SuperTest, Test } from "supertest"
import supertest from "supertest"

declare interface AppTestingUtils {
    request: SuperTest<Test>
}
export declare interface PathMethodHandler {
    path: string
    method: RouterMethod
    handler: CompatibilityEventHandler
}

export const setupAPI = async (
    routesToSetup: PathMethodHandler[]
): Promise<AppTestingUtils> => {
    const router = createRouter()

    for (const { path, method, handler } of routesToSetup) {
        router.add(path, handler, method)
    }

    const app = await createApp()
    app.use(router)

    return {
        request: supertest(app),
    }
}
*/
