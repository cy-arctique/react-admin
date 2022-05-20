export const rm = (key: string) => {
    return localStorage.removeItem(key)
}

export const get = (key: string): string | null => {
    return localStorage.getItem(key)
}

export const set = (key: string, value: string) => {
    return localStorage.setItem(key, value)
}

export const clear = () => {
    return localStorage.clear()
}