'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  DEV_NO_AUTH,
  ROLE_CATALOG,
  DevRole,
  getRoleInfo,
} from '@/lib/dev-auth'
import { ShieldCheck, ChevronUp, Check } from 'lucide-react'

/**
 * Dropdown flutuante de preview de papéis.
 *
 * Só aparece quando a autenticação está desligada (DEV_NO_AUTH = true).
 * Permite trocar entre os níveis de acesso e mostra, para cada um,
 * o que muda / o que ele consegue enxergar na plataforma.
 */
export default function RoleSwitcher() {
  const { user, switchRole } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  if (!DEV_NO_AUTH) return null

  const currentRole = (user?.role as DevRole) || ROLE_CATALOG[0].role
  const currentInfo = getRoleInfo(currentRole)

  const handleSelect = (role: DevRole) => {
    switchRole(role)
    setOpen(false)
    router.push(getRoleInfo(role).home)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] text-left">
      {/* Painel expandido */}
      {open && (
        <div className="mb-2 w-80 rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Preview de acesso (sem login)
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Escolha um papel para ver o que ele enxerga.
            </p>
          </div>

          <ul className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
            {ROLE_CATALOG.map((info) => {
              const active = info.role === currentRole
              return (
                <li key={info.role}>
                  <button
                    onClick={() => handleSelect(info.role)}
                    className={`w-full text-left px-4 py-3 transition-colors hover:bg-blue-50 ${
                      active ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900">
                        {info.label}
                      </span>
                      {active && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                      {info.blurb}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Entra em <code className="text-gray-500">{info.home}</code> · acessa{' '}
                      {info.canAccess.slice(0, 3).join(', ')}
                      {info.canAccess.length > 3 ? '…' : ''}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Botão / chip flutuante */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-gray-900 text-white pl-3 pr-4 py-2 shadow-lg hover:bg-gray-800 transition-colors"
        title="Trocar papel (modo sem autenticação)"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-medium">{currentInfo.label}</span>
        <ChevronUp
          className={`w-4 h-4 transition-transform ${open ? '' : 'rotate-180'}`}
        />
      </button>
    </div>
  )
}
