import { ThemeToggle } from '../ThemeToggle'; // Adjust import path as needed

export function Header() {
    return (
        <header className="flex justify-between items-center px-8 py-4 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold text-foreground">SavvyTech</h1>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <ThemeToggle />
            </div>
        </header>
    );
}