import { create } from 'zustand'

interface TodoItem {
  id: string
  text: string
  createdAt: Date
}

interface TodoState {
  todos: TodoItem[]
  addTodo: (text: string) => void
  reorderTodos: (fromIndex: number, toIndex: number) => void
  removeTodo: (id: string) => void
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  
  addTodo: (text: string) => set((state) => ({
    todos: [
      ...state.todos,
      {
        id: crypto.randomUUID(),
        text: text.trim(),
        createdAt: new Date()
      }
    ]
  })),
  
  reorderTodos: (fromIndex: number, toIndex: number) => set((state) => {
    const newTodos = [...state.todos]
    const [removed] = newTodos.splice(fromIndex, 1)
    newTodos.splice(toIndex, 0, removed)
    return { todos: newTodos }
  }),
  
  removeTodo: (id: string) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
})) 