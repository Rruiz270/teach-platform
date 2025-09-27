import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function generateAvatarFallback(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getGradeColor(grade: number): string {
  if (grade >= 90) return 'text-green-600'
  if (grade >= 80) return 'text-blue-600'
  if (grade >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

export function getProgressColor(progress: number): string {
  if (progress >= 90) return 'bg-green-500'
  if (progress >= 70) return 'bg-blue-500'
  if (progress >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}