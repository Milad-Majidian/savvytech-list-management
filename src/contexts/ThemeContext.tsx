import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark' // The actual applied theme (resolves 'system')
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'app-theme',
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage on initial load
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored
      }
    }
    return defaultTheme
  })

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  // Function to get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // Update actual theme based on current theme setting
  useEffect(() => {
    const updateActualTheme = () => {
      const newActualTheme = theme === 'system' ? getSystemTheme() : theme
      setActualTheme(newActualTheme)
      
      // Apply theme to document
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newActualTheme)
      
      // Set attribute for CSS selectors
      root.setAttribute('data-theme', newActualTheme)
    }

    updateActualTheme()
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const newSystemTheme = getSystemTheme()
      setActualTheme(newSystemTheme)
      
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newSystemTheme)
      root.setAttribute('data-theme', newSystemTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme)
    }
  }, [theme, storageKey])

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    actualTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}