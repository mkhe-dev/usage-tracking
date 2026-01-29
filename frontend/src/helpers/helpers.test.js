import { describe, expect, test } from 'vitest'

import { applyMedals } from './helpers'

describe('applyMedals', () => {
  test('applies gold, silver, and bronze to top 3 teams with tokens > 0', () => {
    // given
    const input = [
      {name: 'Group 1', tokens: 10},
      {name: 'Group 2', tokens: 5},
      {name: 'Group 3', tokens: 1},
      {name: 'Group 4', tokens: 0}
    ]

    // when
    const result = applyMedals(input)

    // then
    expect(result[0].medal).toBe('🥇')
    expect(result[1].medal).toBe('🥈')
    expect(result[2].medal).toBe('🥉')
    expect(result[3].medal).toBeUndefined()
  })
})