import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../src/components/Login'

describe('Login', () => {
  it('should render login page with all elements', () => {
    render(<Login />)
    
    expect(screen.getByText(/What's Next - Login/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign In with Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('should have correct input attributes', () => {
    render(<Login />)
    
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email')
  })

  it('should update email input value when user types', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement
    await user.type(emailInput, 'test@example.com')
    
    expect(emailInput.value).toBe('test@example.com')
  })

  it('should log email and clear input on form submission', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const user = userEvent.setup()
    render(<Login />)
    
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Email submitted:', 'test@example.com')
      expect(emailInput.value).toBe('')
    })
    
    consoleSpy.mockRestore()
  })

  it('should have correct layout structure', () => {
    render(<Login />)
    
    const header = screen.getByText(/What's Next - Login/i).closest('header')
    const main = screen.getByText(/Sign In with Email/i).closest('main')
    const footer = screen.getByText(/All rights reserved/i).closest('footer')
    
    expect(header).toBeInTheDocument()
    expect(main).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })

  it('should submit form on Enter key press', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const user = userEvent.setup()
    render(<Login />)
    
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement
    
    await user.type(emailInput, 'test@example.com')
    await user.type(emailInput, '{Enter}')
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Email submitted:', 'test@example.com')
    })
    
    consoleSpy.mockRestore()
  })
})
