import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: 20 }}>
      <h1>Добро пожаловать в FitTrack!</h1>
      <p>Вы вошли как: {user?.email}</p>
      <p><a href="/profile">Перейти в профиль</a></p>
      <p><a href="/activities">Мои активности</a></p>
      <p><a href="/goals">Моя цель</a></p>
      <p><a href="/stats">Статистика</a></p>
      <p><a href="/coach">AI Coach</a></p>
      <button onClick={logout}>Выйти</button>
    </div>
  )
}

export default DashboardPage
