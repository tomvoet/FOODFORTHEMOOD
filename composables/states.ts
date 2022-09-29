export const useTitleChunk = () => useState<string>("titleChunk", () => "")
export const useDescription = () => useState<string>("description", () => "")

/**
 * set Metadata states
 * @function setMetadata
 * @param {string} titleChunk - title chunk, is inserted into the template
 * @param {string} description - description of the page
 */
export const setMetadata = (titleChunk: string, description: string) => {
    useTitleChunk().value = titleChunk
    useDescription().value = description
}
