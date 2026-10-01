import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getGoal, setGoal } from '../services/goalsService'
import { getActivities } from '../services/activitiesService'

function GoalsPage() {
  const { user } = useAuth()
  const [target, setTarget] = useState(30)
  const [todayMinutes, setTodayMinutes] = useState(0)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function loadData() {
    const { data: goal } = await getGoal(user.id)
    if (goal) {
      setTarget(goal.daily_minutes_target)
    }

    const { data: activities } = await getActivities(user.id)
    const today = new Date().toISOString().slice(0, 10)
    const minutesToday = (activities || [])
      .filter((a) => a.activity_date === today)
      .reduce((sum, a) => sum + a.duration_minutes, 0)
    setTodayMinutes(minutesToday)

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [user.id])

  async function handleSave(e) {
    e.preventDefault()
    const { error } = await setGoal(user.id, Number(target))
    setMessage(error ? 'Ошибка: ' + error.message : 'Цель сохранена!')
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Загрузка...</p>
  }

  const percent = Math.min(100, Math.round((todayMinutes / target) * 100))

  return (
    <div style={{ padding: 20 }}>
      <h1>Моя цель</h1>
      <p>Сегодня: {todayMinutes} из {target} минут</p>
      <div style={{ background: '#eee', borderRadius: 8, overflow: 'hidden', height: 20, marginBottom: 10 }}>
        <div style={{ background: '#4caf50', width: percent + '%', height: '100%' }}></div>
      </div>
      <p>{percent}% выполнено{percent >= 100 ? ' — цель достигнута!' : ''}</p>

      <form onSubmit={handleSave}>
        <label>Цель (минут в день): </label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button type="submit">Сохранить цель</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default GoalsPage
