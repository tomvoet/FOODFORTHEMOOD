import { ZodError } from "zod"

export const displayValidationErrors = (e: unknown) => {
    if (e instanceof ZodError) {
        let errorMessage = ""
        e.errors.forEach((error) => {
            errorMessage += error.path.join(".") + ": " + error.message + "\n"
        })
        alert(errorMessage)
        return
    }
}
