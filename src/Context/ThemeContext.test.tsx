import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, ThemeContext } from './ThemeContext';

// LocalStorage Mock
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Helper component to display context values
const TestConsumerComponent = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return <div>No context</div>;
  }
  return (
    <div>
      <div data-testid="theme-value">{context.theme}</div>
      <button onClick={context.toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
    document.body.classList.remove('dark-theme'); // Reset body class
  });

  test('provides initial theme as "light" by default', () => {
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  test('provides initial theme from localStorage if set to "dark"', () => {
    localStorageMock.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    // Check if document.body has 'dark-theme' class due to initial load effect
    expect(document.body).toHaveClass('dark-theme');
  });

  test('provides initial theme from localStorage if set to "light"', () => {
    localStorageMock.setItem('theme', 'light');
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.body).not.toHaveClass('dark-theme');
  });

  test('toggleTheme switches theme from light to dark and updates localStorage', () => {
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('toggleTheme switches theme from dark to light and updates localStorage', () => {
    localStorageMock.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  test('toggleTheme adds "dark-theme" class to document.body when switching to dark', () => {
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Toggle Theme')); // light -> dark
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.body).toHaveClass('dark-theme');
  });

  test('toggleTheme removes "dark-theme" class from document.body when switching to light', () => {
    localStorageMock.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>
    );
    expect(document.body).toHaveClass('dark-theme'); // Initial state
    fireEvent.click(screen.getByText('Toggle Theme')); // dark -> light
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.body).not.toHaveClass('dark-theme');
  });
});
