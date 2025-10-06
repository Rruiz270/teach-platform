import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Sparkles, Video, Image, FileText, Zap } from 'lucide-react';
import { LessonBuilder } from './LessonBuilder';
import { MediaStudio } from './MediaStudio';
import { AssessmentCreator } from './AssessmentCreator';
import { AutomationHub } from './AutomationHub';
import { UsageTracker } from './UsageTracker';

interface AIWorkspaceProps {
  userId: string;
  subscription: 'FREE' | 'INDIVIDUAL' | 'SCHOOL' | 'GOVERNMENT';
}

export function AIWorkspace({ userId, subscription }: AIWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('lesson-builder');
  const [quotaWarning, setQuotaWarning] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Usage Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-purple-600" />
                AI Workspace
              </h1>
              <p className="text-gray-600 mt-1">
                Create engaging content with AI-powered tools
              </p>
            </div>
            <Badge variant={subscription === 'FREE' ? 'secondary' : 'default'}>
              {subscription} Plan
            </Badge>
          </div>

          {/* Quick Usage Stats */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <UsageTracker userId={userId} compact />
            </CardContent>
          </Card>

          {/* Quota Warning */}
          {quotaWarning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">{quotaWarning}</p>
            </div>
          )}
        </div>

        {/* Main Workspace Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="lesson-builder" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="media-studio" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Assessments
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lesson-builder" className="space-y-4">
            <LessonBuilder 
              userId={userId} 
              onQuotaWarning={setQuotaWarning}
            />
          </TabsContent>

          <TabsContent value="media-studio" className="space-y-4">
            <MediaStudio 
              userId={userId} 
              onQuotaWarning={setQuotaWarning}
            />
          </TabsContent>

          <TabsContent value="assessments" className="space-y-4">
            <AssessmentCreator 
              userId={userId} 
              onQuotaWarning={setQuotaWarning}
            />
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <AutomationHub 
              userId={userId} 
              onQuotaWarning={setQuotaWarning}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <UsageTracker userId={userId} detailed />
          </TabsContent>
        </Tabs>

        {/* AI Provider Attribution */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by leading AI providers:</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span>Claude (Anthropic)</span>
            <span>•</span>
            <span>GPT-4 & DALL-E (OpenAI)</span>
            <span>•</span>
            <span>Synthesia</span>
            <span>•</span>
            <span>ElevenLabs</span>
          </div>
        </div>
      </div>
    </div>
  );
}