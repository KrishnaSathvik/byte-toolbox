import { render } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { UuidGenerator } from '../UuidGenerator'
import { describe, it, expect, vi } from 'vitest'

// Mock uuid library
vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid-v4',
  v1: () => 'mocked-uuid-v1'
}))

describe('UuidGenerator', () => {
  it('renders generate button', () => {
    render(<UuidGenerator />)
    expect(screen.getByText('Generate UUID')).toBeInTheDocument()
  })

  it('generates UUID when button is clicked', () => {
    render(<UuidGenerator />)
    
    const generateButton = screen.getByText('Generate UUID')
    fireEvent.click(generateButton)
    
    expect(screen.getByDisplayValue('mocked-uuid-v4')).toBeInTheDocument()
  })

  it('allows selecting different UUID versions', () => {
    render(<UuidGenerator />)
    
    // Should have version selector
    expect(screen.getByText('Version 4')).toBeInTheDocument()
  })

  it('copies UUID to clipboard when copy button is clicked', async () => {
    // Mock clipboard API
    const mockWriteText = vi.fn()
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    })

    render(<UuidGenerator />)
    
    const generateButton = screen.getByText('Generate UUID')
    fireEvent.click(generateButton)
    
    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.click(copyButton)
    
    expect(mockWriteText).toHaveBeenCalledWith('mocked-uuid-v4')
  })
})