import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoInput from '../../src/components/TodoInput'
import { useTodoStore } from '../../src/store/todoStore'

// Mock the store
vi.mock('../../src/store/todoStore', () => ({
  useTodoStore: vi.fn()
}))

describe('TodoInput', () => {
  const mockAddTodo = vi.fn()
  const mockUseTodoStore = useTodoStore as any

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTodoStore.mockReturnValue(mockAddTodo)
  })

  it('should render input field and add button', () => {
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should update input value when typing', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    
    await user.type(input, 'New todo item')
    
    expect(input).toHaveValue('New todo item')
  })

  it('should call addTodo when button is clicked with valid input', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.type(input, 'Test todo')
    await user.click(button)
    
    expect(mockAddTodo).toHaveBeenCalledWith('Test todo')
  })

  it('should call addTodo when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    
    await user.type(input, 'Test todo{enter}')
    
    expect(mockAddTodo).toHaveBeenCalledWith('Test todo')
  })

  it('should clear input after adding todo via button', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.type(input, 'Test todo')
    await user.click(button)
    
    expect(input).toHaveValue('')
  })

  it('should clear input after adding todo via Enter key', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    
    await user.type(input, 'Test todo{enter}')
    
    expect(input).toHaveValue('')
  })

  it('should not add todo when input is empty', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.click(button)
    
    expect(mockAddTodo).not.toHaveBeenCalled()
  })

  it('should not add todo when input contains only whitespace', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    await user.type(input, '   ')
    await user.click(button)
    
    expect(mockAddTodo).not.toHaveBeenCalled()
  })

  it('should prevent form submission with empty input', () => {
    render(<TodoInput />)
    
    const form = screen.getByRole('textbox').closest('form')!
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    
    fireEvent(form, submitEvent)
    
    expect(mockAddTodo).not.toHaveBeenCalled()
  })

  it('should have proper accessibility attributes', () => {
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    expect(input).toHaveAttribute('type', 'text')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('should have proper CSS classes for styling', () => {
    render(<TodoInput />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add' })
    
    expect(input).toHaveClass('flex-1', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-lg')
    expect(button).toHaveClass('px-6', 'py-2', 'bg-blue-600', 'text-white', 'rounded-lg')
  })
}) 