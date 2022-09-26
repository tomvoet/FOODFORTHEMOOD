export const useTitleChunk = () => useState<string>('titleChunk', () => "")
export const useDescription = () => useState<string>('description', () => "")

export const setMetadata = (titleChunk: string, description: string) => {
    useTitleChunk().value = titleChunk
    useDescription().value = description
}