import React from 'react'
import { AlertTriangle } from 'lucide-react'
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

interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void
  onCancel?: () => void
  className?: string
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  className,
}) => {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onOpenChange(false)
  }

  const isDestructive = variant === 'destructive'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Clean theme-aware styling
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
          'max-w-md',
          'rounded-xl p-0 overflow-hidden',
          
          className
        )}
      >
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className={cn(
              'shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
              isDestructive 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            )}>
              {isDestructive ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {/* Footer */}
        <DialogFooter className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex justify-end gap-3 w-full">
            <Button
              appVariant="ghost"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200"
            >
              {cancelText}
            </Button>
            <Button
              appVariant={isDestructive ? "primary" : "primary"}
              onClick={handleConfirm}
              className={cn(
                'px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md w-auto',
                isDestructive
                  ? 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white'
              )}
            >
              {/* {isDestructive && <Trash2 className="w-4 h-4 mr-2" />} */}
              {confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmModal