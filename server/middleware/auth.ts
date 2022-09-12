import jwt from "jsonwebtoken"

export default defineMiddleware((event) => {
    if (
        event.req.url?.includes("/api/") &&
        !event.req.method?.includes("GET") &&
        !event.req.url?.includes("/api/auth")
    ) {
        const token = event.req.headers["authorization"]
        if (!token) {
            return {
                statusCode: 401,
                message: "Unauthorized",
            }
        }

        try {
            const decoded = jwt.verify(token, "test")
            //event.req.user = decoded
        } catch (err) {
            return {
                statusCode: 401,
                message: "Unauthorized",
            }
        }
    }
})
