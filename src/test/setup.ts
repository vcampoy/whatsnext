import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock DnD-kit's sensor APIs for testing
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
}) 