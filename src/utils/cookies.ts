import Cookies from 'js-cookie'

const TODOS_COOKIE_KEY = 'whatsnext-todos'
const COOKIE_EXPIRY_DAYS = 365

export interface TodoItem {
  id: string
  text: string
  createdAt: string // Store as ISO string for JSON serialization
}

/**
 * Save todos to browser cookies
 */
export const saveTodos = (todos: TodoItem[]): void => {
  try {
    const todosData = JSON.stringify(todos)
    Cookies.set(TODOS_COOKIE_KEY, todosData, { 
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'strict'
    })
  } catch (error) {
    console.error('Failed to save todos to cookies:', error)
  }
}

/**
 * Load todos from browser cookies
 */
export const loadTodos = (): TodoItem[] => {
  try {
    const todosData = Cookies.get(TODOS_COOKIE_KEY)
    
    if (!todosData) {
      return []
    }
    
    const parsedTodos = JSON.parse(todosData)
    
    // Validate the data structure
    if (!Array.isArray(parsedTodos)) {
      console.warn('Invalid todos data in cookies, returning empty array')
      return []
    }
    
    // Validate each todo item has required properties
    const validTodos = parsedTodos.filter((todo: any) => 
      todo && 
      typeof todo.id === 'string' && 
      typeof todo.text === 'string' && 
      typeof todo.createdAt === 'string'
    )
    
    return validTodos
  } catch (error) {
    console.error('Failed to load todos from cookies:', error)
    return []
  }
}

/**
 * Clear all todos from cookies
 */
export const clearTodos = (): void => {
  try {
    Cookies.remove(TODOS_COOKIE_KEY)
  } catch (error) {
    console.error('Failed to clear todos from cookies:', error)
  }
} 