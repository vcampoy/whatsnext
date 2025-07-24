import { create } from 'zustand'
import { saveTodos, loadTodos, type TodoItem } from '../utils/cookies'

interface TodoState {
  todos: TodoItem[]
  addTodo: (text: string) => void
  reorderTodos: (fromIndex: number, toIndex: number) => void
  removeTodo: (id: string) => void
  clearAllTodos: () => void
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: loadTodos(), // Load from cookies on initialization
  
  addTodo: (text: string) => set((state) => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: text.trim(),
      metacriticScore: 70,
      howLongToBeatHours: 0,
      createdAt: new Date().toISOString()
    }
    
    const updatedTodos = [...state.todos, newTodo]
    saveTodos(updatedTodos) // Save to cookies
    
    return { todos: updatedTodos }
  }),
  
  reorderTodos: (fromIndex: number, toIndex: number) => set((state) => {
    const updatedTodos = [...state.todos]
    const [removed] = updatedTodos.splice(fromIndex, 1)
    updatedTodos.splice(toIndex, 0, removed)
    
    saveTodos(updatedTodos) // Save to cookies
    
    return { todos: updatedTodos }
  }),
  
  removeTodo: (id: string) => set((state) => {
    const updatedTodos = state.todos.filter(todo => todo.id !== id)
    saveTodos(updatedTodos) // Save to cookies
    
    return { todos: updatedTodos }
  }),
    
  clearAllTodos: () => set(() => {
    saveTodos([]) // Clear cookies
    return { todos: [] }
  })
})) 