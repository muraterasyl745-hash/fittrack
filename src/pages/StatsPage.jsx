import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getActivities } from '../services/activitiesService'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function StatsPage() {
  const { user } = useAuth()
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await getActivities(user.id)
      const days = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const dateStr = d.toISOString().slice(0, 10)
        const label = d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
        const minutes = (data || [])
          .filter((a) => a.activity_date === dateStr)
          .reduce((sum, a) => sum + a.duration_minutes, 0)
        days.push({ date: label, минуты: minutes })
      }
      setChartData(days)
      setLoading(false)
    }
    load()
  }, [user.id])

  if (loading) {
    return <p style={{ padding: 20 }}>Загрузка...</p>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Статистика за неделю</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="минуты" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatsPage
