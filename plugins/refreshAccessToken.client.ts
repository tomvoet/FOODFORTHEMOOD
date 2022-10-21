import { useUserStore } from "@/stores/userStore"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:created", async () => {
        const userStore = useUserStore()

        if (!userStore.loggedIn) {
            await userStore.refresh_tokens()
        }
    })
})
