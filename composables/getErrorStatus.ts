import { FetchError } from "ohmyfetch"

/**
 * returns the status code and message of an error
 * @param error error object
 * @returns {code: number, message: string} status code and message
 */
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
