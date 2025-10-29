
"use client"

import * as React from "react"
import { Button as ShadcnButton } from "@/components/ui/button"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"


type ButtonProps = ComponentProps<typeof ShadcnButton> & {
  appVariant?: "primary" | "secondary"
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, appVariant = "primary", isLoading = false, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        // Merge shadcn styles with app custom variants
        className={cn(
          "transition-all",
          appVariant === "primary" && "bg-primary text-white hover:bg-primary/90",
          appVariant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </ShadcnButton>
    )
  }
)

Button.displayName = "Button"
