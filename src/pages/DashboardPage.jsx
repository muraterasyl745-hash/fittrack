import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: 20, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      <h1>Добро пожаловать в FitTrack!</h1>
      <p style={{ color: '#666' }}>Вы вошли как: {user?.email}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 20, marginBottom: 20 }}>
        <p><Link to="/profile">Перейти в профиль</Link></p>
        <p><Link to="/add-activity">Мои активности</Link></p>
        <p><Link to="/goals">Моя цель</Link></p>
        <p><Link to="/stats">Статистика</Link></p>
        <p><Link to="/coach">AI Coach</Link></p>
      </div>

      <button onClick={logout}>Выйти</button>
    </div>
  )
}

export default DashboardPage

