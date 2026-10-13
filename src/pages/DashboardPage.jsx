import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  const links = [
    { href: '/profile', icon: '👤', label: 'Профиль', color: '#2196f3', bg: '#e3f2fd' },
    { href: '/activities', icon: '🏃', label: 'Активности', color: '#4caf50', bg: '#e8f5e9' },
    { href: '/goals', icon: '🎯', label: 'Цель', color: '#f44336', bg: '#ffebee' },
    { href: '/stats', icon: '📊', label: 'Статистика', color: '#ff9800', bg: '#fff3e0' },
    { href: '/coach', icon: '🤖', label: 'AI Coach', color: '#9c27b0', bg: '#f3e5f5' },
  ]

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #43a047, #2e7d32)',
          color: '#fff',
          padding: '32px 20px',
          borderRadius: '0 0 24px 24px',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: '26px', lineHeight: '1.3', fontWeight: 'normal' }}>
          Добро пожаловать в
        </h1>
        <h2 style={{ margin: '5px 0 12px 0', fontSize: '32px', lineHeight: '1.3', fontWeight: 'bold' }}>
          FitTrack!
        </h2>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Вы вошли как: <strong>{user?.email}</strong>
        </p>
      </div>

      <div style={{ padding: '0 20px', textAlign: 'center' }}>
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
                color: '#333',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  marginBottom: 8,
                  background: link.bg,
                  color: link.color,
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
    </div>
  )
}

export default DashboardPage
