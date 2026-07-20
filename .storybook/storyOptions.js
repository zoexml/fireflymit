module.exports = {
  storySort: (a, b) => {
    const order = ['指南', 'UI', '工具']
    const g = order.findIndex(o => a.title.startsWith(o))
    const h = order.findIndex(o => b.title.startsWith(o))
    if (g !== -1 && h !== -1) return g - h
    if (g !== -1) return -1
    if (h !== -1) return 1
    if (a.title.startsWith('工具/') && b.title.startsWith('工具/')) {
      if (a.title.includes('总览')) return -1
      if (b.title.includes('总览')) return 1
    }
    return a.title.localeCompare(b.title)
  },
}
