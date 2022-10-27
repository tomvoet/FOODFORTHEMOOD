import { ZodError } from "zod"

export const createZodError = (e: unknown) => {
    if (e instanceof ZodError) {
        let errorMessage = ""
        e.errors.forEach((error) => {
            errorMessage += error.path.join(".") + ": " + error.message + "\n"
        })
        return errorMessage
    }
    return ""
}
