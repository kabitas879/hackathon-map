const { useState, useMemo, useEffect, useRef, Fragment } = React;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Topbar() {
  return (
    <div className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white grid place-content-center font-semibold">K</div>
          <div className="font-semibold">Kabita Library</div>
        </div>
        <div className="flex items-center gap-2">
          <input className="hidden md:block w-72 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Search" />
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">Log in</button>
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">New</button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ current, onChange }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'library', label: 'Team Library', icon: '📚' },
    { id: 'assets', label: 'Assets', icon: '🧩' },
    { id: 'tokens', label: 'Tokens', icon: '🎛️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];
  return (
    <div className="hidden md:block md:w-64 border-r bg-white">
      <div className="p-4 text-xs uppercase tracking-wide text-gray-500">Navigation</div>
      <nav className="space-y-1 px-2">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className={classNames(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm',
              current === it.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
            )}
          >
            <span>{it.icon}</span>
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function Tabs({ tabs, current, onChange }) {
  return (
    <div className="flex items-center gap-2 border-b">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={classNames(
            'border-b-2 px-4 py-3 text-sm font-medium',
            current === t.id
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-200'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Badge({ children, color = 'gray' }) {
  const colors = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-700',
    indigo: 'bg-indigo-100 text-indigo-700'
  };
  return <span className={classNames('inline-flex items-center rounded-md px-2 py-1 text-xs', colors[color])}>{children}</span>;
}

function Table({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">{c.label}</th>
            ))}
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{row[c.key]}</td>
              ))}
              <td className="px-4 py-3 text-right">
                <button className="rounded-md px-2 py-1 text-sm text-indigo-700 hover:bg-indigo-50">Open</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
      <div className="mb-3 text-5xl">📚</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-6 max-w-md text-sm text-gray-600">{description}</p>
      <button onClick={onAction} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">{actionLabel}</button>
    </div>
  );
}

function Modal({ open, onClose, title, children, primaryLabel, onPrimary }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">✕</button>
        </div>
        <div className="px-4 py-4">{children}</div>
        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <button onClick={onClose} className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">Cancel</button>
          <button onClick={onPrimary} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">{primaryLabel}</button>
        </div>
      </div>
    </div>
  );
}

function LibraryView() {
  const [tab, setTab] = useState('files');
  const [openCreate, setOpenCreate] = useState(false);

  const tabs = useMemo(() => [
    { id: 'files', label: 'Files' },
    { id: 'components', label: 'Components' },
    { id: 'styles', label: 'Styles' },
    { id: 'activity', label: 'Activity' },
  ], []);

  const files = [
    { name: 'Foundations.fig', type: <Badge color="indigo">Figma</Badge>, updated: '2 days ago', by: 'Kabita' },
    { name: 'Components.fig', type: <Badge color="indigo">Figma</Badge>, updated: '5 days ago', by: 'Anish' },
    { name: 'Templates.fig', type: <Badge color="indigo">Figma</Badge>, updated: '1 week ago', by: 'Riya' },
  ];

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'updated', label: 'Last updated' },
    { key: 'by', label: 'By' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Team Library</h2>
          <p className="text-sm text-gray-600">Centralized files, components, and design tokens.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">Share</button>
          <button onClick={() => setOpenCreate(true)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">New item</button>
        </div>
      </div>

      <Tabs tabs={tabs} current={tab} onChange={setTab} />

      {tab === 'files' && (
        <div className="rounded-lg border bg-white p-2">
          <Table columns={columns} rows={files} />
        </div>
      )}

      {tab === 'components' && (
        <EmptyState
          title="No components yet"
          description="Create, document and publish components for your team to reuse across files."
          actionLabel="Create component"
          onAction={() => setOpenCreate(true)}
        />
      )}

      {tab === 'styles' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Color', 'Typography', 'Effects'].map((s) => (
            <div key={s} className="rounded-lg border bg-white p-4">
              <div className="mb-2 text-sm text-gray-500">Category</div>
              <div className="mb-3 flex items-center justify-between">
                <div className="font-medium">{s}</div>
                <Badge color="blue">12</Badge>
              </div>
              <div className="h-20 rounded-md bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400"></div>
            </div>
          ))}
        </div>
      )}

      {tab === 'activity' && (
        <div className="space-y-3">
          {[1,2,3].map((i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border bg-white p-4">
              <div className="text-xl">📝</div>
              <div>
                <div className="text-sm"><span className="font-medium">Riya</span> published <span className="font-medium">Components.fig</span></div>
                <div className="text-xs text-gray-500">{i}h ago</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Create new"
        primaryLabel="Create"
        onPrimary={() => setOpenCreate(false)}
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Untitled" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Type</label>
            <select className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>File</option>
              <option>Component</option>
              <option>Style</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-2 text-sm text-gray-500">Welcome back</div>
      <div className="mb-4 text-xl font-semibold">Team overview</div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[['Files', 34], ['Components', 128], ['Styles', 52], ['Members', 8]].map(([label, value]) => (
          <div key={label} className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Shell() {
  const [current, setCurrent] = useState('library');
  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr]">
          <Sidebar current={current} onChange={setCurrent} />
          <main className="min-h-screen bg-gray-50 p-4 md:p-6">
            {current === 'dashboard' && <Dashboard />}
            {current === 'library' && <LibraryView />}
            {current === 'assets' && <EmptyState title="No assets" description="Upload shared assets for your team to reuse." actionLabel="Upload" onAction={() => {}} />}
            {current === 'tokens' && <EmptyState title="No tokens" description="Define design tokens such as color, spacing, and typography." actionLabel="Create token" onAction={() => {}} />}
            {current === 'settings' && <EmptyState title="Team settings" description="Manage members, roles, and publishing preferences." actionLabel="Invite" onAction={() => {}} />}
          </main>
        </div>
      </div>
    </div>
  );
}

window.AppComponent = Shell;