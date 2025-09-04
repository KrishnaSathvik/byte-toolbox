import { render } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { UuidGenerator } from '../UuidGenerator'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

// Mock uuid library
vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid-v4',
  v1: () => 'mocked-uuid-v1'
}))

// Helper function to render with router context
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('UuidGenerator', () => {
  it('renders generate button', () => {
    renderWithRouter(<UuidGenerator />)
    expect(screen.getByText('Generate UUIDs')).toBeInTheDocument()
  })

  it('generates UUID when button is clicked', () => {
    renderWithRouter(<UuidGenerator />)
    
    const generateButton = screen.getByText('Generate UUIDs')
    fireEvent.click(generateButton)
    
    // Check that UUIDs are generated and displayed
    expect(screen.getByText('Generated UUIDs (1)')).toBeInTheDocument()
    expect(screen.getByText('mocked-uuid-v4')).toBeInTheDocument()
  })

  it('allows selecting different UUID versions', () => {
    renderWithRouter(<UuidGenerator />)
    
    // Check for the preview format section
    expect(screen.getByText('Preview Format')).toBeInTheDocument()
  })

  it('copies UUID to clipboard when copy button is clicked', async () => {
    // Mock clipboard API
    const mockWriteText = vi.fn()
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    })

    renderWithRouter(<UuidGenerator />)
    
    const generateButton = screen.getByText('Generate UUIDs')
    fireEvent.click(generateButton)
    
    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.click(copyButton)
    
    expect(mockWriteText).toHaveBeenCalledWith('mocked-uuid-v4')
  })
})