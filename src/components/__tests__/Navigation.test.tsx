import { render } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from '../Navigation'
import { ThemeProvider } from '../ThemeProvider'
import { describe, it, expect } from 'vitest'

const NavigationWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </BrowserRouter>
)

describe('Navigation', () => {
  it('renders ByteToolbox logo', () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )
    
    expect(screen.getByText('ByteToolbox')).toBeInTheDocument()
  })

  it('renders all tool links', () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )
    
    expect(screen.getByText('JSON')).toBeInTheDocument()
    expect(screen.getByText('Base64')).toBeInTheDocument()
    expect(screen.getByText('Hash')).toBeInTheDocument()
    expect(screen.getByText('UUID')).toBeInTheDocument()
    expect(screen.getByText('Regex')).toBeInTheDocument()
    expect(screen.getByText('Time')).toBeInTheDocument()
  })

  it('opens search when search button is clicked', () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    fireEvent.click(searchButton)
    
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument()
  })

  it('filters tools when searching', () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    )
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    fireEvent.click(searchButton)
    
    const searchInput = screen.getByPlaceholderText('Search tools...')
    fireEvent.change(searchInput, { target: { value: 'json' } })
    
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
    expect(screen.queryByText('Base64 Encoder')).not.toBeInTheDocument()
  })
})