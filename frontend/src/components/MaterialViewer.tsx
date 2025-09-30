'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Download, 
  FileText, 
  Video, 
  Image, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  Users,
  Target,
  BookOpen,
  CheckCircle
} from 'lucide-react'

interface MaterialViewerProps {
  isOpen: boolean
  onClose: () => void
  lessonData: {
    id: number
    title: string
    module: string
    duration: string
    attendees: number
    description: string
    objectives: string[]
    materials: MaterialItem[]
  }
}

interface MaterialItem {
  id: number
  type: 'slide' | 'video' | 'document' | 'interactive' | 'quiz'
  title: string
  description?: string
  content: string
  duration?: string
  thumbnail?: string
}

export default function MaterialViewer({ isOpen, onClose, lessonData }: MaterialViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')

  const slides = lessonData.materials.filter(m => m.type === 'slide')
  const videos = lessonData.materials.filter(m => m.type === 'video')
  const documents = lessonData.materials.filter(m => m.type === 'document')
  const interactives = lessonData.materials.filter(m => m.type === 'interactive')

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{lessonData.title}</DialogTitle>
              <DialogDescription className="flex items-center space-x-4 mt-2">
                <Badge variant="secondary">{lessonData.module}</Badge>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{lessonData.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{lessonData.attendees} inscritos</span>
                </span>
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => alert('Iniciando apresentação ao vivo...')}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Apresentar Ao Vivo
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="slides">Slides ({slides.length})</TabsTrigger>
            <TabsTrigger value="videos">Vídeos ({videos.length})</TabsTrigger>
            <TabsTrigger value="documents">Documentos ({documents.length})</TabsTrigger>
            <TabsTrigger value="interactive">Interativo ({interactives.length})</TabsTrigger>
          </TabsList>

          <div className="overflow-y-auto max-h-[60vh] mt-4">
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Descrição da Aula</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{lessonData.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Objetivos de Aprendizagem</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lessonData.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estrutura da Aula</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-lg p-4 mb-2">
                        <Image className="w-8 h-8 mx-auto text-blue-600" />
                      </div>
                      <p className="font-medium">{slides.length} Slides</p>
                      <p className="text-sm text-gray-600">Apresentação</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-lg p-4 mb-2">
                        <Video className="w-8 h-8 mx-auto text-purple-600" />
                      </div>
                      <p className="font-medium">{videos.length} Vídeos</p>
                      <p className="text-sm text-gray-600">Demonstrações</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 rounded-lg p-4 mb-2">
                        <FileText className="w-8 h-8 mx-auto text-green-600" />
                      </div>
                      <p className="font-medium">{documents.length} Documentos</p>
                      <p className="text-sm text-gray-600">Material de apoio</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-100 rounded-lg p-4 mb-2">
                        <Eye className="w-8 h-8 mx-auto text-orange-600" />
                      </div>
                      <p className="font-medium">{interactives.length} Interativos</p>
                      <p className="text-sm text-gray-600">Atividades práticas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="slides" className="space-y-4">
              {slides.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Slide {currentSlide + 1} de {slides.length}</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={prevSlide} disabled={slides.length <= 1}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={nextSlide} disabled={slides.length <= 1}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{slides[currentSlide]?.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center space-y-4">
                        <Image className="w-16 h-16 mx-auto text-gray-400" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-700">{slides[currentSlide]?.title}</h3>
                          <p className="text-gray-600 mt-2 max-w-md mx-auto">
                            {slides[currentSlide]?.content}
                          </p>
                        </div>
                        <Badge variant="outline">Preview do Slide</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {slides.map((slide, index) => (
                  <Card 
                    key={slide.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      currentSlide === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <CardContent className="p-2">
                      <div className="bg-gray-100 rounded aspect-video flex items-center justify-center mb-2">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-xs text-center font-medium">{index + 1}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{video.title}</span>
                      <Badge variant="outline">{video.duration}</Badge>
                    </CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
                      <div className="text-center text-white space-y-4">
                        <Video className="w-16 h-16 mx-auto" />
                        <div>
                          <p className="text-lg font-medium">{video.title}</p>
                          <p className="text-gray-300">{video.duration}</p>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <Button
                            variant="secondary"
                            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                          >
                            {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setIsVideoMuted(!isVideoMuted)}
                          >
                            {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                          <Button variant="secondary">
                            <Maximize className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-red-100 rounded-lg p-3">
                          <FileText className="w-8 h-8 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{doc.title}</h3>
                          <p className="text-gray-600 mt-1">{doc.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline">PDF</Badge>
                            <span className="text-sm text-gray-500">2.3 MB</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interactive" className="space-y-4">
              <div className="grid gap-4">
                {interactives.map((interactive) => (
                  <Card key={interactive.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3">
                          <Eye className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{interactive.title}</h3>
                          <p className="text-gray-600 mt-1">{interactive.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="default">Interativo</Badge>
                            <span className="text-sm text-gray-500">{interactive.duration}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="default">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Abrir Atividade
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}