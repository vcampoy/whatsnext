import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoStore } from '../../src/store/todoStore'

describe('todoStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useTodoStore.setState({ todos: [] })
  })

  describe('initial state', () => {
    it('should have empty todos array initially', () => {
      const { todos } = useTodoStore.getState()
      expect(todos).toEqual([])
    })
  })

  describe('addTodo', () => {
    it('should add a new todo item', () => {
      const { addTodo } = useTodoStore.getState()
      
      addTodo('Test todo')
      
      const { todos } = useTodoStore.getState()
      expect(todos).toHaveLength(1)
      expect(todos[0].text).toBe('Test todo')
      expect(todos[0].id).toBeDefined()
      expect(todos[0].metacriticScore).toBe(70)
      expect(todos[0].howLongToBeatHours).toBe(0)
      expect(typeof todos[0].createdAt).toBe('string')
      expect(new Date(todos[0].createdAt)).toBeInstanceOf(Date)
    })

    it('should trim whitespace from todo text', () => {
      const { addTodo } = useTodoStore.getState()
      
      addTodo('  Test todo with spaces  ')
      
      const { todos } = useTodoStore.getState()
      expect(todos[0].text).toBe('Test todo with spaces')
    })

    it('should add multiple todos in correct order', () => {
      const { addTodo } = useTodoStore.getState()
      
      addTodo('First todo')
      addTodo('Second todo')
      addTodo('Third todo')
      
      const { todos } = useTodoStore.getState()
      expect(todos).toHaveLength(3)
      expect(todos[0].text).toBe('First todo')
      expect(todos[1].text).toBe('Second todo')
      expect(todos[2].text).toBe('Third todo')
    })

    it('should generate unique ids for each todo', () => {
      const { addTodo } = useTodoStore.getState()
      
      addTodo('Todo 1')
      addTodo('Todo 2')
      
      const { todos } = useTodoStore.getState()
      expect(todos[0].id).not.toBe(todos[1].id)
    })
  })

  describe('reorderTodos', () => {
    beforeEach(() => {
      const { addTodo } = useTodoStore.getState()
      addTodo('First')
      addTodo('Second')
      addTodo('Third')
    })

    it('should move todo from beginning to end', () => {
      const { reorderTodos } = useTodoStore.getState()
      
      reorderTodos(0, 2)
      
      const { todos } = useTodoStore.getState()
      expect(todos[0].text).toBe('Second')
      expect(todos[1].text).toBe('Third')
      expect(todos[2].text).toBe('First')
    })

    it('should move todo from end to beginning', () => {
      const { reorderTodos } = useTodoStore.getState()
      
      reorderTodos(2, 0)
      
      const { todos } = useTodoStore.getState()
      expect(todos[0].text).toBe('Third')
      expect(todos[1].text).toBe('First')
      expect(todos[2].text).toBe('Second')
    })

    it('should move todo to middle position', () => {
      const { reorderTodos } = useTodoStore.getState()
      
      reorderTodos(0, 1)
      
      const { todos } = useTodoStore.getState()
      expect(todos[0].text).toBe('Second')
      expect(todos[1].text).toBe('First')
      expect(todos[2].text).toBe('Third')
    })

    it('should not change order when moving to same position', () => {
      const { reorderTodos } = useTodoStore.getState()
      const initialTodos = useTodoStore.getState().todos
      
      reorderTodos(1, 1)
      
      const { todos } = useTodoStore.getState()
      expect(todos).toEqual(initialTodos)
    })
  })

  describe('removeTodo', () => {
    let todoIds: string[]

    beforeEach(() => {
      const { addTodo } = useTodoStore.getState()
      addTodo('First')
      addTodo('Second')
      addTodo('Third')
      todoIds = useTodoStore.getState().todos.map(todo => todo.id)
    })

    it('should remove todo by id', () => {
      const { removeTodo } = useTodoStore.getState()
      
      removeTodo(todoIds[1])
      
      const { todos } = useTodoStore.getState()
      expect(todos).toHaveLength(2)
      expect(todos[0].text).toBe('First')
      expect(todos[1].text).toBe('Third')
    })

    it('should remove first todo', () => {
      const { removeTodo } = useTodoStore.getState()
      
      removeTodo(todoIds[0])
      
      const { todos } = useTodoStore.getState()
      expect(todos).toHaveLength(2)
      expect(todos[0].text).toBe('Second')
      expect(todos[1].text).toBe('Third')
    })

    it('should remove last todo', () => {
      const { removeTodo } = useTodoStore.getState()
      
      removeTodo(todoIds[2])
      
      const { todos } = useTodoStore.getState()
      expect(todos).toHaveLength(2)
      expect(todos[0].text).toBe('First')
      expect(todos[1].text).toBe('Second')
    })

    it('should not change todos when removing non-existent id', () => {
      const { removeTodo } = useTodoStore.getState()
      const initialTodos = useTodoStore.getState().todos
      
      removeTodo('non-existent-id')
      
      const { todos } = useTodoStore.getState()
      expect(todos).toEqual(initialTodos)
    })

    it('should remove all todos when called for each', () => {
      const { removeTodo } = useTodoStore.getState()
      
      todoIds.forEach(id => removeTodo(id))
      
      const { todos } = useTodoStore.getState()
      expect(todos).toHaveLength(0)
    })
  })
}) 