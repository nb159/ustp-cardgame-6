import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createDeck, shuffleDeck, formatTime } from '../gameUtils'

describe('gameUtils', () => {
  it('createDeck returns 16 cards with matching pairs and unique ids', () => {
    const deck = createDeck()
    expect(deck.length).toBe(16)

    const matchCounts = new Map<number, number>()
    const ids = new Set<string>()

    deck.forEach((c: any) => {
      matchCounts.set(c.matchId, (matchCounts.get(c.matchId) || 0) + 1)
      ids.add(c.id)
    })

    // each matchId should appear exactly twice
    for (const [, count] of matchCounts) {
      expect(count).toBe(2)
    }

    // ids should be unique
    expect(ids.size).toBe(deck.length)
  })

  it('shuffleDeck produces a deterministic result when Math.random is mocked', () => {
    const deck: any[] = [1, 2, 3, 4]

    // make Math.random always return 0.5 so shuffle is deterministic
    const randomMock = vi.spyOn(Math, 'random').mockImplementation(() => 0.5)

    const result = shuffleDeck(deck)

    // With Math.random === 0.5 the expected order is [1,4,2,3]
    expect(result).toEqual([1, 4, 2, 3])

    randomMock.mockRestore()
  })

  it('formatTime formats seconds as M:SS', () => {
    expect(formatTime(5)).toBe('0:05')
    expect(formatTime(65)).toBe('1:05')
    expect(formatTime(125)).toBe('2:05')
  })
})
