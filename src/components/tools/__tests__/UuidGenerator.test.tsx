import { render } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { UuidGenerator } from '../UuidGenerator'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid-v4',
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('UuidGenerator', () => {
  it('renders generate button and UUID v4 label', () => {
    renderWithRouter(<UuidGenerator />)
    expect(screen.getByText('Generate')).toBeInTheDocument()
    expect(screen.getByText('UUID v4')).toBeInTheDocument()
  })

  it('auto-generates a UUID on initial load', () => {
    renderWithRouter(<UuidGenerator />)
    expect(screen.getByText('mocked-uuid-v4')).toBeInTheDocument()
    expect(screen.getByText(/Generated UUID \(1\)/)).toBeInTheDocument()
  })

  it('regenerates UUID when generate button is clicked', () => {
    renderWithRouter(<UuidGenerator />)

    const generateButton = screen.getByText('Generate')
    fireEvent.click(generateButton)

    expect(screen.getByText('mocked-uuid-v4')).toBeInTheDocument()
  })

  it('copies all UUIDs when copy all is clicked', async () => {
    const mockWriteText = vi.fn()
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    })

    renderWithRouter(<UuidGenerator />)

    const copyAllButton = screen.getByRole('button', { name: /copy all/i })
    fireEvent.click(copyAllButton)

    expect(mockWriteText).toHaveBeenCalledWith('mocked-uuid-v4')
  })
})
