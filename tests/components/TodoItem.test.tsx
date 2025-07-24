import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import TodoItem from '../../src/components/TodoItem'

// Wrapper component to provide DnD context
function DndWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DndContext>
      <SortableContext items={['test-id']}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

describe('TodoItem', () => {
  const defaultProps = {
    id: 'test-id',
    index: 0,
    text: 'Test todo item',
    metacriticScore: 70,
    howLongToBeatHours: 0,
    onRemove: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render todo item with correct text and index', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    expect(screen.getByText('Test todo item')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument() // index + 1
    expect(screen.getByText('70')).toBeInTheDocument() // metacritic score
    expect(screen.getByText('0h')).toBeInTheDocument() // duration
  })

  it('should display correct numbering based on index', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} index={4} />
      </DndWrapper>
    )

    expect(screen.getByText('5')).toBeInTheDocument() // index + 1
  })

  it('should render remove button', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    const removeButton = screen.getByTitle('Remove task')
    expect(removeButton).toBeInTheDocument()
    expect(removeButton).toHaveTextContent('✕')
  })

  it('should call onRemove when remove button is clicked', () => {
    const mockOnRemove = vi.fn()

    render(
      <DndWrapper>
        <TodoItem {...defaultProps} onRemove={mockOnRemove} />
      </DndWrapper>
    )

    const removeButton = screen.getByTitle('Remove task')
    
    // Direct click event bypasses drag handling
    fireEvent.click(removeButton)

    expect(mockOnRemove).toHaveBeenCalledWith('test-id')
    expect(mockOnRemove).toHaveBeenCalledTimes(1)
  })

  it('should have proper CSS classes for styling', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    const todoItem = screen.getByRole('heading', { name: 'Test todo item' }).closest('div[class*="p-4"]')
    expect(todoItem).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm', 'border', 'border-gray-200')
  })

  it('should have cursor-move class for drag indication', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    const todoItem = screen.getByRole('heading', { name: 'Test todo item' }).closest('div[class*="cursor-move"]')
    expect(todoItem).toHaveClass('cursor-move')
  })

  it('should render numbered circle with correct styling', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} index={2} />
      </DndWrapper>
    )

    const numberCircle = screen.getByText('3') // index + 1
    expect(numberCircle).toHaveClass('bg-blue-100', 'text-blue-600', 'rounded-full')
  })

  it('should render text with correct styling', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    const todoText = screen.getByRole('heading', { name: 'Test todo item' })
    expect(todoText).toHaveClass('text-lg', 'font-semibold', 'text-gray-800')
  })

  it('should render remove button with correct styling', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    const removeButton = screen.getByTitle('Remove task')
    expect(removeButton).toHaveClass('text-red-500', 'hover:text-red-700', 'transition-colors')
  })

  it('should handle empty text', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} text="" />
      </DndWrapper>
    )

    // Should still render the structure
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByTitle('Remove task')).toBeInTheDocument()
  })

  it('should handle long text properly', () => {
    const longText = 'This is a very long todo item text that should be displayed properly without breaking the layout or causing any issues with the component rendering'
    
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} text={longText} />
      </DndWrapper>
    )

    expect(screen.getByRole('heading', { name: longText })).toBeInTheDocument()
  })

  it('should display metacritic score with correct color coding', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} metacriticScore={85} />
      </DndWrapper>
    )

    const scoreElement = screen.getByText('85')
    expect(scoreElement).toHaveClass('bg-green-500') // High score
    expect(screen.getByText('Metacritic:')).toBeInTheDocument()
  })

  it('should show yellow color for medium metacritic scores', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} metacriticScore={60} />
      </DndWrapper>
    )

    const scoreElement = screen.getByText('60')
    expect(scoreElement).toHaveClass('bg-yellow-500') // Medium score
  })

  it('should show red color for low metacritic scores', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} metacriticScore={30} />
      </DndWrapper>
    )

    const scoreElement = screen.getByText('30')
    expect(scoreElement).toHaveClass('bg-red-500') // Low score
  })

  it('should display how long to beat hours', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} howLongToBeatHours={25} />
      </DndWrapper>
    )

    expect(screen.getByText('25h')).toBeInTheDocument()
    expect(screen.getByText('Duration:')).toBeInTheDocument()
  })

  it('should render disabled G2A buy button', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    const buyButton = screen.getByTitle('Buy on G2A (Coming Soon)')
    expect(buyButton).toBeInTheDocument()
    expect(buyButton).toBeDisabled()
    expect(buyButton).toHaveClass('cursor-not-allowed')
    expect(buyButton).toHaveTextContent('Buy on G2A')
  })

  it('should have proper layout with title taking more space', () => {
    render(
      <DndWrapper>
        <TodoItem {...defaultProps} />
      </DndWrapper>
    )

    const titleElement = screen.getByRole('heading', { name: 'Test todo item' })
    expect(titleElement).toHaveClass('flex-1') // Should take available space
    expect(titleElement).toHaveClass('text-lg', 'font-semibold') // Larger and bolder
  })
}) 