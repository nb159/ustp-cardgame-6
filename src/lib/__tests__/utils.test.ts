import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('utils.cn', () => {
  it('merges and resolves conflicting tailwind classes (twMerge behavior)', () => {
    const result = cn('p-2', 'p-3')
    // twMerge should keep the last conflicting padding class
    expect(result).toBe('p-3')
  })

  it('joins multiple class names and filters falsy values', () => {
    const result = cn('text-sm', false && 'hidden', 'font-bold')
    expect(result).toBe('text-sm font-bold')
  })
})
