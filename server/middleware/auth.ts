import jwt from "jsonwebtoken"

export default defineMiddleware(async (event) => {
    if (
        event.req.url?.includes("/api/") &&
        !event.req.method?.includes("GET") &&
        !event.req.url?.includes("/api/auth")
    ) {
        const token = event.req.headers["authorization"]?.split(" ")[1]
        if (!token) {
            return {
                statusCode: 401,
                message: "Unauthorized",
            }
        }

        try {
            const decoded = jwt.verify(token, "testhilfeichwillkeinscretschreibenwassolldas")
            const body = await useBody(event)
            if(typeof decoded  === "object") {
                body.user = decoded.data
            }
        } catch (err) {
            return {
                statusCode: 401,
                message: "Unauthorized",
            }
        }
    }
})
