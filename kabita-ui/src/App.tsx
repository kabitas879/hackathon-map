import { useMemo, useState } from 'react'

type NavItem = { id: string; label: string }
type Card = { id: string; title: string; subtitle?: string; tag?: string }

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projects' },
  { id: 'library', label: 'Library' },
  { id: 'assets', label: 'Assets' },
  { id: 'settings', label: 'Settings' },
]

const mockCards: Card[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  title: `Card Title ${i + 1}`,
  subtitle: 'Subtitle or description',
  tag: i % 3 === 0 ? 'New' : i % 3 === 1 ? 'Updated' : undefined,
}))

function Badge({ children, color = 'violet' }: { children: string; color?: 'violet' | 'emerald' | 'sky' }) {
  const colorMap = {
    violet: 'bg-violet-100 text-violet-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    sky: 'bg-sky-100 text-sky-700',
  } as const
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colorMap[color]}`}>
      {children}
    </span>
  )
}

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90">
      {children}
    </button>
  )
}

function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="grid min-h-full grid-rows-[auto,1fr] dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b bg-white/80 backdrop-blur dark:bg-gray-900/70 dark:border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <button aria-label="Toggle sidebar" onClick={() => setOpen(v => !v)} className="rounded-md p-2 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M3.75 6.75h16.5v1.5H3.75v-1.5ZM3.75 11.25h16.5v1.5H3.75v-1.5ZM3.75 15.75h16.5v1.5H3.75v-1.5Z" />
              </svg>
            </button>
            <span className="text-lg font-semibold">Kabita UI</span>
          </div>
          <div className="flex items-center gap-3">
            <input className="hidden sm:block w-64 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:border-gray-300 dark:bg-gray-800 dark:border-gray-700" placeholder="Search" />
            <button
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              onClick={() => {
                const root = document.documentElement
                root.classList.toggle('dark')
                const isDark = root.classList.contains('dark')
                localStorage.setItem('theme', isDark ? 'dark' : 'light')
              }}
            >
              Toggle theme
            </button>
            <Button>New</Button>
            <img className="size-8 rounded-full" src="https://i.pravatar.cc/56" alt="avatar" />
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-[220px,1fr]">
        <aside className={`hidden sm:block ${open ? '' : 'sm:hidden'}`}>
          <nav className="space-y-1">
            {navItems.map(item => (
              <a key={item.id} href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}

function LibraryGrid() {
  const cards = useMemo(() => mockCards, [])
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team Library</h1>
          <p className="text-sm text-gray-500">Assets and components shared by the team</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Upload</Button>
          <button className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50">Filter</button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map(card => (
          <li key={card.id} className="group overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800"></div>
            <div className="flex items-start justify-between gap-2 p-3">
              <div>
                <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-gray-100">{card.title}</h3>
                {card.subtitle && <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">{card.subtitle}</p>}
              </div>
              {card.tag && <Badge color={card.tag === 'New' ? 'emerald' : 'sky'}>{card.tag}</Badge>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  return (
    <AppShell>
      <LibraryGrid />
    </AppShell>
  )
}
