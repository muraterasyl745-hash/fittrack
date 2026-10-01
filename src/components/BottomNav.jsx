import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Главная', icon: '🏠' },
  { path: '/activities', label: 'Активности', icon: '🏃' },
  { path: '/goals', label: 'Цель', icon: '🎯' },
  { path: '/stats', label: 'Статистика', icon: '📊' },
  { path: '/coach', label: 'Coach', icon: '🤖' },
  { path: '/profile', label: 'Профиль', icon: '👤' },
]

function BottomNav() {
  const location = useLocation()

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        background: '#fff',
        borderTop: '1px solid #ddd',
        padding: '8px 0',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: isActive ? '#4caf50' : '#888',
              textAlign: 'center',
              fontSize: 12,
            }}
          >
            <div style={{ fontSize: 20 }}>{item.icon}</div>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
