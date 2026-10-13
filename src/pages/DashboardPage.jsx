import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: 20, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: '28px', lineHeight: '1.3', fontWeight: 'normal' }}>
          Добро пожаловать в
        </h1>
        <h2 style={{ margin: '5px 0 0 0', fontSize: '32px', lineHeight: '1.3', fontWeight: 'bold', color: '#2e7d32' }}>
          FitTrack!
        </h2>
      </div>

      <p style={{ color: '#555', marginBottom: 20 }}>
        Вы вошли как: <strong>{user?.email}</strong>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: 20 }}>
        <a href="/profile">Перейти в профиль</a>
        <a href="/activities">Мои активности</a>
        <a href="/goals">Моя цель</a>
        <a href="/stats">Статистика</a>
        <a href="/coach">AI Coach</a>
      </div>

      <button onClick={logout}>Выйти</button>
    </div>
  )
}

export default DashboardPage
