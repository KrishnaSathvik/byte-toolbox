import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { JsonFormatter } from '../JsonFormatter';
import { Base64Encoder } from '../Base64Encoder';
import { HashGenerator } from '../HashGenerator';
import { RegexTester } from '../RegexTester';
import { TimestampConverter } from '../TimestampConverter';

vi.mock('@/components/ui/monaco-editor', () => ({
  MonacoEditor: ({
    value,
    onChange,
  }: {
    value: string;
    onChange?: (value: string | undefined) => void;
  }) => (
    <textarea
      aria-label="editor"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    />
  ),
}));

const renderWithRouter = (component: React.ReactElement) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

describe('Tool smoke tests', () => {
  it('JsonFormatter formats valid JSON', () => {
    renderWithRouter(<JsonFormatter initialValue='{"a":1}' />);
    fireEvent.click(screen.getByRole('button', { name: /format/i }));
    expect(screen.getByText('Valid JSON')).toBeInTheDocument();
  });

  it('Base64Encoder encodes text', () => {
    renderWithRouter(<Base64Encoder initialValue="Hi" />);
    const encodeButtons = screen.getAllByRole('button', { name: /^encode$/i });
    fireEvent.click(encodeButtons[encodeButtons.length - 1]);
    expect(screen.getByText(/Encoded successfully/i)).toBeInTheDocument();
  });

  it('HashGenerator generates a hash', () => {
    renderWithRouter(<HashGenerator initialValue="hello" />);
    fireEvent.click(screen.getByRole('button', { name: /generate hash/i }));
    expect(screen.getByText(/SHA256 Hash/i)).toBeInTheDocument();
    expect(screen.getByRole('code').textContent?.length).toBeGreaterThan(10);
  });

  it('RegexTester renders pattern input', () => {
    renderWithRouter(<RegexTester />);
    expect(screen.getByPlaceholderText('Enter regex pattern...')).toBeInTheDocument();
  });

  it('TimestampConverter renders conversion controls', () => {
    renderWithRouter(<TimestampConverter />);
    expect(screen.getByText('Current Unix Timestamp')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument();
  });
});
