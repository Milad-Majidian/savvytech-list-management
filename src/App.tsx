import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { ThemeToggle, ThemeToggleDropdown } from './components/ThemeToggle'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const [count, setCount] = useState(0)
  const { theme, actualTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Theme Toggle Header */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">SavvyTech List Management</h2>
          <div className="text-sm text-muted-foreground">
            Theme: {theme} {theme === 'system' && `(${actualTheme})`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ThemeToggleDropdown />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img 
                src={viteLogo} 
                className="h-24 transition-transform hover:scale-110 hover:drop-shadow-lg" 
                alt="Vite logo" 
              />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img 
                src={reactLogo} 
                className="h-24 transition-transform hover:scale-110 hover:drop-shadow-lg animate-spin-slow" 
                alt="React logo" 
              />
            </a>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Vite + React
          </h1>

          {/* Interactive Card */}
          <div className="p-8 rounded-lg border border-border bg-card shadow-lg max-w-md w-full">
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={() => setCount((count) => count + 1)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                size="lg"
              >
                Count is {count}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Edit <code className="bg-muted px-2 py-1 rounded text-foreground">src/App.tsx</code> and save to test HMR
              </p>
            </div>
          </div>

          {/* Theme Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="font-semibold text-card-foreground mb-2">Primary Card</h3>
              <p className="text-muted-foreground text-sm">
                This card adapts to your theme preference automatically.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-secondary border border-border shadow-sm">
              <h3 className="font-semibold text-secondary-foreground mb-2">Secondary Card</h3>
              <p className="text-muted-foreground text-sm">
                Notice how colors transition smoothly when switching themes.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-accent border border-border shadow-sm">
              <h3 className="font-semibold text-accent-foreground mb-2">Accent Card</h3>
              <p className="text-muted-foreground text-sm">
                The theme system respects your system preferences too.
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-muted-foreground text-center max-w-2xl">
            Click on the Vite and React logos to learn more. 
            Use the theme toggles in the header to switch between light, dark, and system themes.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
