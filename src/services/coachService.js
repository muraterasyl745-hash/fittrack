import { getActivities } from './activitiesService'
import { getGoal } from './goalsService'

export async function getCoachAdvice(userId) {
  const { data: activities } = await getActivities(userId)
  const { data: goal } = await getGoal(userId)

  const target = goal?.daily_minutes_target || 30

  const today = new Date().toISOString().slice(0, 10)
  const todayMinutes = (activities || [])
    .filter((a) => a.activity_date === today)
    .reduce((sum, a) => sum + a.duration_minutes, 0)

  const last3Days = []
  for (let i = 0; i < 3; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    last3Days.push(d.toISOString().slice(0, 10))
  }
  const activeDaysLast3 = last3Days.filter((day) =>
    (activities || []).some((a) => a.activity_date === day)
  ).length

  const advices = []

  if (todayMinutes === 0) {
    advices.push('Сегодня пока нет активности. Даже 10-минутная прогулка — это отличное начало!')
  } else if (todayMinutes < target) {
    const left = target - todayMinutes
    advices.push('Осталось ' + left + ' минут до дневной цели. Ты почти у цели, продолжай!')
  } else {
    advices.push('Дневная цель выполнена! Отличная работа, так держать.')
  }

  if (activeDaysLast3 === 0) {
    advices.push('Уже несколько дней без активности. Попробуй начать с чего-то простого, например с ходьбы.')
  } else if (activeDaysLast3 >= 3) {
    advices.push('Ты активен три дня подряд — это отличная привычка формируется!')
  }

  const totalMinutes = (activities || []).reduce((sum, a) => sum + a.duration_minutes, 0)
  if (totalMinutes > 300) {
    advices.push('Ты уже набрал больше 5 часов активности всего. Впечатляющий результат!')
  }

  return advices
}
