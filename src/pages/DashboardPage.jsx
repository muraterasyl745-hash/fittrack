import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  const links = [
    { href: '/profile', icon: '👤', label: 'Профиль' },
    { href: '/activities', icon: '🏃', label: 'Активности' },
    { href: '/goals', icon: '🎯', label: 'Цель' },
    { href: '/stats', icon: '📊', label: 'Статистика' },
    { href: '/coach', icon: '🤖', label: 'AI Coach' },
  ]

  return (
    <div style={{ padding: 20, textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: '28px', lineHeight: '1.3', fontWeight: 'normal' }}>
          Добро пожаловать в
        </h1>
        <h2 style={{ margin: '5px 0 0 0', fontSize: '32px', lineHeight: '1.3', fontWeight: 'bold', color: '#2e7d32' }}>
          FitTrack!
        </h2>
      </div>

      <p style={{ color: '#555', marginBottom: 24 }}>
        Вы вошли как: <strong>{user?.email}</strong>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              borderRadius: 14,
              padding: '20px 10px',
              textDecoration: 'none',
              color: '#2e7d32',
              fontWeight: 'bold',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <span
              style={{
                fontSize: 26,
                marginBottom: 8,
                background: '#e8f5e9',
                width: 52,
                height: 52,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {link.icon}
            </span>
            {link.label}
          </a>
        ))}
      </div>

      <button onClick={logout}>Выйти</button>
    </div>
  )
}

export default DashboardPage
