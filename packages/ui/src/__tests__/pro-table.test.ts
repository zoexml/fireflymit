import { describe, expect, it } from 'vitest'
import {
  getPagedData,
  getRowValue,
  normalizePagination,
  resolveColumnKey,
} from '../components/ProTable/ProTable.utils'

const aliceRow = { id: 1, user: { name: 'Alice' } }
const bobRow = { id: 2, user: { name: 'Bob' } }
const carolRow = { id: 3, user: { name: 'Carol' } }

const rows = [aliceRow, bobRow, carolRow]

describe('pro table helpers', () => {
  it('keeps pagination disabled when configured as false', () => {
    const pagination = normalizePagination(false, rows.length)

    expect(pagination.enabled).toBe(false)
    expect(pagination.pageSize).toBe(20)
    expect(pagination.pageSizes).toEqual([20, 50, 100, 200])
    expect(pagination.layout).toBe('sizes, prev, pager, next, jumper')
    expect(getPagedData(rows, pagination)).toEqual(rows)
  })

  it('supports custom page sizes from pagination config', () => {
    const pagination = normalizePagination({ pageSizes: [30, 60], pageSize: 30 }, 120)

    expect(pagination.pageSize).toBe(30)
    expect(pagination.pageSizes).toEqual([30, 60])
  })

  it('slices local data when pagination is enabled', () => {
    const pagination = normalizePagination({ currentPage: 2, pageSize: 2 }, rows.length)

    expect(pagination.enabled).toBe(true)
    expect(getPagedData(rows, pagination)).toEqual([carolRow])
  })

  it('does not slice remote data', () => {
    const pagination = normalizePagination({ currentPage: 2, pageSize: 2, remote: true, total: 30 }, rows.length)

    expect(getPagedData(rows, pagination)).toEqual(rows)
  })

  it('reads nested row values and resolves stable column keys', () => {
    expect(getRowValue(aliceRow, 'user.name')).toBe('Alice')
    expect(resolveColumnKey({ prop: 'user.name' }, 0)).toBe('user.name')
    expect(resolveColumnKey({ key: 'actions' }, 1)).toBe('actions')
  })
})
