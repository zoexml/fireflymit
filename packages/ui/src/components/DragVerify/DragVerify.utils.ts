export type DragVerifyWidth = number | string

export const toCssLength = (value: DragVerifyWidth): string => {
  return typeof value === 'number' ? `${value}px` : value
}

export const getDragTrackWidth = (width: DragVerifyWidth, element?: HTMLElement | null): number => {
  if (typeof width === 'number') return width

  const renderedWidth = element?.clientWidth ?? 0
  if (renderedWidth > 0) return renderedWidth

  const parsedWidth = Number.parseFloat(width)
  return Number.isFinite(parsedWidth) ? parsedWidth : 0
}

export const getDragLimit = (width: DragVerifyWidth, height: number, element?: HTMLElement | null): number => {
  return Math.max(getDragTrackWidth(width, element) - height, 0)
}
