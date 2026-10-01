import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getProfile, upsertProfile } from '../services/profileService'

function ProfilePage() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const { data } = await getProfile(user.id)
      if (data) {
        setFullName(data.full_name || '')
        setAge(data.age || '')
        setXp(data.xp || 0)
        setLevel(data.level || 1)
      }
      setLoading(false)
    }
    loadProfile()
  }, [user.id])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    const { error } = await upsertProfile(user.id, {
      full_name: fullName,
      age: age ? Number(age) : null,
    })
    setSaving(false)
    setMessage(error ? 'Ошибка: ' + error.message : 'Профиль сохранён!')
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Загрузка...</p>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Мой профиль</h1>
      <p>XP: {xp} | Уровень: {level}</p>
      <form onSubmit={handleSave}>
        <div>
          <label>Имя: </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Возраст: </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" disabled={saving}>
          {saving ? 'Сохраняем...' : 'Сохранить'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ProfilePage