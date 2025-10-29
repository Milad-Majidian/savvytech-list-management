import React from 'react'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/elements/Button'
import { cn } from '@/lib/utils'

export type ModalSize = 'sm' | 'md' | 'lg'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title?: string
  description?: string
  size?: ModalSize
  className?: string
  footer?: React.ReactNode
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg', 
  lg: 'max-w-2xl'
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  size = 'md',
  className,
  footer,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Perfect theme-aware styling
          'bg-white dark:bg-gray-900',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',
          'shadow-xl dark:shadow-2xl',
          
          // Enhanced smooth animations
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'duration-300 ease-out',
          
          // Size
          sizeClasses[size],
          'rounded-xl p-0 overflow-hidden',
          
          className
        )}
      >
        {/* Close button */}
        <Button
          appVariant="ghost"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 h-8 w-8 p-0 rounded-full hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </Button>
        
        {/* Header */}
        {(title || description) && (
          <DialogHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            {title && (
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        
        {/* Content */}
        <div className="px-6 py-4 bg-white dark:bg-gray-900">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <DialogFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Simple footer helper
export const ModalFooter: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('flex justify-end gap-2', className)}>
    {children}
  </div>
)

export default Modal
