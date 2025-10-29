import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date according to the provided format string
 * Supported tokens: yyyy, MM, dd, HH, mm
 * @param date - The date to format
 * @param formatStr - The format string (e.g., "yyyy-MM-dd HH:mm")
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number, formatStr: string): string {
  const d = new Date(date);
  
  // Validate date
  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  // Use replace with a mapping object for better performance and maintainability
  const tokens: Record<string, string> = {
    'yyyy': String(year),
    'MM': month,
    'dd': day,
    'HH': hours,
    'mm': minutes,
    'ss': seconds
  };

  return formatStr.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => tokens[match] || match);
}

/**
 * Common date format presets
 */
export const dateFormats = {
  dateTime: 'yyyy-MM-dd HH:mm',
  date: 'yyyy-MM-dd',
  time: 'HH:mm',
  dateTimeWithSeconds: 'yyyy-MM-dd HH:mm:ss',
} as const;
