export function calculateXpForActivity(durationMinutes) {
  return durationMinutes
}

export function calculateLevel(totalXp) {
  return Math.floor(totalXp / 100) + 1
}

export function xpForNextLevel(totalXp) {
  const currentLevel = calculateLevel(totalXp)
  return currentLevel * 100
}
