import { User } from "@prisma/client"

export const useUserStore = defineStore("user", () => {
    const user = ref<{
        username: string
    } | null>(null)
    const token = ref<string | null>(null)
    const loggedIn = ref(false)

    /**
     * (synchronously) login user & save user data to pinia
     * @function login
     * @param {string} username username of user
     * @param {string} password password of user
     * @return {{ success: boolean, message: string }}
     */
    const login = async (username: string, password: string) => {
        try {
            const res = await $fetch<{
                user: {
                    username: string
                }
                access_token: string
                refresh_token: string
            }>("/api/auth/login", {
                method: "POST",
                body: { username, password },
            })
            if (res.user && res.access_token) {
                user.value = res.user
                token.value = res.access_token
                loggedIn.value = true
                return { success: true, message: "Successfully logged in" }
            } else {
                return { success: false, message: "Could not log in" }
            }
        } catch (err) {
            return { success: false, message: getErrorStatus(err).message }
        }
    }

    /**
     * (synchronously) logout user & clear user data from pinia
     * @function logout
     * @param {string} username username of user
     * @param {string} password password of user
     * @returns {Promise<void>}
     * @author Tom Voet
     * @since 1.0.0
     * @version 1.0.0
     * @license MIT
     * @see test
     * @todo test
     * @deprecated test
     * @example test
     */
    const logout = async () => {
        try {
            const res = await $fetch<{ success: boolean }>("/api/auth/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
                body: { username: user.value?.username },
            })

            if (res.success) {
                user.value = null
                token.value = null
                loggedIn.value = false
                return { success: true, message: "Successfully logged out" }
            }
        } catch (err) {
            return { success: false, message: getErrorStatus(err).message }
        }
    }

    const refresh_tokens = async () => {
        try {
            const res = await $fetch<{
                user: {
                    username: string
                }
                access_token: string
            }>("/api/auth/refresh_token", {
                method: "GET",
            })

            if (res.access_token && res.user) {
                token.value = res.access_token
                user.value = res.user
                loggedIn.value = true

                return {
                    success: true,
                    message: "Successfully refreshed tokens",
                }
            } else {
                return { success: false, message: "Could not refresh tokens" }
            }
        } catch (err) {
            return { success: false, message: getErrorStatus(err).message }
        }
    }

    return {
        user,
        token,
        loggedIn,
        login,
        logout,
        refresh_tokens,
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
