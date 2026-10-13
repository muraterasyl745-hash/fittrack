import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: 20, textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      {/* Заголовок с фиксированным межстрочным интервалом и блочной версткой */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: '28px', lineHeight: '1.2', fontWeight: 'normal' }}>
          Добро пожаловать в
        </h1>
        <h2 style={{ margin: '5px 0 0 0', fontSize: '36px', lineHeight: '1.2', fontWeight: 'bold' }}>
          FitTrack!
        </h2>
      </div>

      <p style={{ color: '#555', marginBottom: 20 }}>
        Вы вошли как: <strong>{user?.email}</strong>
      </p>

      {/* Список ссылок */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: 20 }}>
        <a href="/profile" style={{ color: '#0066cc', textDecoration: 'underline' }}>Перейти в профиль</a>
        <a href="/activities" style={{ color: '#0066cc', textDecoration: 'underline' }}>Мои активности</a>
        <a href="/goals" style={{ color: '#0066cc', textDecoration: 'underline' }}>Моя цель</a>
        <a href="/stats" style={{ color: '#0066cc', textDecoration: 'underline' }}>Статистика</a>
        <a href="/coach" style={{ color: '#0066cc', textDecoration: 'underline' }}>AI Coach</a>
      </div>

      <button 
        onClick={logout} 
        style={{ 
          padding: '8px 16px', 
          cursor: 'pointer',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#f0f0f0'
        }}
      >
        Выйти
      </button>
    </div>
  )
}

export default DashboardPageс