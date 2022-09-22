/*
import { Post } from "@prisma/client"
import type { Ref } from "vue"

export const getUserPostsLazy = (username: string) => {
    const posts: Ref<Post[]> = ref([])
    const status: Ref<number | null> = ref(null)

    const result = useLazyFetch<{
        status: number
        posts: Post[]
    }>(`/api/user/${username}/posts`, {
        key: `user/${username}/posts`,
    })

    result.then((data) => {
        status.value = result.data.value?.status
        posts.value = result.data.value?.posts
    })

    return {
        postsStatus: status,
        posts: posts,
    }
}

const { pending: postsPending, data: postsData } = useLazyFetch<{
    status: number
    posts: Post[]
}>(`/api/user/${route.params.username}/posts`, {
    key: `user/${username.value}/posts`,
})

const postsStatus: Ref<number | null> = ref(null)
const posts: Ref<Post[] | null> = ref(null)

watch(postsPending, (value) => {
    console.log(value)
    if (value) {
        console.log(value)
        //console.log(value.posts)
        //postsStatus.value = value.status
        //posts.value = value.posts
    }
})*/
