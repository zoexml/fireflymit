// Inline sort function for Storybook preview
// Must be plain JS (no TypeScript annotations — Storybook evals this
const storySort = (a, b) => {
  const order = ['指南', 'UI', '工具']
  const aGroup = order.findIndex(o => a.title.startsWith(o))
  const bGroup = order.findIndex(o => b.title.startsWith(o))
  if (aGroup !== -1 && bGroup !== -1) return aGroup - bGroup
  if (aGroup !== -1) return -1
  if (bGroup !== -1) return 1
  if (a.title.startsWith('工具/') && b.title.startsWith('工具/')) {
    if (a.title.includes('总览')) return -1
    if (b.title.includes('总览')) return 1
  }
  return a.title.localeCompare(b.title)
}
module.exports = storySort
