'use client'

import Image from 'next/image'

export function LegalFooter() {
  return (
    <footer className="mt-16 pt-8 pb-6 border-t bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Assessoria jurídica fornecida por:</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg width="120" height="60" viewBox="0 0 400 200" className="opacity-80">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#D4A574"}}/>
                  <stop offset="100%" style={{stopColor:"#B8936B"}}/>
                </linearGradient>
              </defs>
              
              {/* CP Symbol */}
              <g transform="translate(50, 20)">
                {/* C */}
                <path d="M 0 40 Q 0 0 40 0 Q 80 0 80 40 Q 80 60 60 70 L 50 65 Q 65 60 65 40 Q 65 20 40 20 Q 15 20 15 40 Q 15 80 40 80 Q 65 80 65 60 L 80 65 Q 80 100 40 100 Q 0 100 0 60 Z" fill="url(#logoGradient)"/>
                
                {/* P */}
                <path d="M 90 0 L 90 100 L 105 100 L 105 60 L 130 60 Q 150 60 150 40 Q 150 20 130 20 L 105 20 L 105 0 Z M 105 15 L 130 15 Q 135 15 135 25 Q 135 45 130 45 L 105 45 Z" fill="url(#logoGradient)"/>
              </g>
              
              {/* Company Name */}
              <text x="50" y="140" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#666">
                CORREIA PONTES
              </text>
              
              {/* Underline */}
              <line x1="50" y1="150" x2="280" y2="150" stroke="url(#logoGradient)" strokeWidth="4"/>
              
              {/* Advocacia */}
              <text x="280" y="175" fontFamily="Arial, sans-serif" fontSize="20" fontStyle="italic" fill="#999">
                ADVOCACIA
              </text>
            </svg>
          </div>
          <div className="text-xs text-gray-500 text-center">
            <p>© 2024 TEACH Platform. Todos os direitos reservados.</p>
            <p className="mt-1">Desenvolvido com ❤️ no Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  )
}