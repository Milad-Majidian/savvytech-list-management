
"use client"

import * as React from "react"
import { Button as ShadcnButton } from "@/components/ui/button"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"


type ButtonProps = ComponentProps<typeof ShadcnButton> & {
  appVariant?: "primary" | "secondary" | "accent" | "destructive" | "ghost" | "link"
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, appVariant = "primary", isLoading = false, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        // Merge shadcn styles with theme-aware app custom variants
        className={cn(
          // Base styles with theme transitions
          "transition-all duration-300 ease-in-out font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          
          // Theme-aware variants
          appVariant === "primary" && [
            "bg-primary text-primary-foreground shadow hover:bg-primary/90", 
            "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
            "active:scale-95 transform"
          ],
          
          appVariant === "secondary" && [
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            "dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
            "border border-input shadow-sm"
          ],
          
          appVariant === "accent" && [
            "bg-accent text-accent-foreground hover:bg-accent/90",
            "dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90",
            "shadow-sm"
          ],
          
          appVariant === "destructive" && [
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            "dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90",
            "shadow active:scale-95 transform"
          ],
          
          appVariant === "ghost" && [
            "hover:bg-accent hover:text-accent-foreground",
            "dark:hover:bg-accent dark:hover:text-accent-foreground",
            "text-foreground"
          ],
          
          appVariant === "link" && [
            "text-primary underline-offset-4 hover:underline",
            "dark:text-primary",
            "h-auto p-0 font-normal"
          ],
          
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className="flex items-center justify-center">
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin transition-all duration-300" />
          )}
          <span className={cn(
            "transition-all duration-200",
            isLoading && "opacity-70"
          )}>
            {children}
          </span>
        </span>
      </ShadcnButton>
    )
  }
)

Button.displayName = "Button"
