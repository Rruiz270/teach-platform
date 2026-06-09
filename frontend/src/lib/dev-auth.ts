import type { User } from '@/services/auth.service'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  MODO SEM AUTENTICAÇÃO (preview de papéis)
 * ─────────────────────────────────────────────────────────────────────────
 *  Quando `DEV_NO_AUTH = true`:
 *    - a plataforma NÃO exige login (a tela /login é pulada);
 *    - um usuário "mock" é criado automaticamente;
 *    - o papel desse usuário é escolhido por um dropdown flutuante
 *      (RoleSwitcher), permitindo ver o que cada nível de acesso enxerga.
 *
 *  Para RESTAURAR a autenticação real (e-mail + senha), basta trocar para:
 *    export const DEV_NO_AUTH = false
 *  Nada mais precisa ser alterado — os guards voltam a valer normalmente.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const DEV_NO_AUTH = true

export type DevRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'COORDINATOR'
  | 'AI_MAESTRO'
  | 'TEACHER'

export interface RoleInfo {
  role: DevRole
  /** Nome amigável exibido no dropdown */
  label: string
  /** Rota inicial para onde o login redireciona este papel */
  home: string
  /** Resumo do que muda / o que este papel pode acessar */
  blurb: string
  /** Áreas que este papel consegue abrir (para a explicação "o que muda") */
  canAccess: string[]
}

/**
 * Catálogo de papéis = fonte única de verdade das LÓGICAS DE ACESSO.
 * Reflete os guards reais das páginas:
 *   /admin            → ADMIN, SUPER_ADMIN, COORDINATOR
 *   /superadmin       → aberto (SUPER_ADMIN é o público-alvo)
 *   /maestro-dashboard, /maestro → exige sessão (AI_MAESTRO)
 *   /dashboard        → professor (TEACHER) e fallback de todos
 */
export const ROLE_CATALOG: RoleInfo[] = [
  {
    role: 'SUPER_ADMIN',
    label: 'Super Admin',
    home: '/superadmin',
    blurb: 'Acesso total à plataforma: todos os usuários, escolas e configurações.',
    canAccess: ['/superadmin', '/admin', '/maestro-dashboard', '/dashboard', '/modules', '/workspace', '/library'],
  },
  {
    role: 'ADMIN',
    label: 'Admin (Escola/Rede)',
    home: '/admin',
    blurb: 'Gestão da escola ou rede: professores, turmas, relatórios e progresso.',
    canAccess: ['/admin', '/dashboard', '/modules', '/library'],
  },
  {
    role: 'COORDINATOR',
    label: 'Coordenador',
    home: '/admin',
    blurb: 'Coordenação pedagógica: acompanha turmas e professores (painel admin).',
    canAccess: ['/admin', '/dashboard', '/modules', '/library'],
  },
  {
    role: 'AI_MAESTRO',
    label: 'Maestro de IA',
    home: '/maestro-dashboard',
    blurb: 'Curadoria e criação de conteúdo/trilhas de IA; modera o fórum.',
    canAccess: ['/maestro-dashboard', '/maestro', '/forum', '/dashboard'],
  },
  {
    role: 'TEACHER',
    label: 'Professor',
    home: '/dashboard',
    blurb: 'Experiência do professor: trilhas, workspace, módulos e certificados.',
    canAccess: ['/dashboard', '/modules', '/workspace', '/library', '/certificates', '/lessons'],
  },
]

export const DEFAULT_DEV_ROLE: DevRole = 'SUPER_ADMIN'

const STORAGE_KEY = 'devRole'

export function getRoleInfo(role: DevRole): RoleInfo {
  return ROLE_CATALOG.find((r) => r.role === role) ?? ROLE_CATALOG[0]
}

/** Lê o papel selecionado (persistido entre reloads) */
export function getDevRole(): DevRole {
  if (typeof window === 'undefined') return DEFAULT_DEV_ROLE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as DevRole | null
    if (stored && ROLE_CATALOG.some((r) => r.role === stored)) return stored
  } catch {
    /* localStorage indisponível */
  }
  return DEFAULT_DEV_ROLE
}

/** Persiste o papel selecionado */
export function setDevRole(role: DevRole): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, role)
  } catch {
    /* localStorage indisponível */
  }
}

/** Cria um usuário fictício para o papel informado (sem backend) */
export function makeDevUser(role: DevRole): User {
  const info = getRoleInfo(role)
  return {
    id: `dev-${role.toLowerCase()}`,
    name: `${info.label} (preview)`,
    email: `${role.toLowerCase()}@teach.local`,
    role,
    isEmailVerified: true,
    createdAt: '2026-01-01T00:00:00.000Z',
  }
}
