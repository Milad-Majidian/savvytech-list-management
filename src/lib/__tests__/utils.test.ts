import { describe, it, expect } from 'vitest'
import { formatDate, dateFormats, cn } from '../utils'

describe('formatDate', () => {
  it('formats dates correctly with yyyy-MM-dd HH:mm format', () => {
    const date = new Date('2024-03-15T14:30:00')
    const result = formatDate(date, dateFormats.dateTime)
    expect(result).toBe('2024-03-15 14:30')
  })

  it('formats dates correctly with yyyy-MM-dd format', () => {
    const date = new Date('2024-03-15T14:30:00')
    const result = formatDate(date, dateFormats.date)
    expect(result).toBe('2024-03-15')
  })

  it('formats time correctly with HH:mm format', () => {
    const date = new Date('2024-03-15T14:30:00')
    const result = formatDate(date, dateFormats.time)
    expect(result).toBe('14:30')
  })

  it('handles string dates', () => {
    const result = formatDate('2024-03-15T14:30:00', dateFormats.dateTime)
    expect(result).toBe('2024-03-15 14:30')
  })

  it('handles number timestamps', () => {
    const timestamp = new Date('2024-03-15T14:30:00').getTime()
    const result = formatDate(timestamp, dateFormats.dateTime)
    expect(result).toBe('2024-03-15 14:30')
  })

  it('returns "Invalid Date" for invalid dates', () => {
    const result = formatDate('invalid-date', dateFormats.dateTime)
    expect(result).toBe('Invalid Date')
  })

  it('pads single digits correctly', () => {
    const date = new Date('2024-01-05T09:05:00')
    const result = formatDate(date, dateFormats.dateTime)
    expect(result).toBe('2024-01-05 09:05')
  })

  it('handles custom format patterns', () => {
    const date = new Date('2024-03-15T14:30:25')
    const result = formatDate(date, 'yyyy/MM/dd HH:mm:ss')
    expect(result).toBe('2024/03/15 14:30:25')
  })

  it('leaves unrecognized tokens unchanged', () => {
    const date = new Date('2024-03-15T14:30:00')
    const result = formatDate(date, 'yyyy-MM-dd at XXX')
    expect(result).toBe('2024-03-15 at XXX')
  })
})

describe('cn (className utility)', () => {
  it('merges class names correctly', () => {
    const result = cn('px-2 py-1', 'text-red-500')
    expect(result).toBe('px-2 py-1 text-red-500')
  })

  it('handles conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'ignored-class')
    expect(result).toBe('base-class conditional-class')
  })

  it('handles undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'valid-class')
    expect(result).toBe('base-class valid-class')
  })

  it('removes duplicate and conflicting Tailwind classes', () => {
    const result = cn('px-2 px-4', 'text-red-500 text-blue-500')
    // twMerge should handle conflicts (px-4 wins, text-blue-500 wins)
    expect(result).toContain('px-4')
    expect(result).toContain('text-blue-500')
    expect(result).not.toContain('px-2')
    expect(result).not.toContain('text-red-500')
  })
})