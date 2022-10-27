import { createZodError } from "../../../server/services/createZodError"
import { describe, it, expect } from "vitest"
import { userSchema } from "../../../utils/validation_schemas"

describe("createZodError", () => {
    let errorWrongValue = null as unknown as Error
    try {
        userSchema.partial().parse({
            username: "test",
            email: "test",
        })
    } catch (e) {
        errorWrongValue = e as Error
    }

    it("should return an error message for wrong value", () => {
        expect(createZodError(errorWrongValue)).toBe("email: Invalid email\n")
    })

    let errorMissingValue = null as unknown as Error
    try {
        userSchema.parse({
            username: "test",
            email: "test@test.de",
            password: "Test@123",
            bio: "test",
        })
    } catch (e) {
        errorMissingValue = e as Error
    }

    it("should return an error message for missing value", () => {
        expect(createZodError(errorMissingValue)).toBe("image: Required\n")
    })

    let errorWrongType = null as unknown as Error
    try {
        userSchema.parse({
            username: "test",
            email: 3,
            password: "Test@123",
            bio: "test",
            image: "test",
        })
    } catch (e) {
        errorWrongType = e as Error
    }

    it("should return an error message for wrong type", () => {
        expect(createZodError(errorWrongType)).toBe(
            "email: Expected string, received number\n"
        )
    })

    it("should return an empty string if no error is passed", () => {
        expect(createZodError(null)).toBe("")
    })
})
