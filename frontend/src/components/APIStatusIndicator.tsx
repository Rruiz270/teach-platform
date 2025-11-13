'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

export interface APIStatus {
  name: string
  provider: string
  status: 'connected' | 'error' | 'no_api_key'
  isAvailable: boolean
}

interface APIStatusIndicatorProps {
  provider: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function APIStatusIndicator({ provider, showLabel = false, size = 'md' }: APIStatusIndicatorProps) {
  const [status, setStatus] = useState<APIStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAPIStatus()
  }, [])

  const fetchAPIStatus = async () => {
    try {
      const response = await api.get('/api-health/status')
      const apiStatuses = response.data.apis
      const apiStatus = apiStatuses.find((api: APIStatus) => 
        api.provider.toLowerCase() === provider.toLowerCase()
      )
      setStatus(apiStatus || null)
    } catch (error) {
      console.error('Failed to fetch API status:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusConfig = () => {
    if (!status) return { color: 'gray', icon: AlertCircle, text: 'Unknown' }
    
    switch (status.status) {
      case 'connected':
        return { 
          color: 'green', 
          icon: CheckCircle, 
          text: 'Connected',
          bgColor: 'bg-green-100 text-green-800 border-green-200'
        }
      case 'error':
        return { 
          color: 'red', 
          icon: XCircle, 
          text: 'Error',
          bgColor: 'bg-red-100 text-red-800 border-red-200'
        }
      case 'no_api_key':
        return { 
          color: 'yellow', 
          icon: AlertCircle, 
          text: 'No API Key',
          bgColor: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        }
      default:
        return { 
          color: 'gray', 
          icon: AlertCircle, 
          text: 'Unknown',
          bgColor: 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
  }

  const config = getStatusConfig()
  const IconComponent = config.icon

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5'
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-1">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-gray-400`} />
        {showLabel && <span className="text-xs text-gray-500">Checking...</span>}
      </div>
    )
  }

  const indicator = (
    <div className="flex items-center space-x-1">
      <IconComponent 
        className={`${sizeClasses[size]} text-${config.color}-500`} 
      />
      {showLabel && (
        <Badge variant="outline" className={config.bgColor}>
          {status?.name || provider} - {config.text}
        </Badge>
      )}
    </div>
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {indicator}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <div className="font-medium">{status?.name || provider}</div>
            <div className="text-gray-500">
              Status: {config.text}
              {status?.status === 'connected' && ' ✓'}
              {status?.status === 'error' && ' ✗'}
              {status?.status === 'no_api_key' && ' ⚠'}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}