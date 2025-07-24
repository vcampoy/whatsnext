import { describe, it, expect } from 'vitest'
import { type TodoItem } from '../../src/utils/cookies'

describe('cookies utility types', () => {
  it('should have correct TodoItem interface', () => {
    const todo: TodoItem = {
      id: 'test-id',
      text: 'Test todo',
      metacriticScore: 70,
      howLongToBeatHours: 0,
      createdAt: new Date().toISOString()
    }

    expect(typeof todo.id).toBe('string')
    expect(typeof todo.text).toBe('string')
    expect(typeof todo.metacriticScore).toBe('number')
    expect(typeof todo.howLongToBeatHours).toBe('number')
    expect(typeof todo.createdAt).toBe('string')
    expect(new Date(todo.createdAt)).toBeInstanceOf(Date)
  })

  it('should handle ISO date strings correctly', () => {
    const isoString = '2025-01-01T00:00:00.000Z'
    const date = new Date(isoString)
    
    expect(date.toISOString()).toBe(isoString)
    expect(date).toBeInstanceOf(Date)
  })
}) 