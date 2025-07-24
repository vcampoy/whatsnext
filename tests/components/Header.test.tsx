import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../../src/components/Header'

describe('Header', () => {
  it('should render the header with correct title', () => {
    render(<Header />)
    
    const title = screen.getByRole('heading', { name: /what's next/i })
    expect(title).toBeInTheDocument()
  })

  it('should have correct CSS classes for styling', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-blue-600', 'text-white', 'shadow-lg')
  })

  it('should render title with correct heading level', () => {
    render(<Header />)
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent("What's Next")
  })

  it('should have responsive container structure', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    const container = header.querySelector('.container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mx-auto', 'px-4', 'py-6')
  })
}) 