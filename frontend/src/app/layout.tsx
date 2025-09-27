import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TEACH - Technology Education for Advanced Classroom Help',
  description: 'Revolutionary AI education platform for Brazilian teachers. Master AI tools and become a learning facilitator.',
  keywords: ['AI education', 'teachers', 'Brazil', 'technology', 'learning platform'],
  authors: [{ name: 'TEACH Platform' }],
  creator: 'TEACH Platform',
  publisher: 'TEACH Platform',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'TEACH Platform',
    title: 'TEACH - Technology Education for Advanced Classroom Help',
    description: 'Revolutionary AI education platform for Brazilian teachers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TEACH Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEACH - Technology Education for Advanced Classroom Help',
    description: 'Revolutionary AI education platform for Brazilian teachers.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0070f3" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
