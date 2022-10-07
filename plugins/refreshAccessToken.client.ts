import { useUserStore } from "@/stores/userStore"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:created", async () => {
        const userStore = useUserStore()

        if (!userStore.loggedIn) {
            const res = await userStore.refresh_tokens()
            if (!res.success) {
                userStore.logout()
            }
        }
    })
})
