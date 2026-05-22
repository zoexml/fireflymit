export const devWarn = (...args: unknown[]): void => {
  if (import.meta.env?.DEV) {
    console.warn(...args)
  }
}
