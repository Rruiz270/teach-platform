'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw, Clock } from 'lucide-react'
import { api } from '@/lib/api'

interface DetailedAPIStatus {
  name: string
  provider: string
  status: 'connected' | 'error' | 'no_api_key'
  lastChecked: string
  responseTime?: number
  errorMessage?: string
}

interface APIStatusSummary {
  total: number
  connected: number
  errors: number
  noApiKey: number
}

export function APIStatusDashboard() {
  const [apiStatuses, setApiStatuses] = useState<DetailedAPIStatus[]>([])
  const [summary, setSummary] = useState<APIStatusSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchAPIStatuses()
  }, [])

  const fetchAPIStatuses = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const response = await api.get('/api-health/detailed')
      setApiStatuses(response.data.apis)
      setSummary(response.data.summary)
      setLastUpdated(new Date(response.data.timestamp))
    } catch (error) {
      console.error('Failed to fetch API statuses:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'connected':
        return { 
          color: 'green', 
          icon: CheckCircle, 
          text: 'Connected',
          bgColor: 'bg-green-50 border-green-200',
          badgeClass: 'bg-green-100 text-green-800'
        }
      case 'error':
        return { 
          color: 'red', 
          icon: XCircle, 
          text: 'Error',
          bgColor: 'bg-red-50 border-red-200',
          badgeClass: 'bg-red-100 text-red-800'
        }
      case 'no_api_key':
        return { 
          color: 'yellow', 
          icon: AlertCircle, 
          text: 'No API Key',
          bgColor: 'bg-yellow-50 border-yellow-200',
          badgeClass: 'bg-yellow-100 text-yellow-800'
        }
      default:
        return { 
          color: 'gray', 
          icon: AlertCircle, 
          text: 'Unknown',
          bgColor: 'bg-gray-50 border-gray-200',
          badgeClass: 'bg-gray-100 text-gray-800'
        }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading API status...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">API Status Dashboard</h2>
          <p className="text-gray-600">Monitor all integrated AI providers</p>
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <Button 
            onClick={() => fetchAPIStatuses(true)} 
            disabled={refreshing}
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-center">{summary.total}</div>
              <div className="text-sm text-gray-600 text-center">Total APIs</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-800 text-center">{summary.connected}</div>
              <div className="text-sm text-green-600 text-center">Connected</div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-800 text-center">{summary.errors}</div>
              <div className="text-sm text-red-600 text-center">Errors</div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-800 text-center">{summary.noApiKey}</div>
              <div className="text-sm text-yellow-600 text-center">No API Key</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* API Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apiStatuses.map((api) => {
          const config = getStatusConfig(api.status)
          const IconComponent = config.icon
          
          return (
            <Card key={api.provider} className={config.bgColor}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{api.name}</CardTitle>
                  <Badge className={config.badgeClass}>
                    <IconComponent className="h-3 w-3 mr-1" />
                    {config.text}
                  </Badge>
                </div>
                <CardDescription>Provider: {api.provider}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Checked:</span>
                    <span>{new Date(api.lastChecked).toLocaleTimeString()}</span>
                  </div>
                  
                  {api.responseTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time:</span>
                      <span>{api.responseTime}ms</span>
                    </div>
                  )}
                  
                  {api.errorMessage && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-red-700">
                      <strong>Error:</strong> {api.errorMessage}
                    </div>
                  )}
                  
                  {api.status === 'no_api_key' && (
                    <div className="mt-2 p-2 bg-yellow-100 border border-yellow-200 rounded text-yellow-700">
                      <strong>Setup Required:</strong> No API key configured for this provider.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}