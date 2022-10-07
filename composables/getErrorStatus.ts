import { FetchError } from "ohmyfetch"

export const getErrorStatus = (
    error: unknown
): {
    code: number
    message: string
} => {
    if (error instanceof FetchError) {
        if (
            error.data?.statusMessage !== undefined &&
            error.data?.statusCode !== undefined
        ) {
            return {
                code: error.data.statusCode,
                message: error.data.statusMessage,
            }
        } else {
            return {
                code: 500,
                message: "Internal Server Error",
            }
        }
    } else {
        console.error(error)
        return {
            code: 500,
            message: "Internal Server Error",
        }
    }
}
