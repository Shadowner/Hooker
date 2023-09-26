
export function parseCookie(string: string) {
    const cookie = string.split(';').
        map(v => v.split('=')).
        reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: decodeURIComponent(value) }), {});
    return cookie;
}