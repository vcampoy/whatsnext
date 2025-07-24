import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Container from '../../src/components/Container'

// Mock the TodoInput and TodoList components
vi.mock('../../src/components/TodoInput', () => ({
  default: () => <div data-testid="todo-input">TodoInput Component</div>
}))

vi.mock('../../src/components/TodoList', () => ({
  default: () => <div data-testid="todo-list">TodoList Component</div>
}))

describe('Container', () => {
  it('should render TodoInput component', () => {
    render(<Container />)
    
    const todoInput = screen.getByTestId('todo-input')
    expect(todoInput).toBeInTheDocument()
    expect(todoInput).toHaveTextContent('TodoInput Component')
  })

  it('should render TodoList component', () => {
    render(<Container />)
    
    const todoList = screen.getByTestId('todo-list')
    expect(todoList).toBeInTheDocument()
    expect(todoList).toHaveTextContent('TodoList Component')
  })

  it('should render children when provided', () => {
    render(
      <Container>
        <div data-testid="child-element">Child Content</div>
      </Container>
    )
    
    const childElement = screen.getByTestId('child-element')
    expect(childElement).toBeInTheDocument()
    expect(childElement).toHaveTextContent('Child Content')
  })

  it('should have correct semantic HTML structure', () => {
    render(<Container />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('should have proper CSS classes for layout', () => {
    render(<Container />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1', 'container', 'mx-auto', 'px-4', 'py-8')
  })

  it('should render TodoInput before TodoList', () => {
    render(<Container />)
    
    const main = screen.getByRole('main')
    const children = Array.from(main.children)
    
    expect(children[0]).toHaveAttribute('data-testid', 'todo-input')
    expect(children[1]).toHaveAttribute('data-testid', 'todo-list')
  })
}) 