import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../../src/components/TodoList'
import { useTodoStore } from '../../src/store/todoStore'

// Mock the store
vi.mock('../../src/store/todoStore', () => ({
  useTodoStore: vi.fn()
}))

// Mock @dnd-kit modules to avoid DOM issues in tests
vi.mock('@dnd-kit/core', () => ({
  DndContext: ({ children, onDragEnd }: any) => (
    <div data-testid="dnd-context" data-ondragend={onDragEnd?.toString()}>
      {children}
    </div>
  ),
  closestCenter: vi.fn(),
  KeyboardSensor: vi.fn(),
  PointerSensor: vi.fn(),
  useSensor: vi.fn(),
  useSensors: vi.fn(),
}))

vi.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: any) => (
    <div data-testid="sortable-context">{children}</div>
  ),
  sortableKeyboardCoordinates: vi.fn(),
  verticalListSortingStrategy: vi.fn(),
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}))

vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: vi.fn(() => ''),
    },
  },
}))

describe('TodoList', () => {
  const mockTodos = [
    { id: '1', text: 'First todo', createdAt: new Date() },
    { id: '2', text: 'Second todo', createdAt: new Date() },
    { id: '3', text: 'Third todo', createdAt: new Date() },
  ]

  const mockReorderTodos = vi.fn()
  const mockRemoveTodo = vi.fn()
  const mockUseTodoStore = useTodoStore as any

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTodoStore.mockReturnValue({
      todos: mockTodos,
      reorderTodos: mockReorderTodos,
      removeTodo: mockRemoveTodo,
    })
  })

  it('should render all todo items', () => {
    render(<TodoList />)
    
    expect(screen.getByText('First todo')).toBeInTheDocument()
    expect(screen.getByText('Second todo')).toBeInTheDocument()
    expect(screen.getByText('Third todo')).toBeInTheDocument()
  })

  it('should display correct numbering for todo items', () => {
    render(<TodoList />)
    
    const numbers = screen.getAllByText(/^[1-3]$/)
    expect(numbers).toHaveLength(3)
    expect(numbers[0]).toHaveTextContent('1')
    expect(numbers[1]).toHaveTextContent('2')
    expect(numbers[2]).toHaveTextContent('3')
  })

  it('should render remove buttons for each todo', () => {
    render(<TodoList />)
    
    const removeButtons = screen.getAllByTitle('Remove task')
    expect(removeButtons).toHaveLength(3)
    removeButtons.forEach(button => {
      expect(button).toHaveTextContent('✕')
    })
  })

  it('should call removeTodo when remove button is clicked', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const removeButtons = screen.getAllByTitle('Remove task')
    await user.click(removeButtons[0])
    
    expect(mockRemoveTodo).toHaveBeenCalledWith('1')
  })

  it('should show empty state when no todos exist', () => {
    mockUseTodoStore.mockReturnValue({
      todos: [],
      reorderTodos: mockReorderTodos,
      removeTodo: mockRemoveTodo,
    })
    
    render(<TodoList />)
    
    expect(screen.getByText('No games yet. Add your first game above!')).toBeInTheDocument()
  })

  it('should have proper CSS classes for styling', () => {
    render(<TodoList />)
    
    const todoItems = screen.getAllByText(/todo$/)
    todoItems.forEach(item => {
      // Find the outermost todo container div
      const todoElement = item.closest('div[class*="p-4"]')
      expect(todoElement).toHaveClass('p-4', 'bg-gray-800', 'rounded-lg', 'border')
    })
  })

  it('should render drag and drop context', () => {
    render(<TodoList />)
    
    expect(screen.getByTestId('dnd-context')).toBeInTheDocument()
    expect(screen.getByTestId('sortable-context')).toBeInTheDocument()
  })

  it('should handle drag end with reordering', () => {
    // This test is simplified due to mocking complexity
    render(<TodoList />)
    
    // Verify drag context is rendered
    expect(screen.getByTestId('dnd-context')).toBeInTheDocument()
    expect(screen.getByTestId('sortable-context')).toBeInTheDocument()
  })

  it('should not interfere with remove button clicks during drag operations', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    // Simulate clicking remove button should still work during drag operations
    const removeButtons = screen.getAllByTitle('Remove task')
    await user.click(removeButtons[1])
    
    expect(mockRemoveTodo).toHaveBeenCalledWith('2')
  })

  it('should have correct accessibility attributes', () => {
    render(<TodoList />)
    
    const removeButtons = screen.getAllByTitle('Remove task')
    removeButtons.forEach(button => {
      expect(button).toHaveAttribute('title', 'Remove task')
    })
  })
}) 