import { cn } from '../utils'
import { describe, it, expect } from 'vitest'

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
    })

    it('handles conditional classes', () => {
      const showConditional = true;
      const hideConditional = false;
      expect(cn('base-class', showConditional ? 'conditional-class' : undefined)).toBe('base-class conditional-class')
      expect(cn('base-class', hideConditional ? 'conditional-class' : undefined)).toBe('base-class')
    })

    it('handles tailwind merge conflicts', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    })

    it('handles empty inputs', () => {
      expect(cn()).toBe('')
      expect(cn('')).toBe('')
      expect(cn(null, undefined, '')).toBe('')
    })
  })
})