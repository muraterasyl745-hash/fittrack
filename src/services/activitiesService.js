import { supabase } from '../lib/supabase'
import { calculateXpForActivity } from '../utils/xp'

export async function getActivities(userId) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)
    .order('activity_date', { ascending: false })

  return { data, error }
}

export async function addActivity(userId, activityType, durationMinutes) {
  const { data, error } = await supabase
    .from('activities')
    .insert({
      user_id: userId,
      activity_type: activityType,
      duration_minutes: durationMinutes,
    })
    .select()
    .maybeSingle()

  if (!error) {
    const xpGained = calculateXpForActivity(durationMinutes)
    await supabase.rpc('add_xp', { p_user_id: userId, p_xp_amount: xpGained })
  }

  return { data, error }
}

export async function deleteActivity(activityId) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId)

  return { error }
}
