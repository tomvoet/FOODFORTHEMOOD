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
            const decoded = jwt.verify(
                token,
                "testhilfeichwillkeinscretschreibenwassolldas"
            )

            if (typeof decoded === "object") {
                event.context.user = decoded.data
            }
        } catch (err) {
            console.log(err)
            return {
                statusCode: 401,
                message: "Unauthorized, invalid Token",
            }
        }
    } else {
        const token = event.req.headers["authorization"]?.split(" ")[1]

        if (token) {
            try {
                const decoded = jwt.verify(
                    token,
                    "testhilfeichwillkeinscretschreibenwassolldas"
                )

                if (typeof decoded === "object") {
                    event.context.user = decoded.data
                }
            } catch (err) {}
        }
    }
})
