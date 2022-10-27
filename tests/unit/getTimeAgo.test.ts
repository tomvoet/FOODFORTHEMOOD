import { getTimeAgo } from "../../composables/getTimeAgo"
import { describe, it, expect } from "vitest"

describe("getTimeAgo", () => {
    it("should return 'just now' when the date is less than 1 minute ago", () => {
        const date = new Date()
        const result = getTimeAgo(date)
        expect(result).toBe("just now")
    })
    it("should return a correct minute value", () => {
        const date = new Date()
        date.setMinutes(date.getMinutes() - 2)
        expect(getTimeAgo(date)).toBe("2 minutes ago")
    })
    it("should return a correct hour value", () => {
        const date = new Date()
        date.setHours(date.getHours() - 2)
        expect(getTimeAgo(date)).toBe("2 hours ago")
    })
    it("should return a correct day value", () => {
        const date = new Date()
        date.setDate(date.getDate() - 2)
        expect(getTimeAgo(date)).toBe("2 days ago")
    })
    it("should return a correct month value", () => {
        const date = new Date()
        date.setMonth(date.getMonth() - 2)
        expect(getTimeAgo(date)).toBe("2 months ago")
    })
    it("should return a correct year value", () => {
        const date = new Date()
        date.setFullYear(date.getFullYear() - 2)
        expect(getTimeAgo(date)).toBe("2 years ago")
    })
})
