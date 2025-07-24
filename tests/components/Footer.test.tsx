import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer'

describe('Footer', () => {
  it('should render copyright text with current year', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(`© ${currentYear} What's Next. All rights reserved.`)
    expect(copyright).toBeInTheDocument()
  })

  it('should have correct semantic HTML structure', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('bg-gray-800', 'text-gray-400')
  })

  it('should have proper styling classes', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    const container = footer.querySelector('.container')
    const text = footer.querySelector('p')
    
    expect(container).toHaveClass('mx-auto', 'px-4', 'py-4')
    expect(text).toHaveClass('text-center', 'text-sm')
  })

  it('should update year dynamically', () => {
    // Test that the footer displays a year between 2024-2030 (reasonable range)
    render(<Footer />)
    
    const footerElement = screen.getByRole('contentinfo')
    const yearPattern = /© (202[4-9]|203[0-9]) What's Next\. All rights reserved\./
    
    expect(footerElement).toHaveTextContent(yearPattern)
  })
}) 