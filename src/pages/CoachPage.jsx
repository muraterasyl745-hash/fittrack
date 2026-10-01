import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getCoachAdvice } from '../services/coachService'

function CoachPage() {
  const { user } = useAuth()
  const [advices, setAdvices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const result = await getCoachAdvice(user.id)
      setAdvices(result)
      setLoading(false)
    }
    load()
  }, [user.id])

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Coach</h1>
      {loading ? (
        <p>Анализируем твой прогресс...</p>
      ) : (
        <ul>
          {advices.map((advice, index) => (
            <li key={index} style={{ marginBottom: 10 }}>{advice}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CoachPage
