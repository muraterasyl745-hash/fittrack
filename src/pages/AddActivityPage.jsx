import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getActivities, addActivity, deleteActivity } from '../services/activitiesService'

const activityLabels = {
  walking: 'Ходьба',
  running: 'Бег',
  cycling: 'Велосипед',
  workout: 'Тренировка',
}

function AddActivityPage() {
  const { user } = useAuth()
  const [activities, setActivities] = useState([])
  const [activityType, setActivityType] = useState('walking')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function loadActivities() {
    const { data } = await getActivities(user.id)
    setActivities(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadActivities()
  }, [user.id])

  async function handleAdd(e) {
    e.preventDefault()
    setMessage('')
    if (!duration || Number(duration) <= 0) {
      setMessage('Укажите длительность больше 0')
      return
    }
    const { error } = await addActivity(user.id, activityType, Number(duration))
    if (error) {
      setMessage('Ошибка: ' + error.message)
    } else {
      setDuration('')
      setMessage('Активность добавлена!')
      loadActivities()
    }
  }

  async function handleDelete(id) {
    await deleteActivity(id)
    loadActivities()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Активности</h1>
      <form onSubmit={handleAdd}>
        <div>
          <label>Тип: </label>
          <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
            <option value="walking">Ходьба</option>
            <option value="running">Бег</option>
            <option value="cycling">Велосипед</option>
            <option value="workout">Тренировка</option>
          </select>
        </div>
        <div>
          <label>Длительность (минуты): </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <button type="submit">Добавить</button>
      </form>
      {message && <p>{message}</p>}

      <h2>История</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : activities.length === 0 ? (
        <p>Пока нет активностей</p>
      ) : (
        <ul>
          {activities.map((a) => (
            <li key={a.id}>
              {activityLabels[a.activity_type] || a.activity_type} — {a.duration_minutes} мин ({a.activity_date})
              {' '}
              <button onClick={() => handleDelete(a.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddActivityPage
