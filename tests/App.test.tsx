import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

// Mock all child components
vi.mock('../src/components/Header', () => ({
  default: () => <header data-testid="header">Header Component</header>
}))

vi.mock('../src/components/Container', () => ({
  default: () => <main data-testid="container">Container Component</main>
}))

vi.mock('../src/components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer Component</footer>
}))

describe('App', () => {
  it('should render all main components', () => {
    render(<App />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should have correct layout structure', () => {
    render(<App />)
    
    const appContainer = screen.getByTestId('header').parentElement
    expect(appContainer).toHaveClass('min-h-screen', 'flex', 'flex-col', 'bg-gray-900')
  })

  it('should render components in correct order', () => {
    render(<App />)
    
    const appContainer = screen.getByTestId('header').parentElement
    const children = Array.from(appContainer!.children)
    
    expect(children[0]).toHaveAttribute('data-testid', 'header')
    expect(children[1]).toHaveAttribute('data-testid', 'container')
    expect(children[2]).toHaveAttribute('data-testid', 'footer')
  })

  it('should have proper CSS classes for full height layout', () => {
    render(<App />)
    
    const appContainer = screen.getByTestId('header').parentElement
    expect(appContainer).toHaveClass('min-h-screen')
  })

  it('should use flexbox layout for proper spacing', () => {
    render(<App />)
    
    const appContainer = screen.getByTestId('header').parentElement
    expect(appContainer).toHaveClass('flex', 'flex-col')
  })
}) 