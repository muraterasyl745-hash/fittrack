import { supabase } from '../lib/supabase'

export async function getGoal(userId) {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .maybeSingle()

  return { data, error }
}

export async function setGoal(userId, dailyMinutesTarget) {
  const { data, error } = await supabase
    .from('goals')
    .upsert(
      { user_id: userId, daily_minutes_target: dailyMinutesTarget, is_active: true },
      { onConflict: 'user_id' }
    )
    .select()
    .maybeSingle()

  return { data, error }
}
