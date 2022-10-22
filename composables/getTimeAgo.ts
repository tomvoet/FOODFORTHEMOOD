export const getTimeAgo = (date: Date) => {
    const now = new Date()
    const dateFixed = new Date(date)
    const seconds = Math.round((now.getTime() - dateFixed.getTime()) / 1000)
    const minutes = Math.round(seconds / 60)
    const hours = Math.round(minutes / 60)
    const days = Math.round(hours / 24)
    const weeks = Math.round(days / 7)
    const months = Math.round(days / 30)
    const years = Math.round(days / 365)
    if (seconds < 60) {
        return "just now"
    }
    if (minutes < 60) {
        return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`
    }
    if (hours < 24) {
        return `${hours} ${hours > 1 ? "hours" : "hour"} ago`
    }
    if (days < 7) {
        return `${days} ${days > 1 ? "days" : "day"} ago`
    }
    if (weeks < 4) {
        return `${weeks} ${weeks > 1 ? "weeks" : "week"} ago`
    }
    if (months < 12) {
        return `${months} ${months > 1 ? "months" : "month"} ago`
    }
    return `${years} ${years > 1 ? "years" : "year"} ago`
}
