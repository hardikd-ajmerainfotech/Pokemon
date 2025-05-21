import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './NavBar';
import { ThemeProvider, ThemeContext, ThemeContextType } from '../Context/ThemeContext';

// Mock localStorage for ThemeProvider
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


describe('Navbar Theme Toggle', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
    // Ensure body class is reset for each test if ThemeProvider side effects are involved
    document.body.classList.remove('dark-theme');
  });

  test('renders the theme toggle button', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('theme-toggle-button')).toBeInTheDocument();
  });

  test('clicking the theme toggle button calls toggleTheme from context', () => {
    const mockToggleTheme = jest.fn();
    const initialThemeValue: ThemeContextType = {
      theme: 'light',
      toggleTheme: mockToggleTheme,
    };

    render(
      <MemoryRouter>
        <ThemeContext.Provider value={initialThemeValue}>
          <Navbar />
        </ThemeContext.Provider>
      </MemoryRouter>
    );

    const toggleButton = screen.getByTestId('theme-toggle-button');
    fireEvent.click(toggleButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('theme toggle button text updates correctly on click (light to dark)', () => {
    render(
      <MemoryRouter>
        <ThemeProvider> {/* Use actual ThemeProvider to test text change */}
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );

    const toggleButton = screen.getByTestId('theme-toggle-button');
    // Initial state (light theme by default if localStorage is empty)
    expect(toggleButton).toHaveTextContent('Switch to Dark Mode');

    fireEvent.click(toggleButton);
    // After click (should be dark theme)
    expect(toggleButton).toHaveTextContent('Switch to Light Mode');
  });

  test('theme toggle button text updates correctly on click (dark to light)', () => {
    localStorageMock.setItem('theme', 'dark'); // Start with dark theme

    render(
      <MemoryRouter>
        <ThemeProvider> {/* Use actual ThemeProvider to test text change */}
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );

    const toggleButton = screen.getByTestId('theme-toggle-button');
    // Initial state (dark theme from localStorage)
    expect(toggleButton).toHaveTextContent('Switch to Light Mode');

    fireEvent.click(toggleButton);
    // After click (should be light theme)
    expect(toggleButton).toHaveTextContent('Switch to Dark Mode');
  });
});
