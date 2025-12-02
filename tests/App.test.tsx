import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

// Mock the Home and Login components
vi.mock('../src/components/Home', () => ({
  default: () => <div data-testid="home">Home Page</div>
}))

vi.mock('../src/components/Login', () => ({
  default: () => <div data-testid="login">Login Page</div>
}))

describe('App', () => {
  it('should render router', () => {
    render(<App />)
    
    // Should render the home page by default
    expect(screen.getByTestId('home')).toBeInTheDocument()
  })

  it('should render home page on root route', () => {
    render(<App />)
    
    expect(screen.getByTestId('home')).toBeInTheDocument()
  })
}) 