import { ZodError } from "zod"
import { useToasts } from "./states"

type Toast = {
    message: string
    type: "success" | "error" | "info"
    start: Date
}

export const displayValidationErrors = (e: unknown) => {
    if (e instanceof ZodError) {
        const errors: string[] = []
        e.errors.forEach((error) => {
            errors.push(error.path.join(".") + ": " + error.message)
        })

        const toasts: Toast[] = []

        errors.forEach((error) => {
            toasts.push({
                message: error,
                type: "error",
                start: new Date(),
            })
        })

        useToasts().value.push(...toasts)
    }
}
