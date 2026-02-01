interface Snap {
    pay(token: string): void
}

interface Window {
    snap: Snap
}