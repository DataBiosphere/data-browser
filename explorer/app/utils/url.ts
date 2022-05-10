export const convertUrlParams = (params: Record<string, string>) => {
    if (typeof window === 'undefined') {
        return new global.URLSearchParams(params).toString()
    }
    return new URLSearchParams(params).toString()
}