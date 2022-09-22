import { User } from "@prisma/client"

export const useUserStore = defineStore("user", () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const loggedIn = ref<boolean>(false)

    const login = async (username: string, password: string) => {
        const { data } = await useFetch<{
            status: number
            user: User
            token: string
        }>(`/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
        })
        if (data.value?.status === 200) {
            user.value = data.value?.user
            token.value = data.value?.token
            loggedIn.value = true
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        loggedIn.value = false
    }

    return {
        user,
        token,
        loggedIn,
        login,
        logout,
    }
})

/*
export const useUserStore = defineStore("user", () => {
    const user = ref(null)
    const token = ref(null)
    const loggedIn = ref(false)

    const login = async (username: string, password: string) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })

        const data = await response.json()

        if (data.status === 200) {
            user.value = data.user
            token.value = data.user.token
            loggedIn.value = true
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        loggedIn.value = false
    }

    return {
        user,
        token,
        loggedIn,
        login,
        logout,
    }
})
*/
