import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme, type Theme } from '../contexts/ThemeContext'
import { Button } from './ui/button'

interface ThemeToggleProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'ghost', 
  size = 'icon' 
}) => {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      case 'system':
        return <Monitor className="h-[1.2rem] w-[1.2rem] transition-all" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system mode'
      case 'system':
        return 'Switch to light mode'
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={cycleTheme}
      title={getLabel()}
      className="relative overflow-hidden transition-all duration-300 hover:scale-105"
    >
      <div className="relative flex items-center justify-center">
        {getIcon()}
      </div>
      <span className="sr-only">{getLabel()}</span>
    </Button>
  )
}

// Advanced theme toggle with dropdown
interface ThemeToggleDropdownProps {
  align?: 'start' | 'end' | 'center'
}

export const ThemeToggleDropdown: React.FC<ThemeToggleDropdownProps> = ({ 
  align = 'end' 
}) => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    {
      value: 'light',
      label: 'Light',
      icon: <Sun className="h-4 w-4" />,
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: <Moon className="h-4 w-4" />,
    },
    {
      value: 'system',
      label: 'System',
      icon: <Monitor className="h-4 w-4" />,
    },
  ]

  const currentTheme = themes.find(t => t.value === theme)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden transition-all duration-300 hover:scale-105"
      >
        {currentTheme?.icon}
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={`absolute z-50 mt-2 w-40 rounded-md border border-border bg-popover p-1 shadow-lg ${
            align === 'end' ? 'right-0' : align === 'start' ? 'left-0' : 'left-1/2 -translate-x-1/2'
          }`}>
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                  theme === themeOption.value 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-foreground'
                }`}
              >
                {themeOption.icon}
                {themeOption.label}
                {theme === themeOption.value && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}